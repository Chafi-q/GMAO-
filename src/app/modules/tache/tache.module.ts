import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TacheRoutingModule } from './tache-routing.module';
import { TacheComponent } from './tache.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { SchedularComponent } from './component/schedular/schedular.component';
import { BryntumSchedulerModule } from '@bryntum/scheduler-angular';






@NgModule({
  declarations: [
    TacheComponent,
    SchedularComponent
    
  ],
  imports: [
    CommonModule,
    TacheRoutingModule,
    MatGridListModule,
    DemoMaterialModule,
    MatInputModule,
    MatFormFieldModule,
    MatFormFieldModule,FormsModule, ReactiveFormsModule,jqxGridModule,BryntumSchedulerModule
  ]
})
export class TacheModule { }
