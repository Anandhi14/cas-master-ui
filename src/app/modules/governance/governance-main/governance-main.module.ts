import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GovernanceMainRoutingModule } from './governance-main-routing.module';
import { CardComponent } from '../card/card.component';
import { MetricsMasterComponent } from '../components/metrics-master/metrics-master.component';
import { ProcessMasterComponent } from '../components/process-master/process-master.component';
import { GovernanceMainComponent } from './governance-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MetricsListingComponent } from '../components/metrics-listing/metrics-listing.component';
import { ProcessListingComponent } from '../components/process-listing/process-listing.component';
import { MetricsService } from '../services/metrics.service';
import { ProcessService } from '../services/process.service';
import { CheckboxModule } from 'primeng/checkbox';



@NgModule({
  declarations: [
    ProcessMasterComponent,
    MetricsMasterComponent,
    GovernanceMainComponent,
    ProcessListingComponent,
    MetricsListingComponent,
  ],
  imports: [
    CommonModule,
    GovernanceMainRoutingModule,
    SharedModule,
    CheckboxModule
    
    
  ],
  providers:[MetricsService,ProcessService]
})
export class GovernanceMainModule { }
