import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jcw',
  templateUrl: './jcw.component.html'
})
export class JcwComponent implements OnInit {

  extra = {"lUserId":43500009028,"realname":"朱旺其","lGradeId":"20151","lClassId":"10200003439","studyTasks":[{"id":10270000035,"title":"2015级学生三年级第二学期教学计划","classHour":11,"credit":0.5,"courseCount":8},{"id":10270000034,"title":"2015级学生三年级第一学期教学计划","classHour":13,"credit":0.5,"courseCount":10},{"id":10270000032,"title":"2015级学生二年级第二学期教学计划","classHour":15,"credit":0.5,"courseCount":10},{"id":10250000016,"title":"2015级学生二年级第一学期教学计划","classHour":13,"credit":0.5,"courseCount":10}]}
  record = [{"title":"搜集就业信息（一）","videoDone":37,"videoTotal":37,"correctRate":"100.0%"},{"title":"搜集就业信息（二）","videoDone":38,"videoTotal":38,"correctRate":"100.0%"},{"title":"搜集就业信息（三）","videoDone":43,"videoTotal":43,"correctRate":"100.0%"},{"title":"搜集就业信息（四）","videoDone":43,"videoTotal":43,"correctRate":"100.0%"},{"title":"就业权益保护（一）","videoDone":43,"videoTotal":43,"correctRate":"100.0%"},{"title":"就业权益保护（二）","videoDone":41,"videoTotal":41,"correctRate":"100.0%"},{"title":"全真面试点评","videoDone":149,"videoTotal":149,"correctRate":"-/-"},{"title":"就业礼仪实操与案例","videoDone":119,"videoTotal":119,"correctRate":"-/-"}]

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams
      .subscribe((params: Params) => {
        // this.extraDataSet = JSON.parse(params.extra).studyTasks,
        // this.recordDataSet = params.record
        console.log(params)
      });
  }

}
