import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipementRoutingModule } from './equipement-routing.module';
import { EquipementComponent } from './equipement.component';


@NgModule({
  declarations: [
    EquipementComponent
  ],
  imports: [
    CommonModule,
    EquipementRoutingModule
  ]
})
export class EquipementModule { }
