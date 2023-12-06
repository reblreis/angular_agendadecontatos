/*
    Modelo de dados para a requisição 
    de criação de conta de usuário
*/
export interface CriarContaRequest {
    nome: string;
    email: string;
    senha: string;
}