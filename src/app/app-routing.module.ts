import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'tache', loadChildren: () => import('./modules/tache/tache.module').then(m => m.TacheModule) }, 

{ path: 'maintenance', loadChildren: () => import('./modules/maintenance/maintenance.module').then(m => m.MaintenanceModule) }, 
{ path: 'material', loadChildren: () => import('./modules/equipement/equipement.module').then(m => m.EquipementModule) }, 
{ path: 'responsable', loadChildren: () => import('./modules/responsable/responsable.module').then(m => m.ResponsableModule) }, 
{ path: 'equipement', loadChildren: () => import('./modules/equipement/equipement.module').then(m => m.EquipementModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
