import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CriarContaRequest } from '../models/criar-conta.request';
import { CriarContaResponse } from '../models/criar-conta.response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/*
    Classe para realizar a integração com
    o serviço de criação de usuário na API
*/
@Injectable({
  providedIn: 'root',
})
export class CriarContaService {

  //método construtor
  //injeção de dependência
  constructor(
    private httpClient: HttpClient
    ) {}

  /*
        Método para fazer a chamada POST
        para criação de usuário na API
    */
  post(request: CriarContaRequest): Observable<CriarContaResponse> {
    //fazendo a chamada para a API
    return this.httpClient.post<CriarContaResponse>(
      `${environment.apiContatos}/criar-conta`,
      request
    );
  }
}