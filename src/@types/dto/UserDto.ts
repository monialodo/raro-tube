import { User } from "../../models/userEntity";

export class UserDto extends User {
}

export class UserUpdateDTO extends User {
  constructor(user: User) {
    super();
    this.role = user.role;
  }
} 