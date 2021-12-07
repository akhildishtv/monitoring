import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
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
    console.log(time1)
    this.APIService.getChannelList(value)
      .subscribe(data => {
        if (data.length) {
          const endTime = new Date().getTime();
          const diff = (endTime - startTime) / 1000
          this.spinner.hide();
          console.log(diff, "seconds")
        }
      })
  }
}
