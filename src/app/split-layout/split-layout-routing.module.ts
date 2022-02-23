import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

import { SplitLayoutPage } from './split-layout.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full'
  },
  {
    path: '',
    component: SplitLayoutPage,
    children: [
      {
        path: 'contacts',
        loadChildren: () => import('../pages/contacts/contacts.module').then(m => m.ContactsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'secret',
        loadChildren: () => import('../pages/secret/secret.module').then( m => m.SecretPageModule),
        canActivate: [AuthGuard],
        data: {
          role: 'ADMIN'
        }
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'account',
        loadChildren: () => import('../pages/account/account/account.module').then(m => m.AccountPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'logout',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplitLayoutPageRoutingModule {}
