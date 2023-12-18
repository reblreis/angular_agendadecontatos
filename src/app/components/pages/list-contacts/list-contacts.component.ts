import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContatosService } from '../../../services/contatos.service';
import { ContatoResponse } from '../../../models/contato.response';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment';
import { MessageComponent } from '../../layout/message/message.component';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-list-contacts',
  standalone: true,
  imports: [CommonModule , MessageComponent, NgxPaginationModule],
  templateUrl: './list-contacts.component.html',
  styleUrl: './list-contacts.component.css'
})
export class ListContactsComponent implements OnInit {


  //variáveis
  contatos: ContatoResponse[] = [];
  mensagem: string = '';
  paginador: number = 1;


  constructor(
    private contatosService: ContatosService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.contatosService.get()
      .subscribe({
        next: (data) => {
          this.contatos = data;
        },
        error: (e) => {
          console.log(e);
        }
      })
  }


  //função para executar a edição
  onEdit(idContato: string): void {


    idContato = CryptoJS.AES
      .encrypt(idContato, environment.cryptoKey)
      .toString();


    this.router.navigate(['/app/edit-contacts', idContato]);
  }


  //função para executar a exclusão
  onDelete(idContato: string): void {
    if(confirm('Deseja realmente excluir o contato selecionado?')) {
      this.contatosService.delete(idContato)
        .subscribe({
          next: (data) => {
            this.mensagem = `Contato '${data.nome}', excluído com sucesso.`;
            this.ngOnInit(); //refazer a consulta de contatos
          },
          error: (e) => {
            console.log(e);
          }
        });
    }
  }


  //função para armazenar o numero
  //da pagina que estamos navegando
  //através do paginador
  handlePageChange(event: any) : void {
    this.paginador = event;
  }
}