import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  pageIndex = 1;
  pageSize = 10;
  dataSet: any = [];
  _loading = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.query()
  }

  query() {
    this._loading = true
    this.userService.getUserList(this.pageIndex, this.pageSize)
      .subscribe((resp: any) => {
        this._loading = false
        this.dataSet = resp;
      })
  }

}
