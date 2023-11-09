import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssestsMainComponent } from './assests-main.component';
import { MetricsDataFormComponent } from '../components/metrics-data-form/metrics-data-form.component';
import { ToolsAndAppsComponent } from '../components/tools-and-apps/tools-and-apps.component';
import { AppsComponent } from '../components/apps/apps.component';

const routes: Routes = [
  { path: '', component: AssestsMainComponent},
  { path: 'assets', component: AssestsMainComponent},
  { path: 'tools&apps', component: ToolsAndAppsComponent},
  { path: 'guage/data-entry', component: MetricsDataFormComponent},
  { path: 'guage', component: AppsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssestsMainRoutingModule { }
