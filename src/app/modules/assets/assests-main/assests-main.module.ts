import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssestsMainRoutingModule } from './assests-main-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppsComponent } from '../components/apps/apps.component';
import { ToolsAndAppsComponent } from '../components/tools-and-apps/tools-and-apps.component';
import { AssestsMainComponent } from './assests-main.component';
import { MetricsDataFormComponent } from '../components/metrics-data-form/metrics-data-form.component';


@NgModule({
  declarations: [
    AssestsMainComponent,
    ToolsAndAppsComponent,
    AppsComponent,
    MetricsDataFormComponent,
  ],
  imports: [
    CommonModule,
    AssestsMainRoutingModule,
    SharedModule
  ]
})
export class AssestsMainModule { }
