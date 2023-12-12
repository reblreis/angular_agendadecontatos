import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutenticarResponse } from '../../../models/autenticar.response';
import { AuthHelper } from '../../../helpers/auth.helper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  //variável de componente
  usuario: AutenticarResponse | null = null;

  //construtor
  constructor(
    private authHelper: AuthHelper,
    private router: Router
  ){}

  ngOnInit(): void {
    //capturar os dados do usuário autenticado
    this.usuario = this.authHelper.getData();
  }

  sair(): void {
    if(confirm('Deseja realmente sair do sistema?')) {

      //apagar os dados da local storage
      this.authHelper.signOut();

      //redirecionar para a página de login
      this.router.navigate(['/app/login'])
        .then(() => {
          window.location.reload();
        });
    }
  }
}