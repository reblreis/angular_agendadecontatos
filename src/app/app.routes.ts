import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CreateContactsComponent } from './components/pages/create-contacts/create-contacts.component';
import { ListContactsComponent } from './components/pages/list-contacts/list-contacts.component';
import { EditContactsComponent } from './components/pages/edit-contacts/edit-contacts.component';
import { AuthGuard } from './guards/auth.guard';

/*
    Mapeamento das rotas do projeto para
    exibir / renderizar componentes
*/
export const routes: Routes = [
    {
        path: 'app/login',
        component: LoginComponent
    },
    {
        path: 'app/register',
        component: RegisterComponent
    },
    {
        path: 'app/dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'app/create-contacts',
        component: CreateContactsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'app/list-contacts',
        component: ListContactsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'app/edit-contacts/:id',
        component: EditContactsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '', /* raiz do projeto */
        pathMatch: 'full',
        redirectTo: '/app/login'
    }
];