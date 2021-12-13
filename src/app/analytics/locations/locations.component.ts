import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';
import { Color, defaultColors } from 'ng2-charts';
import * as pluginAnnotation from 'chartjs-plugin-annotation';
import { interval } from 'rxjs';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  id: any
  startTime: string;
  diff: number;
  public mainChartData: Array<any> = [];
  public mainChartLabels: Array<any> = [];
  public mainChartLegend = true;
  public mainChartType = 'line';
  public barChartPlugins = [pluginAnnotation];
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
          value: 25,
          borderColor: 'red',
          borderWidth: 2,
        }
      ]
    },
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 5,
            beginAtZero: true
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: "RESPONSE TIME (Seconds)",
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
    private APIService: CommonService
  ) { }

  ngOnInit(): void {
    this.getData(1)
    // this.id = setInterval(() => {
    //   this.getData(2)
    // }, 45000)
    interval(45000).subscribe(x => {
      this.getData(2)
    });
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id)
    }
  }

  getData(tag) {
    // this.spinner.show();
    let now = new Date()
      var todayDate = new Date()
      todayDate.setHours(0, 0, 0, 0)
      var dateStringWithTime = moment(now).local().format(`yyyy-MM-DDTHH:mm:ss`);
      var tsYesterday = moment(todayDate).local().format(`yyyy-MM-DDTHH:mm:ss`);
    let value = {
      "start": tsYesterday,
      "end": dateStringWithTime
    }
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
    this.APIService.getlocationData(value)
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
          if (this.diff > 25) {
            this.saveData(startTime)
          }         }
      })
  }

  saveData(startTime) {
    let value = {
      title: 'Location API',
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
      title: 'Location API',
    }
    this.APIService.getAPIData(value)
      .subscribe(res => {
        if (res.code == 200) {
          let resultData = res.data
          var sendData = resultData.filter(function (ele) {
            return ele.hitTime < start && ele.hitTime > old
          });
          this.exportAsExcel(sendData)
          console.log(sendData)
        }
      })
  }

  exportAsExcel(sendData) {
    var csvStr = "Location API Reports" + "\n";
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
    hiddenElement.download = 'Location-API-Reports.csv';
    hiddenElement.click();
  }
}

