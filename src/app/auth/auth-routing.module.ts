import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  // Cuando entramos en auth, siempre se va a mostrar el MainComponent
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'registro', component: RegisterComponent},
      { path: '**', redirectTo: 'login'}
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
