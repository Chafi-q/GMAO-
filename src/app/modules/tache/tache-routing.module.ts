import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TacheComponent } from './tache.component';


const routes: Routes = [{ path: '', component: TacheComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TacheRoutingModule { }
