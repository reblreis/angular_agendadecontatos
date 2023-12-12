import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContatoRequest } from '../models/contato.request';
import { Observable } from 'rxjs';
import { ContatoResponse } from '../models/contato.response';
import { environment } from '../../environments/environment';
import { AuthHelper } from '../helpers/auth.helper';

@Injectable({
  providedIn: 'root',
})
export class ContatosService {

  //método construtor
  constructor(
    private httpClient: HttpClient,
    private authHelper: AuthHelper
    ) {}

  //função para cadastrar o contato
  post(request: ContatoRequest): Observable<ContatoResponse> {

    const httpHeaders = new HttpHeaders({
        'Authorization': `Bearer ${this.authHelper.getData()?.accessToken}`
    });

    return this.httpClient.post<ContatoResponse>(
      environment.apiContatos + '/contatos',
      request, { headers: httpHeaders }
    );
  }
}