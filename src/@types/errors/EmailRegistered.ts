import { UnprocessableEntityError } from "./UnprocessableEntityError";

export class EmailRegistered extends UnprocessableEntityError {
  public name: string;
  constructor() {
    super("User already registered");
    this.name = "EmailRegistered";
  }
}
