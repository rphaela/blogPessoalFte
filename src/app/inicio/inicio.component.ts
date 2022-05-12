import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from 'src/model/Postagem';
import { Tema } from 'src/model/Tema';
import { Usuario } from 'src/model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[];

  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;

  usuario: Usuario = new Usuario();
  usuarioId = environment.id;

  constructor(

    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,

  ) { }

ngOnInit() {

  window.scroll(0,0)

    if(environment.token == '') {
      // alert("Sua sessão expirou! Faça o login novamente.")
      this.router.navigate(['/login'])
    }

    this.authService.refreshToken();
    this.getAllTemas();
    this.getAllPostagens();
}

getAllTemas() {
  this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
    this.listaTemas = resp
  })
}

findByIdTema(){
  this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
    this.tema = resp
  })
}

getAllPostagens() {
  this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
    this.listaPostagens = resp
  })
}

findUserById() {
  this.authService.getUserById(this.usuarioId).subscribe((resp: Usuario) => {
    this.usuario = resp
  })

}

publicar() {
  this.tema.id = this.idTema
  this.postagem.tema = this.tema

  this.usuario.id = this.usuarioId
  this.postagem.usuario = this.usuario

  this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
    this.postagem = resp
    alert("Postagem realizada com sucesso!")
    this.postagem = new Postagem()
    this.getAllPostagens()
  })

}

}
