import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipementComponent } from './equipement.component';

const routes: Routes = [{ path: '', component: EquipementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipementRoutingModule { }
