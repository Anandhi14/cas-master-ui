import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoaderModule } from './layout/loader/loader.module';
import { DialogModule } from 'primeng/dialog';
import { ProcessMasterComponent } from './modules/governance/components/process-master/process-master.component';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListboxModule } from 'primeng/listbox';
import {  ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetricsMasterComponent } from './modules/governance/components/metrics-master/metrics-master.component';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect'
import { HttpClientModule } from '@angular/common/http';
import { GovernanceMainComponent } from './modules/governance/governance-main/governance-main.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CardComponent } from './modules/governance/card/card.component';
import { ProcessListingComponent } from './modules/governance/components/process-listing/process-listing.component';
import { FunctionFormComponent } from './modules/definations/components/function-form/function-form.component';
import { LocationFormComponent } from './modules/definations/components/location-form/location-form.component';
import { DefinationsMainComponent } from './modules/definations/definations-main/definations-main.component';
import { MetricsListingComponent } from './modules/governance/components/metrics-listing/metrics-listing.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { HomeComponent } from './modules/home/home/home.component';
import { PersonaMainComponent } from './modules/home/home/persona/persona-main/persona-main.component';
import { AssestsMainComponent } from './modules/assets/assests-main/assests-main.component';
import { ToolsAndAppsComponent } from './modules/assets/components/tools-and-apps/tools-and-apps.component';
import { AppsComponent } from './modules/assets/components/apps/apps.component';
import { SharedModule } from './shared/shared.module';
import { CommonServiceService } from './commonService/common-service.service';
import { ToastrService } from './_shared/services/toastr.service';
import { LocationListComponent } from './modules/definations/components/location-list/location-list.component';

import { TreeTableModule } from 'primeng/treetable';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,


    
  ],
  
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    TreeTableModule,
    AppRoutingModule,
    DialogModule,
    LoaderModule,
    DropdownModule,
    BrowserAnimationsModule,
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
    SharedModule,
    AccordionModule
   
  ],
  exports:[
    SharedModule
  ],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy},CommonServiceService,ToastrService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
