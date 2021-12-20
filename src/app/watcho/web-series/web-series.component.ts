import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Color, defaultColors } from 'ng2-charts';
import * as pluginAnnotation from 'chartjs-plugin-annotation';
// const CronJob = require('../lib/cron.js').CronJob;
import { interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  constructor(
    private APIService: CommonService,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.get()
    this.getData(1)
    // this.id = setInterval(() => {
    //   this.getData(2)
    // }, 30000)
    interval(30000).subscribe(x => {
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
    hiddenElement.download = 'Web-Series-API-Reports.csv';
    hiddenElement.click();
  }

  get() {
    var startDate = new Date(new Date().setDate(new Date().getDate() - 1));
    var endDate = new Date();
    let st_date: any = {};
    let st_month: any = {};
    let en_date: any = {};
    let en_month: any = {};
    let month_st = startDate.getUTCMonth() + 1;
    let month_en = endDate.getUTCMonth() + 1;
    if (startDate.getDate() < 10) {
      st_date = '0' + startDate.getDate();
    } else {
      st_date = startDate.getDate();
    }
    if (month_st < 10) {
      st_month = '0' + month_st;
    } else {
      st_month = month_st;
    }
    if (endDate.getDate() < 10) {
      en_date = '0' + endDate.getDate();
    } else {
      en_date = endDate.getDate();
    }
    if (month_en < 10) {
      en_month = '0' + month_en;
    } else {
      en_month = month_en;
    }
    let minute: any = {};
    if (new Date().getMinutes() < 10) {
      minute = '0' + new Date().getMinutes();
    } else {
      minute = new Date().getMinutes();
    }
    // this.reportForm.patchValue({
    // 	type_id: 'all',
    // 	start_date: startDate.getFullYear() + '-' + st_month + '-' + st_date + 'T' + new Date().getHours() + ':' + minute,
    // 	end_date: endDate.getFullYear() + '-' + en_month + '-' + en_date + 'T' + new Date().getHours() + ':' + minute,
    // })
    const params: any = {};
    params.start = this.timeConversion(startDate);
    params.end = this.timeConversion(endDate);
    // this.user = this.authenticationService.getUser();
    params.dish = false;
    params.d2h = false;
    this.getAnaylticsLanguage(params);
  }
  timeConversion(time) {
    time = new Date(time);
    time.setHours(time.getHours() + 5);
    time.setMinutes(time.getMinutes() + 30);
    return time;
  }

  getAnaylticsLanguage(params) {
    let startDate = new Date(params.start).getTime();
    let endDate = new Date(params.end).getTime();
    let diff = (endDate - startDate) / 1000
    let totalMinute = diff / 60
    let newArray = []
    let nowDate = Date.now()
    // https://stackoverflow.com/questions/42131900/add-5-minutes-to-current-time-javascript
    newArray.push(nowDate)
    for (let index = 0; index < totalMinute; index++) {
      // nowDate = new Date(nowDate - (5 * 60 * 1000));
      // newArray.push(nowDate)
      // var beforeDate = 
    }
    console.log(newArray,"----------------")
    this.APIService.getData(params)
      .subscribe(res => {
        let value = res
        value.forEach(element => {
          element.data.forEach((element, index) => {
            // console.log(element, "-----------------------")
          });
        });
      })
  }
}
