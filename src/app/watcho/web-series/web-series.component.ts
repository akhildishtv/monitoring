import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Color, defaultColors } from 'ng2-charts';
import * as pluginAnnotation from 'chartjs-plugin-annotation';
// const CronJob = require('../lib/cron.js').CronJob;
import { interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';

//in 10 seconds do something

@Component({
  selector: 'app-web-series',
  templateUrl: './web-series.component.html',
  styleUrls: ['./web-series.component.scss']
})
export class WebSeriesComponent implements OnInit {
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
    annotation: {
      drawTime: 'afterDatasetsDraw',
      annotations: [
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: 1,
          borderColor: 'red',
          borderWidth: 2,
        }
      ]
    },
    responsive: true,
    maintainAspectRatio: false,
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
  userData: any;
  timeData: any;
  constructor(
    private APIService: CommonService,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getData(1)
    this.id = setInterval(() => {
      this.getData(2)
    }, 30000)
    // interval(30000).subscribe(x => {
    //   this.getData(2)
    // });
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id)
    }
  }

  getData(tag) {
    let value = {
      "apiVersion": "5.1.2.17630",
      "ks": "djJ8NDg3fPbH1m4lNsxW3bfPkL1_7mAaDV5rgRqJ5vsW_G5-CHPWSl8Xvt706-5Ydvone7awyfygdn4ozhz1fQR-u_nbe0p5Jdup0eyt3kakQBMzuXHhKHRtSkPrv8JnKGZaSC56Or4BRRPPOiiz2QjcGRU5zMoFsqrGlQeUGZ6e4rC0j6E-2MwsaSokWltChak8VIw-Uy_yCXITpkns0VjBRoLAY0RBH4xVDunD7FHEP2RctSvUIWTPD3d2V8l53FQiTIut6MUjtWL7EWfdSTk4nVVfvhv0Y0lnGamNjbjQg9if1pD64AD-s4f9Uvpcza2ibgdF1mLODGru4z7-zZKi0_PWt4PgAZY2tAq65_l05d3i9JtY",
      "filter": {
        "objectType": "KalturaSearchAssetFilter",
        "typeIn": "656",
        "kSql": "(and SeriesId = 'SID_BEFALTU_08092020' Season number='1')",
        "dynamicOrderBy": {
          "orderBy": "META_ASC",
          "objectType": "KalturaDynamicOrderBy",
          "name": "Episode Number"
        }
      },
      "pager": {
        "objectType": "KalturaFilterPager",
        "pageIndex": "1",
        "pageSize": "500"
      }
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
    this.mainChartColours.push(defaultColors)
    this.APIService.getWebSeriesData(value)
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
            if (this.mainChartLabels.length > 10) {
              this.mainChartLabels.shift();
            }
            if (this.mainChartData[1].data.length > 10) {
              this.mainChartData[1].data.shift();
            }
          }
        }
      })
  }

  getDownloadData() {
    this.spinner.show();
    var now = new Date()
    var todayDate = new Date()
    todayDate.setHours(0, 0, 0, 0)
    var start = now.getTime()
    var old = todayDate.getTime()
    let value = {
      title: 'WebSeriesAPI',
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
    var csvStr = "Web Series API Reports" + "\n";
    csvStr += "\n";
    csvStr += 'Threshold Value : 1 Sec' + "\n";
    csvStr += "\n";
    let JsonFields = ["S.No", "Hit Time", "Response Time(In Seconds)"]
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
    hiddenElement.download = 'Web-Series-API-Reports.csv';
    hiddenElement.click();
    this.spinner.hide();
  }

  exportAsExel(userData, timeData, params) {
    var csvStr = "DISH BUZZ Reports" + "\n";
    csvStr += "\n";
    if (params.start) {
      let value = new Date(params.start);
      let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(value);
      let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(value);
      let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(value);
      var date1 = `${da}/${mo}/${ye}`
    }
    if (params.end) {
      let value = new Date(params.end);
      let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(value);
      let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(value);
      let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(value);
      var date2 = `${da}/${mo}/${ye}`
    }
    csvStr += `${date1} - ${date2}` + "\n";
    csvStr += "\n";
    let JsonFields = ["Program Name", "Date", "Time", "Users", "Total Time Spent"]
    csvStr += JsonFields.join(",") + "\n";
    for (let index = 0; index < userData.length; index++) {
      const programName = userData[index]._id;
      userData[index].data.forEach((element, ind) => {
        let time = element.time
        let date = element.date
        let user = element.total;
        let spentTime = timeData[index].data[ind].total
        csvStr += programName + "," + date + ',' + time + ',' + user + "," + spentTime + "\n";
      });
    }
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvStr);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'DishBuzzReports.csv';
    hiddenElement.click();
  }
  checkFunction() {
    let array1 = [
      { key: "no1", value: 1 },
      { key: "no2", value: 1 },
      { key: "no3", value: 1 },
      { key: "no4", value: 4 },
      { key: "no5", value: 5 },
      { key: "no6", value: 6 },
      { key: "no7", value: 7 },
    ]
    let array2 = [0, 2, 6]
    let i = 0
    let array3 = []
    for (let index = 0; index < array2.length; index++) {
      var array4 = []
      array1.forEach(element => {
        if (element.value > array2[i] && element.value < array2[i + 1]) {
          array4.push(element)
        }
      });
      array3.push(array4)
      i = i + 1
    }
  }
}
