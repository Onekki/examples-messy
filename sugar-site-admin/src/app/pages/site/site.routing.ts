import { Routes, RouterModule } from '@angular/router';

import { SiteComponent, SiteListComponent } from "./site.component";
import { JcwComponent } from './jcw/jcw.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: SiteListComponent },
      { path: 'jcw', component: JcwComponent }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SiteRouting {}

