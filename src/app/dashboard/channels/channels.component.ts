import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  id: any
  public mainChartData: Array<any> = [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },];
  public mainChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public mainChartLegend = true;
  public mainChartType = 'line';
  public mainChartColours: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: '#D0B1AA',
      pointRadius: 3,
      pointBorderWidth: 3,
      pointHoverBackgroundColor: '#fff'
    },
    {
      backgroundColor: 'transparent',
      borderColor: '#CFD166',
      pointRadius: 3,
      pointBorderWidth: 3,
      pointHoverBackgroundColor: '#fff'
    },
    {
      backgroundColor: 'transparent',
      borderColor: '#768167',
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
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 1,
            beginAtZero: true
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: "USERS",
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
      display: true,
      maxWidth: 5,
      labels: {
        boxWidth: 15,

      }
    }
  };
  diff: number;
  startTime: string;
  constructor(
    private APIService: CommonService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getData()
    this.id = setInterval(() => {
      this.getData()
    }, 30000)
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id)
    }
  }

  getData() {
    this.spinner.show();
    let now = new Date();
    var dateStringWithTime = moment(now).format(`yyyy-MM-DDTHH:mm:ss.SSSZ`);
    var tsYesterday = moment().subtract(144, 'hours').format(`yyyy-MM-DDTHH:mm:ss.SSSZ`);
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
    this.APIService.getChannelList(value)
      .subscribe(data => {
        if (data.length) {
          const endTime = new Date().getTime();
          this.diff = (endTime - startTime) / 1000
          this.spinner.hide();
        }
      })
  }
}