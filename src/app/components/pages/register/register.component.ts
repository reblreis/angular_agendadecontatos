import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CriarContaService } from '../../../services/criar-conta.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordMatchValidation } from '../../../validations/password-match.validation';
import { CriarContaRequest } from '../../../models/criar-conta.request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  //variável do componente
  mensagem: string = '';

  //método construtor
  constructor(
    private criarContaService: CriarContaService
  ){}

  //formulário para cadastro de usuário
  form = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]),
    senhaConfirmacao: new FormControl('', [
      Validators.required
    ])
  }, {
    /* adicionando as validações customizadas do formulário */
    validators: [PasswordMatchValidation.matchPassword]
  });

  //função auxiliar oara que possamos verificar se algum
  //campo do formulário está com erro de validação
  get f() {
    return this.form.controls;
  }

  //função para realizar o submit do formulário
  submit(): void {

      //exibindo uma mensagem de carregamento
      this.mensagem = 'Processando requisição, por favor aguarde...';
   
      //preenchendo os dados da requisição
      const request : CriarContaRequest = {
        nome: this.form.value.nome as string,
        email: this.form.value.email as string,
        senha: this.form.value.senha as string
      };

      //executando a camada de serviço para realizar
      //a chamada para o método POST da API
      this.criarContaService
        .post(request)
        .subscribe({
          next: (data) => { //capturar a resposta de sucesso
            this.mensagem = `Parabéns ${data.nome}, sua conta de usuário foi criada com sucesso.`;
            this.form.reset(); //limpar os campos do formulário
          },
          error: (e) => { //capturar a resposta de erro
            this.mensagem = e.error.message;
          }
        });
  }
}