import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutenticarResponse } from '../models/autenticar.response';
import { AutenticarRequest } from '../models/autenticar.request';
import { environment } from '../../environments/environment';

/*
    Classe para executar os serviços
    da API de usuários para autenticação
*/
@Injectable({
  providedIn: 'root',
})
export class AutenticarService {

  //método construtor
  constructor(
    private httpClient: HttpClient
    ) {}

  //função para realizar a chamada da autenticação
  post(request: AutenticarRequest): Observable<AutenticarResponse> {
    return this.httpClient.post<AutenticarResponse>(
      `${environment.apiContatos}/autenticar`,
      request
    );
  }
}