import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationPageComponent
    // loadChildren: './layout/layout.module#LayoutModule',
  },
  {
    path: 'registration',
    component: RegistrationPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '**',
    redirectTo: 'registration'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

