/*
    Modelo de dados para a resposta do serviço
    de autenticação de usuários na API
*/
export interface AutenticarResponse {
    idUsuario: string;
    nome: string;
    email: string;
    accessToken: string;
    createdAt: string;
    expiration: string;
}  