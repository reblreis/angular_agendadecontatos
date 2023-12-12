/*
    Modelo de dados da resposta de contatos
*/
export interface ContatoResponse {
    idContato: string;
    nome: string;
    email: string;
    telefone: string;
    dataCriacao: string;
    idUsuario: string;
}