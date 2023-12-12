/*
    Modelo de dados da requisição de autenticação
    de usuários da API (dados enviados)
*/
export interface AutenticarRequest {
    email: string;
    senha: string;
}