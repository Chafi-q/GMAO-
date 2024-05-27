import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsableRoutingModule } from './responsable-routing.module';
import { ResponsableComponent } from './responsable.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    ResponsableComponent
  ],
  imports: [
    CommonModule,
    ResponsableRoutingModule,
    MatPaginatorModule,
    CommonModule,
    MatGridListModule,
    DemoMaterialModule,
    MatInputModule,
    MatFormFieldModule,
    MatFormFieldModule,FormsModule, ReactiveFormsModule,MatDatepickerModule ,MatNativeDateModule
  ]
})
export class ResponsableModule { }
