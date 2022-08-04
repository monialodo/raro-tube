import { UnauthorizedError } from "./UnauthorizedError";

export class UserOrPasswordInvalid extends UnauthorizedError {
  public name: string;
  constructor() {
    super("User or password invalid");
    this.name = "UserOrPasswordInvalid";
  }
}
