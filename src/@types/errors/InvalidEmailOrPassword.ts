import { UnauthorizedError } from "./UnauthorizedError";

export class InvalidEmailOrPassword extends UnauthorizedError {
  public name: string;
  constructor() {
    super("Invalid email or password");
    this.name = "InvalidEmailOrPassword";
  }
}
