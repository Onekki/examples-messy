import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [NgZorroAntdModule, BrowserModule],
  declarations: [UserComponent],
  exports: [UserComponent]
})
export class UserModule { }
