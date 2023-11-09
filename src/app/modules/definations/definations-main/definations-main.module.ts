import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { DefinationsMainRoutingModule } from './definations-main-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FunctionFormComponent } from '../components/function-form/function-form.component';
import { LocationFormComponent } from '../components/location-form/location-form.component';
import { DefinationsMainComponent } from './definations-main.component';
import { GoalsComponent } from '../components/goals/goals.component';
import { LocationListComponent } from '../components/location-list/location-list.component';
import { TableModule } from 'primeng/table';
import {  ReactiveFormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MenuModule} from 'primeng/menu';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { AccordionModule } from 'primeng/accordion';
@NgModule({
  declarations: [
    FunctionFormComponent,
    LocationFormComponent,
    DefinationsMainComponent,
    GoalsComponent,
    LocationListComponent,
  ],
  imports: [
    CommonModule,
    MenuModule,
    InputTextModule,
    ReactiveFormsModule,
    TableModule,
    ConfirmDialogModule,
    ButtonModule,
    DefinationsMainRoutingModule,
    SharedModule,
    DropdownModule,
    TreeTableModule,
    AccordionModule
  ]
})
export class DefinationsMainModule { }
