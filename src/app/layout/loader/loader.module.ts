import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner'
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    // SharedModule
  ],
  exports:[LoaderComponent]
})
export class LoaderModule { }
