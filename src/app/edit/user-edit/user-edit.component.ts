import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

usuario: Usuario = new Usuario()
idUser: number

  constructor(
    private authService: AuthService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == '') {
      // alert("Sua sessão expirou! Faça o login novamente.")
      this.router.navigate(['/login'])
    }
    this.idUser = this.actRoute.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmeSenha(event: any) {

  }

tipoUsuario(event: any) {

}

atualizar() {


}

findByIdUser(id: number) {
  this.authService.getUserById(id).subscribe((resp: Usuario) =>{
    this.usuario = resp
  })
}

}
