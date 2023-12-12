import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContatosService } from '../../../services/contatos.service';
import { ContatoRequest } from '../../../models/contato.request';

@Component({
  selector: 'app-create-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-contacts.component.html',
  styleUrl: './create-contacts.component.css'
})
export class CreateContactsComponent {

  mensagem: string = '';

  //construtor
  constructor(
    private contatosService: ContatosService
  ) {}

  //estrutura do formulário
  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    telefone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  //função para acessar os campos do formulário
  get f() {
    return this.form.controls;
  }

  //função para capturar o submit do formulário
  submit(): void {

    this.mensagem = 'Processando, por favor aguarde...';

    //capturar os dados do formulário
    const request : ContatoRequest = {
      nome : this.form.value.nome as string,
      email: this.form.value.email as string,
      telefone: this.form.value.telefone as string
    };

    //enviando a requisição para a API
    this.contatosService.post(request)
      .subscribe({
        next: (data) => {
          this.mensagem = `Contato '${data.nome}', cadastrado com sucesso!`;
          this.form.reset();
        },
        error: (e) => {
          console.log(e);
        }
      })
  }
}