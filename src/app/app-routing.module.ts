import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'cadastrar', component: CadastroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login', component: LoginComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
