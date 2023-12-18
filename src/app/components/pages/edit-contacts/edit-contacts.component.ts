import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment';
import { ContatosService } from '../../../services/contatos.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ContatoRequest } from '../../../models/contato.request';
import { MessageComponent } from '../../layout/message/message.component';

@Component({
  selector: 'app-edit-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MessageComponent],
  templateUrl: './edit-contacts.component.html',
  styleUrl: './edit-contacts.component.css'
})
export class EditContactsComponent implements OnInit {

  //variáveis
  mensagem: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private contatosService: ContatosService
  ) {}

  //estrutura do formulário
  form = new FormGroup({
    idContato: new FormControl('', []),
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    telefone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  //função para acessar os campos do formulário
  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    id = CryptoJS.AES
      .decrypt(id, environment.cryptoKey)
      .toString(CryptoJS.enc.Utf8);

    this.contatosService.getById(id as string)
      .subscribe({
        next: (data) => {
          this.form.patchValue(data);
        },
        error: (e) => {
          console.log(e);
        }
      })
  }

  submit(): void {
   
      this.mensagem = 'Processando, por favor aguarde...';

      const request : ContatoRequest = {
        idContato : this.form.value.idContato as string,
        nome : this.form.value.nome as string,
        telefone : this.form.value.telefone as string,
        email : this.form.value.email as string
      };

      this.contatosService.put(request)
        .subscribe({
          next: (data) => {
            this.mensagem = `Contato '${data.nome}', atualizado com sucesso!`;
          },
          error: (e) => {
            console.log(e);
          }
        })
  }
}