import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { BlankComponent } from './views/blank/blank.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { NonAuthGuard } from './utils/guards/non-auth.guard';
import {
  PermissionIndexComponent, PermissionCreateComponent, PermissionEditComponent, PermissionShowComponent,
  RoleIndexComponent, RoleCreateComponent, RoleShowComponent, RoleEditComponent,
  UserIndexComponent, UserCreateComponent, UserShowComponent, UserEditComponent,
  PositionIndexComponent, PositionCreateComponent, PositionShowComponent, PositionEditComponent,
  FormIndexComponent, FormCreateComponent, FormShowComponent, FormEditComponent,
  LegalEntityIndexComponent, LegalEntityCreateComponent, LegalEntityShowComponent, LegalEntityEditComponent,
  IndividualIndexComponent, IndividualCreateComponent, IndividualShowComponent, IndividualEditComponent,
  BankIndexComponent, BankCreateComponent, BankShowComponent, BankEditComponent,
  PolicyIndexComponent, PolicyCreateComponent, PolicyShowComponent, PolicyEditComponent,
} from './views';

const routes: Routes = [
  {
    path: '',
    // component: MainComponent,
    canActivate: [NonAuthGuard],
    canActivateChild: [NonAuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'blank',
        component: BlankComponent,
      },
      {
        path: 'users/permissions',
        component: PermissionIndexComponent,
      },
      {
        path: 'users/permissions/create',
        component: PermissionCreateComponent,
      },
      {
        path: 'users/permissions/:id',
        component: PermissionShowComponent,
      },
      {
        path: 'users/permissions/:id/edit',
        component: PermissionEditComponent,
      },
      {
        path: 'users/roles',
        component: RoleIndexComponent,
      },
      {
        path: 'users/roles/create',
        component: RoleCreateComponent,
      },
      {
        path: 'users/roles/:id',
        component: RoleShowComponent,
      },
      {
        path: 'users/roles/:id/edit',
        component: RoleEditComponent,
      },
      {
        path: 'users',
        component: UserIndexComponent,
      },
      {
        path: 'users/create',
        component: UserCreateComponent,
      },
      {
        path: 'users/:id',
        component: UserShowComponent,
      },
      {
        path: 'users/:id/edit',
        component: UserEditComponent,
      },
      {
        path: 'users/positions',
        component: PositionIndexComponent,
      },
      {
        path: 'users/positions/create',
        component: PositionCreateComponent,
      },
      {
        path: 'users/positions/:id',
        component: PositionShowComponent,
      },
      {
        path: 'users/positions/:id/edit',
        component: PositionEditComponent,
      },
      {
        path: 'forms',
        component: FormIndexComponent,
      },
      {
        path: 'forms/create',
        component: FormCreateComponent,
      },
      {
        path: 'forms/:id',
        component: FormShowComponent,
      },
      {
        path: 'forms/:id/edit',
        component: FormEditComponent,
      },
      {
        path: 'legal-entities',
        component: LegalEntityIndexComponent,
      },
      {
        path: 'legal-entities/create',
        component: LegalEntityCreateComponent,
      },
      {
        path: 'legal-entities/:id',
        component: LegalEntityShowComponent,
      },
      {
        path: 'legal-entities/:id/edit',
        component: LegalEntityEditComponent,
      },
      {
        path: 'individuals',
        component: IndividualIndexComponent,
      },
      {
        path: 'individuals/create',
        component: IndividualCreateComponent,
      },
      {
        path: 'individuals/:id',
        component: IndividualShowComponent,
      },
      {
        path: 'individuals/:id/edit',
        component: IndividualEditComponent,
      },
      {
        path: 'banks',
        component: BankIndexComponent,
      },
      {
        path: 'banks/create',
        component: BankCreateComponent,
      },
      {
        path: 'banks/:id',
        component: BankShowComponent,
      },
      {
        path: 'banks/:id/edit',
        component: BankEditComponent,
      },
      {
        path: 'policies',
        component: PolicyIndexComponent,
      },
      {
        path: 'policies/create',
        component: PolicyCreateComponent,
      },
      {
        path: 'policies/:id',
        component: PolicyShowComponent,
      },
      {
        path: 'policies/:id/edit',
        component: PolicyEditComponent,
      },
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
