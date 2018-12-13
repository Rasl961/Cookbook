import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap';
import { SearchPipe } from './shared/pipes/search.pipe';
import { HeaderComponent } from './shared/components/header/header.component';
import { from } from 'rxjs';
import { FooterComponent } from './shared/components/footer/footer.component';
import { TokenInterceptor } from '../helpers/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    RecipesComponent,
    SearchPipe,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    CollapseModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
