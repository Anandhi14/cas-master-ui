import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MultiSelectModule } from 'primeng/multiselect'
import { HttpClientModule } from '@angular/common/http';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import {  ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderModule } from '../layout/loader/loader.module';
import { DialogModule } from 'primeng/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DividerModule } from 'primeng/divider';
import { CardComponent } from '../modules/governance/card/card.component';
import { CheckboxModule } from 'primeng/checkbox';
// import { CommonModule } from '@angular/common';
import { ProcessMasterComponent } from '../modules/governance/components/process-master/process-master.component';

@NgModule({
  declarations: [
    CardComponent,
    // ProcessMasterComponent
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    // AppRoutingModule,
    DialogModule,
    LoaderModule,
    DropdownModule,
    CheckboxModule,
    // BrowserAnimationsModule,
    ListboxModule,
    ButtonModule,
    BreadcrumbModule,
    InputTextModule,
    FormsModule,
    FieldsetModule,
    CardModule,
    ConfirmPopupModule,
    ToastModule,
    TableModule,MultiSelectModule,HttpClientModule,
    InputSwitchModule,
    DividerModule
    // SharedRoutingModule
  ],
  exports:[
    // BrowserModule,
    // AppRoutingModule,
    DialogModule,
    LoaderModule,
    DropdownModule,
    // BrowserAnimationsModule,
    ListboxModule,
    ButtonModule,
    BreadcrumbModule,
    InputTextModule,
    FormsModule,
    FieldsetModule,
    CardModule,
    ConfirmPopupModule,
    ToastModule,
    TableModule,MultiSelectModule,HttpClientModule,
    InputSwitchModule,
    CardComponent,
    CommonModule,
    DividerModule
  ]
})
export class SharedModule { }
