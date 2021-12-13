import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Color, defaultColors } from 'ng2-charts';
import * as pluginAnnotation from 'chartjs-plugin-annotation';
import { interval } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  diff: number;
  startTime: string;
  status: boolean;
  id: any
  public mainChartData: Array<any> = [];
  public mainChartLabels: Array<any> = [];
  public mainChartLegend = true;
  public mainChartType = 'line';
  public mainChartColours: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: '#F214E5',
      pointRadius: 3,
      pointBorderWidth: 3,
      pointHoverBackgroundColor: '#fff',
    },
    {
      backgroundColor: 'transparent',
      borderColor: '#1f7a8e',
      pointRadius: 3,
      pointBorderWidth: 3,
      pointHoverBackgroundColor: '#fff'
    },
  ];
  public barChartPlugins = [pluginAnnotation];
  public mainChartOptions: any = {
    tooltips: {
      enabled: true,
      itemSort: (a, b, data) => b.yLabel - a.yLabel,
      intersect: true,
      mode: 'x',
      position: 'nearest',
      borderWidth: 1,
      caretPadding: 15,
      colorBody: '#666',
      displayColors: true,
      titleFontColor: '#999',
      titleMarginBottom: 10,
      xPadding: 15,
      yPadding: 15,
      callbacks: {
        labelColor: function (tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    annotation: {
      drawTime: 'afterDatasetsDraw',
      annotations: [
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: 0.5,
          borderColor: 'red',
          borderWidth: 2,
        }
      ]
    },
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 0.1,
            beginAtZero: true
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString:  "RESPONSE TIME (Seconds)",
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "TIME",
          },
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false,
      maxWidth: 5,
      labels: {
        boxWidth: 15,

      }
    }
  };
  constructor(
    private APIService: CommonService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getData(1)
    // this.id = setInterval(() => {
    //   this.getData(2)
    // }, 10000)
    interval(10000).subscribe(x => {
      this.getData(2)
    });
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id)
    }
  }
  getData(tag) {
    const startTime = new Date().getTime();
    const time1 = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }).format(startTime)
    this.startTime = time1
    this.mainChartLabels.push(time1)
    if (this.mainChartLabels.length > 10) {
      this.mainChartLabels.shift();
    }
    this.mainChartColours.push(defaultColors)
    this.APIService.getVideoPlayerData()
      .subscribe(data => {
        if (data) {
          const endTime = new Date().getTime();
          this.diff = (endTime - startTime) / 1000
          let val = []
          val.push(this.diff)
          let value = {
            data: val
          }
          if (tag == 1) {
            this.mainChartData.push(value)
          }
          else {
            this.mainChartData[1].data.push(this.diff)
            if (this.mainChartData[1].data.length > 10) {
              this.mainChartData[1].data.shift();
            }
          }
          if (this.diff > 0.5) {
            this.saveData(startTime)
          }
        }
      })
  }

  saveData(startTime) {
    let value = {
      title: 'Video Player API',
      responseTime: this.diff,
      hitTime: startTime
    }
    this.APIService.saveAPIData(value)
      .subscribe(res => {
        if (res.code == 200) {
          let resultData = res.data
        }
      })
  }

  getDownloadData() {
    var now = new Date()
    var todayDate = new Date()
    todayDate.setHours(0, 0, 0, 0)
    var start = now.getTime()
    var old = todayDate.getTime()
    let value = {
      title: 'Video Player API',
    }
    this.APIService.getAPIData(value)
      .subscribe(res => {
        if (res.code == 200) {
          let resultData = res.data
          var sendData = resultData.filter(function (ele) {
            return ele.hitTime < start && ele.hitTime > old
          });
          this.exportAsExcel(sendData)
        }
      })
  }

  exportAsExcel(sendData) {
    var csvStr = "Video Player API Reports" + "\n";
    let JsonFields = ["S.No", "Hit Time", "Response Time"]
    csvStr += JsonFields.join(",") + "\n";
    sendData.forEach((element, index) => {
      const sNo = index + 1
      const hitTime = new Date(Number(element.hitTime))
      const responseTime = element.responseTime
      csvStr += sNo + ',' + hitTime + ',' + responseTime + "\n";
    })
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvStr);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Video-Player-API-Reports.csv';
    hiddenElement.click();
  }
}
