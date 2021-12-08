import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from "ngx-spinner";

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
    const startTime = new Date().getTime();
    const time1 = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }).format(startTime)
    this.startTime = time1
    this.APIService.getVideoPlayerData()
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
