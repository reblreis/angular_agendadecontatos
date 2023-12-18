import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContatoRequest } from '../models/contato.request';
import { Observable } from 'rxjs';
import { ContatoResponse } from '../models/contato.response';
import { environment } from '../../environments/environment';
import { AuthHelper } from '../helpers/auth.helper';
import { DashboardResponse } from '../models/dashboard.response';

@Injectable({
  providedIn: 'root',
})
export class ContatosService {

  //variável
  endpoint: string = `${environment.apiContatos}/contatos`;

  //método construtor
  constructor(
    private httpClient: HttpClient,
    private authHelper: AuthHelper
    ) {}

  //função para cadastrar o contato
  post(request: ContatoRequest): Observable<ContatoResponse> {
    return this.httpClient.post<ContatoResponse>(
      this.endpoint,
      request, { headers: this.headers }
    );
  }

  //função para atualizar o contato
  put(request: ContatoRequest): Observable<ContatoResponse> {
    return this.httpClient.put<ContatoResponse>(
      this.endpoint,
      request, { headers: this.headers }
    )
  }

  //função para excluir o contato
  delete(idContato: string): Observable<ContatoResponse> {
    return this.httpClient.delete<ContatoResponse>(
      `${this.endpoint}/${idContato}`,
      { headers: this.headers }
    )
  }

  //função para consultar os contatos
  get(): Observable<ContatoResponse[]> {
    return this.httpClient.get<ContatoResponse[]>(
      this.endpoint,
      { headers: this.headers }
    )
  }

  //função para consultar os contatos
  getById(idContato: string): Observable<ContatoResponse> {
    return this.httpClient.get<ContatoResponse>(
      `${this.endpoint}/${idContato}`,
      { headers: this.headers }
    )
  }

  //função para consultar os dados do dashboard
  getDashboard(): Observable<DashboardResponse[]> {
    return this.httpClient.get<DashboardResponse[]>(
      `${environment.apiContatos}/dashboard`,
      { headers: this.headers }
    )
  }

  get headers() : HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authHelper.getData()?.accessToken}`
    });
  }
}