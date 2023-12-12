import { Injectable } from '@angular/core';
import { AutenticarResponse } from '../models/autenticar.response';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

/*
    Classe para desenvolver as rotinas relacionadas
    a autenticação dos usuários usando a local storage
*/
@Injectable({
    providedIn: 'root'
})
export class AuthHelper {

    //variável da classe
    key: string = 'auth-user';

    //função para gravar os dados do usuário autenticado
    signIn(data: AutenticarResponse): void {

        //serializar e criptografar os dados..
        const content = CryptoJS.AES
            .encrypt(JSON.stringify(data), environment.cryptoKey)
            .toString();

        //gravar os dados..
        localStorage.setItem(this.key, content);
    }

    //função para retornar os dados do usuário autenticado
    getData(): AutenticarResponse | null {

        const auth = localStorage.getItem(this.key);
        if(auth != null) {

            //descriptografar os dados obtidos..
            const data = CryptoJS.AES
                .decrypt(auth as string, environment.cryptoKey)
                .toString(CryptoJS.enc.Utf8);


            //deserializar e retornar os dados..
            return JSON.parse(data);
        }

        return null;
    }

    //apagar os dados gravados na local storage
    signOut(): void {
        //apagar os dados gravados
        localStorage.removeItem(this.key);
    }
}