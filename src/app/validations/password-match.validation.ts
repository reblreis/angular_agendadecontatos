import { AbstractControl } from '@angular/forms';

/*
    Classe para validação customizada de
    comparação de senhas
*/
export class PasswordMatchValidation {

    /*
        Método para realização a validação do match de senhas
    */
  static matchPassword(abstractControl: AbstractControl) {

    //capturar o valor do campo 'senha' do formulário
    let senha = abstractControl.get('senha')?.value;

    //capturar o valor do campo 'senhaConfirmacao' do formulário
    let senhaConfirmacao = abstractControl.get('senhaConfirmacao')?.value;

    //verificando se os campos estão com valor diferente
    if (senhaConfirmacao.length > 0 && senhaConfirmacao != senha) {

      //gerando um erro de validação
      abstractControl.get('senhaConfirmacao')?.setErrors({
        //definindo o nome do erro
        matchPassword: true,
      });
    }

    return null;
  }
}