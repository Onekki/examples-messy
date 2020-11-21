import { Component, OnInit } from '@angular/core';
import { SiteService } from './site.service';

@Component({
  selector: 'app-site',
  template: '<router-outlet></router-outlet>'
})
export class SiteComponent {}

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html'
})
export class SiteListComponent implements OnInit {

  pageIndex = 1;
  pageSize = 10;
  dataSet: any = [];
  _loading = false;

  constructor(private siteService: SiteService) { }

  ngOnInit() {
    this.query()
  }

  query() {
    this._loading = true
    this.siteService.getSiteList(this.pageIndex, this.pageSize)
      .subscribe((resp: any) => {
        this._loading = false
        this.dataSet = resp;
      })
  }

}
