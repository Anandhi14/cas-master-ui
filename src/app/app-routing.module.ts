import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessMasterComponent } from './modules/governance/components/process-master/process-master.component';
import { MetricsMasterComponent } from './modules/governance/components/metrics-master/metrics-master.component';
import { GovernanceMainComponent } from './modules/governance/governance-main/governance-main.component';
import { ProcessListingComponent } from './modules/governance/components/process-listing/process-listing.component';
import { FunctionFormComponent } from './modules/definations/components/function-form/function-form.component';
import { LocationFormComponent } from './modules/definations/components/location-form/location-form.component';
import { DefinationsMainComponent } from './modules/definations/definations-main/definations-main.component';
import { MetricsListingComponent } from './modules/governance/components/metrics-listing/metrics-listing.component';
import { HomeComponent } from './modules/home/home/home.component';
import { PersonaMainComponent } from './modules/home/home/persona/persona-main/persona-main.component';
import { AssestsMainComponent } from './modules/assets/assests-main/assests-main.component';

const routes: Routes = [
  {path:'governance',loadChildren:()=>import('./modules/governance/governance-main/governance-main.module').then(m=>m.GovernanceMainModule)},
  {path:'assets',loadChildren:()=>import('./modules/assets/assests-main/assests-main.module').then(m=>m.AssestsMainModule)},
  {path:'definitions',loadChildren:()=>import('./modules/definations/definations-main/definations-main.module').then(m=>m.DefinationsMainModule)},
  {path:'home',loadChildren:()=>import('./modules/home/home/home.module').then(m=>m.HomeModule)


},
{path:'',loadChildren:()=>import('./modules/home/home/home.module').then(m=>m.HomeModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
