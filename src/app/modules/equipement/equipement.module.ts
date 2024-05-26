import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatGridListModule } from '@angular/material/grid-list';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { EquipementRoutingModule } from './equipement-routing.module';
import { EquipementComponent } from './equipement.component';


@NgModule({
  declarations: [
    EquipementComponent
  ],
  imports: [
    CommonModule,
    EquipementRoutingModule,
    CommonModule,
    MatGridListModule,
    DemoMaterialModule,
    MatInputModule,
    MatFormFieldModule,
    MatFormFieldModule,FormsModule, ReactiveFormsModule,MatDatepickerModule ,MatNativeDateModule 
  ]
})
export class EquipementModule { }
