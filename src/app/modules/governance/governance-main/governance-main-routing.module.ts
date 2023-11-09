import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessMasterComponent } from '../components/process-master/process-master.component';
import { MetricsMasterComponent } from '../components/metrics-master/metrics-master.component';
import { ProcessListingComponent } from '../components/process-listing/process-listing.component';
import { GovernanceMainComponent } from './governance-main.component';
import { MetricsListingComponent } from '../components/metrics-listing/metrics-listing.component';

const routes: Routes = [
  { path: '', component:GovernanceMainComponent,children: [] },
  { path: 'process', component: ProcessMasterComponent },
  { path: 'metrics', component: MetricsMasterComponent },
  { path: 'governance', component: GovernanceMainComponent },
  { path: 'processList', component: ProcessListingComponent},
  { path: 'metricsList', component: MetricsListingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovernanceMainRoutingModule { }
