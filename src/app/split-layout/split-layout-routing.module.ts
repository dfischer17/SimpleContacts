import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../core/guards/authentication.guard';

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
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'secret',
        loadChildren: () => import('../pages/secret/secret.module').then( m => m.SecretPageModule),
        canActivate: [AuthenticationGuard],
        data: {
          role: 'admin'
        }
      },
      {
        path: 'settings',
        loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule),
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'account',
        loadChildren: () => import('../pages/account/account/account.module').then(m => m.AccountPageModule),
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'logout',
        loadChildren: () => import('../pages/login/login.module').then(m => m.LoginPageModule),
        canActivate: [AuthenticationGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplitLayoutPageRoutingModule {}
