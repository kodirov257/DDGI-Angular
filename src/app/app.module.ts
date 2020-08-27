import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './pages/main/header/header.component';
import { FooterComponent } from './pages/main/footer/footer.component';
import { MenuSidebarComponent } from './pages/main/menu-sidebar/menu-sidebar.component';
import { BlankComponent } from './views/blank/blank.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './views/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { MessagesDropdownMenuComponent } from './pages/main/header/messages-dropdown-menu/messages-dropdown-menu.component';
import { NotificationsDropdownMenuComponent } from './pages/main/header/notifications-dropdown-menu/notifications-dropdown-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppButtonComponent } from './components/app-button/app-button.component';

import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/ru';
import { UserDropdownMenuComponent } from './pages/main/header/user-dropdown-menu/user-dropdown-menu.component';
import { BreadcrumbsComponent } from './pages/main/breadcrumbs/breadcrumbs.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor, JwtInterceptor } from './utils/interceptors';
import { AuthGuard } from './utils/guards/auth.guard';
import {
  AppService,
  AuthenticationService,
  FormService,
  PermissionService,
  RoleService,
  UserService,
  PositionService,
  LegalEntityService,
  IndividualService,
  BankService,
  InsuranceContractService,
  PolicyService,
  PolicyRegistrationService,
  TransactionService,
  ProductService,
  GroupService,
  KlassService,
  CurrencyService,
} from './utils/services';
import {
  PermissionIndexComponent, PermissionCreateComponent, PermissionShowComponent, PermissionEditComponent,
  RoleIndexComponent, RoleCreateComponent, RoleShowComponent, RoleEditComponent,
  FormIndexComponent, FormCreateComponent, FormShowComponent, FormEditComponent,
  UserIndexComponent, UserCreateComponent, UserShowComponent, UserEditComponent,
  PositionIndexComponent, PositionCreateComponent, PositionShowComponent, PositionEditComponent,
  LegalEntityIndexComponent, LegalEntityCreateComponent, LegalEntityShowComponent, LegalEntityEditComponent,
  IndividualIndexComponent, IndividualCreateComponent, IndividualShowComponent, IndividualEditComponent,
  BankIndexComponent, BankCreateComponent, BankShowComponent, BankEditComponent,
  InsuranceContractIndexComponent, InsuranceContractCreateComponent, InsuranceContractShowComponent, InsuranceContractEditComponent,
  PolicyIndexComponent, PolicyCreateComponent, PolicyShowComponent, PolicyEditComponent,
  PolicyRegistrationIndexComponent, PolicyRegistrationCreateComponent, PolicyRegistrationShowComponent,
  TransactionIndexComponent, TransactionCreateComponent, TransactionShowComponent, TransactionEditComponent,
  ProductIndexComponent, ProductCreateComponent, ProductShowComponent, ProductEditComponent,
  GroupIndexComponent, GroupCreateComponent, GroupShowComponent, GroupEditComponent,
  KlassIndexComponent, KlassCreateComponent, KlassShowComponent, KlassEditComponent,
  CurrencyIndexComponent, CurrencyCreateComponent, CurrencyShowComponent, CurrencyEditComponent,
} from './views';

registerLocaleData(localeEn, 'ru-RU');

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuSidebarComponent,
    BlankComponent,
    ProfileComponent,
    RegisterComponent,
    DashboardComponent,
    MessagesDropdownMenuComponent,
    NotificationsDropdownMenuComponent,
    AppButtonComponent,
    UserDropdownMenuComponent,
    BreadcrumbsComponent,
    PermissionIndexComponent, PermissionCreateComponent, PermissionShowComponent, PermissionEditComponent,
    RoleIndexComponent, RoleCreateComponent, RoleShowComponent, RoleEditComponent,
    FormShowComponent, FormIndexComponent, FormCreateComponent, FormEditComponent,
    UserIndexComponent, UserCreateComponent, UserShowComponent, UserEditComponent,
    LegalEntityIndexComponent, LegalEntityCreateComponent, LegalEntityShowComponent, LegalEntityEditComponent,
    IndividualIndexComponent, IndividualCreateComponent, IndividualShowComponent, IndividualEditComponent,
    BankIndexComponent, BankCreateComponent, BankShowComponent, BankEditComponent,
    PositionIndexComponent, PositionCreateComponent, PositionShowComponent, PositionEditComponent,
    InsuranceContractIndexComponent, InsuranceContractCreateComponent, InsuranceContractShowComponent, InsuranceContractEditComponent,
    PolicyIndexComponent, PolicyCreateComponent, PolicyShowComponent, PolicyEditComponent,
    PolicyRegistrationIndexComponent, PolicyRegistrationCreateComponent, PolicyRegistrationShowComponent,
    TransactionIndexComponent, TransactionCreateComponent, TransactionShowComponent, TransactionEditComponent,
    ProductIndexComponent, ProductCreateComponent, ProductShowComponent, ProductEditComponent,
    GroupIndexComponent, GroupCreateComponent, GroupShowComponent, GroupEditComponent,
    KlassIndexComponent, KlassCreateComponent, KlassShowComponent, KlassEditComponent,
    CurrencyIndexComponent, CurrencyCreateComponent, CurrencyShowComponent, CurrencyEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgbModule,
    HttpClientModule,
  ],
  providers: [
    AppService,
    AuthenticationService,
    PermissionService,
    RoleService,
    UserService,
    PositionService,
    FormService,
    LegalEntityService,
    IndividualService,
    BankService,
    InsuranceContractService,
    PolicyService,
    PolicyRegistrationService,
    TransactionService,
    ProductService,
    GroupService,
    KlassService,
    CurrencyService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
