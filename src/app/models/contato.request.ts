/*
    Modelo de dados da requisição de contatos
*/
export interface ContatoRequest {
    idContato: string | null;
    nome: string;
    email: string;
    telefone: string;
}
