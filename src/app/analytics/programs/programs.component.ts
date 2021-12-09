import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  id: any
  startTime: string;
  diff: number;

  constructor(
    private APIService: CommonService
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
    this.APIService.getProgramList(value)
      .subscribe(data => {
        console.log(data,"getProgramList")
        if (data.length) {
          const endTime = new Date().getTime();
          this.diff = (endTime - startTime) / 1000
          // this.spinner.hide();
        }
      })
    this.APIService.getAllProgramList(value)
      .subscribe(data => {
        console.log(data,"getAllProgramList")
        if (data.length) {
          // const endTime = new Date().getTime();
          // this.diff = (endTime - startTime) / 1000
          // this.spinner.hide();
        }
      })
  }

}
