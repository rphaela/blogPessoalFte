import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from 'src/model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  login() {
    this.authService.login(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp
        environment.token = this.usuarioLogin.token
        environment.nome = this.usuarioLogin.nome
        environment.foto = this.usuarioLogin.foto
        environment.id = this.usuarioLogin.id
        this.router.navigate(['/inicio'])
      },
      error: erro => {
        if(erro.status == 401){
          alert("Usuário e/ou senha incorretos")
        }
      },
    });

    }

}
