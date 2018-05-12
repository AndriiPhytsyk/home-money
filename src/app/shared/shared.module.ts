import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { LoadComponent } from './components/load/load.component';



@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    LoadComponent
  ],
  declarations: [LoadComponent]
})

export class SharedModule {}
