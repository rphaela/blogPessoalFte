import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';
import { Tema } from 'src/model/Tema';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  idTema: number

  constructor(

    private temaService: TemaService,
    private router: Router,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(){
    if(environment.token == '') {
      // alert("Sua sessão expirou! Faça o login novamente.")
      this.router.navigate(['/login'])
    }

    this.idTema = this.actRoute.snapshot.params['id']
    this.findById(this.idTema)
  }

  findById(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  delete() {
    this.temaService.deleteTema(this.idTema).subscribe(()=>{
      alert("Tema apagado com sucesso!")
      this.router.navigate(['/tema'])
    })
  }

}
