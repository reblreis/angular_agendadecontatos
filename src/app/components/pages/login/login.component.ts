import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AutenticarService } from '../../../services/autenticar.service';
import { AutenticarRequest } from '../../../models/autenticar.request';
import { AuthHelper } from '../../../helpers/auth.helper';
import { MessageComponent } from '../../layout/message/message.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, MessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  //variáveis do componente
  mensagem: string = '';
  displayPage: boolean = false;

  //método construtor
  constructor(
    private autenticarService: AutenticarService,
    private authHelper: AuthHelper,
    private router: Router
  ){}

  ngOnInit(): void {
    //verificando se o usuário já está autenticado
    if(this.authHelper.getData() != null)
      this.router.navigate(['/app/dashboard']);
    else
      this.displayPage = true;
  }

  //estrutura do formulário:
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ])
  });

  //função para acessar os campos do formulário
  //e verificar se possuem algum erro de validação
  get f() {
    return this.form.controls;
  }

  //função para capturar o SUBMIT do formulário
  submit() : void {

    this.mensagem = "Processando requisição, por favor aguarde...";
   
    //capturando os dados da requisição
    const request : AutenticarRequest = {
      email: this.form.value.email as string,
      senha: this.form.value.senha as string,
    }

    //fazendo a requisição para a API
    this.autenticarService.post(request)
      .subscribe({
        next: (data) => {
         
          //gravar os dados do usuário autenticado na local storage
          this.authHelper.signIn(data);

          //redirecionar o usuário para /app/dashboard
          this.router.navigate(['/app/dashboard'])
            .then(() => {
              window.location.reload();
            });
        },
        error: (e) => {
          this.mensagem = e.error.message;
        }
      })
  }
}