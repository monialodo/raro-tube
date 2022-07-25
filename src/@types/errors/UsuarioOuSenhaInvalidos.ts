import { UnauthorizedError } from "./UnauthorizedError";

export class UsuarioOuSenhaInvalidos extends UnauthorizedError {
  public name: string;
  constructor() {
    super('Usuário ou Senha Inválidos');
    this.name = 'UsuarioOuSenhaInvalidos';
  }
}
