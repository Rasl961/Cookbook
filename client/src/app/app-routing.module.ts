import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard]
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
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

