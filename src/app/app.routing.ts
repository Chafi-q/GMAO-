import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)//Une fois que le module est chargé, 
        //Angular utilisera le composant DashboardComponent
        // comme composant principal pour cette route.
      },
      {
        path: 'tache',
        loadChildren: () => import('./modules/tache/tache.module').then(m => m.TacheModule)
      },
      {
        path: 'maintenance',
        loadChildren: () => import('./modules/maintenance/maintenance.module').then(m => m.MaintenanceModule)
      },
      {
        path: 'equipement',
        loadChildren: () => import('./modules/equipement/equipement.module').then(m => m.EquipementModule)
      },
      {
        path: 'responsable',
        loadChildren: () => import('./modules/responsable/responsable.module').then(m => m.ResponsableModule)
      }
    ]
  }
];
