import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthHelper } from "../helpers/auth.helper";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(
        private router: Router,
        private authHelper: AuthHelper
    ) {}

    canActivate(): boolean {

        //verificando se o usuário está autenticado
        if(this.authHelper.getData() != null) {
            return true; //permitir acessar a rota desejada
        }

        //rota padrão quando não estiver autenticado
        this.router.navigate(['/app/login']);
        return false;
    }
}