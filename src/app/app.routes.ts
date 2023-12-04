import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';


/*
    Mapeamento das rotas do projeto para
    exibir / renderizar componentes
*/
export const routes: Routes = [ //export = público
    {
        path: 'app/login',
        component: LoginComponent
    },
    {
        path: 'app/register',
        component: RegisterComponent
    },
    {
        path: '', /*raiz do projeto */
        pathMatch: 'full',
        redirectTo: '/app/login'
    }
];