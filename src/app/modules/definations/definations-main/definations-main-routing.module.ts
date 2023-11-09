import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionFormComponent } from '../components/function-form/function-form.component';
import { LocationFormComponent } from '../components/location-form/location-form.component';
import { DefinationsMainComponent } from './definations-main.component';
import { GoalsComponent } from '../components/goals/goals.component';
import { LocationListComponent } from '../components/location-list/location-list.component';

const routes: Routes = [
  { path: '', component: DefinationsMainComponent},
  { path: 'function', component: FunctionFormComponent},
  { path: 'location', component: LocationFormComponent},
  { path: 'goals', component: GoalsComponent},
  { path: 'locationList', component: LocationListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefinationsMainRoutingModule { }
