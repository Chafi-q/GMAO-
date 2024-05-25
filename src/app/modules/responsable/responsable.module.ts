import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsableRoutingModule } from './responsable-routing.module';
import { ResponsableComponent } from './responsable.component';


@NgModule({
  declarations: [
    ResponsableComponent
  ],
  imports: [
    CommonModule,
    ResponsableRoutingModule
  ]
})
export class ResponsableModule { }
