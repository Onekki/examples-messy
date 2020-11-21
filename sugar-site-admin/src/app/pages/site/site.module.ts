import { NgModule } from '@angular/core';
import { SiteComponent, SiteListComponent } from './site.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SiteRouting } from './site.routing';
import { SiteService } from './site.service';
import { JcwComponent } from './jcw/jcw.component';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [NgZorroAntdModule, CommonModule, SiteRouting],
  declarations: [SiteComponent, SiteListComponent, JcwComponent],
  providers: [SiteService]
})
export class SiteModule { }
