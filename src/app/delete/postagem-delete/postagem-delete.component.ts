import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from 'src/model/Postagem';
import { Tema } from 'src/model/Tema';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPost: number

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private postagemService: PostagemService,

  ) { }

  ngOnInit() {

    window.scroll(0,0)
    
    if(environment.token == '') {
      // alert("Sua sessão expirou! Faça o login novamente.")
      this.router.navigate(['/login'])
    }

    this.idPost = this.actRoute.snapshot.params['id']
    this.findByIdPostagem(this.idPost)
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }


  apagar(){
    this.postagemService.deletePostagem(this.idPost).subscribe(() => {
      alert("Postagem deletada com sucesso!")
      this.router.navigate(['/inicio'])
    })
  }

}

