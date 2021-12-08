import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from "ngx-spinner";

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
    this.APIService.getWebSeriesData(value)
      .subscribe(data => {
        if (data) {
          const endTime = new Date().getTime();
          this.diff = (endTime - startTime) / 1000
          if (this.diff > 3) {
            this.status = false
          }
          else {
            this.status = true
          }
          // this.spinner.hide();
        }
      })
  }

}
