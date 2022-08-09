import { plainToInstance } from "class-transformer";
import { Inject, Service } from "typedi";
import { UserDto } from "../@types/dto/UserDto";
import { EmailRegistered } from "../@types/errors/EmailRegistered";

import { NotFoundError } from "../@types/errors/NotFoundError";
import { IUserRepository } from "../@types/repositories/IUserRepository";
import { IUserService } from "../@types/services/IUserService";
import { hashPassword } from "../helpers/HashPassword";
import { sendEmail } from "../helpers/sendEmail";
import { createUserToken} from "../helpers/Token";
import { User } from "../models/userEntity";
import { signupTemplate } from "../public/emails/signupTemplate";

@Service("UserService")
export class UserService implements IUserService {
  constructor(
    @Inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async create(userDto: UserDto): Promise<User> {
    const hash = hashPassword(Math.random().toString(16).substring(2, 12));
    const registeredUser = await this.userRepository.findByEmail(userDto.email);
    if (registeredUser) {
      throw new EmailRegistered();
    }

    const createToken = createUserToken({
      email: userDto.email,
      role: userDto.role,
    })
    const token = createToken.token;

    const user = await this.userRepository.save(plainToInstance(UserDto, {
      ...userDto,
      password: hash,
    }));

    await sendEmail(userDto.email, {
      subject: "Welcome to RaroTube",
      html: signupTemplate(token)
    });
    const {password, ...userWithoutPassword} = user
    return userWithoutPassword as User
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  async findByLogin(login: string): Promise<User> {
    const user = await this.userRepository.findOne({ email: login });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  async update(id: string, userDTO: UserDto): Promise<UserDto> {
    const foundUser = await this.userRepository.findOne(id);
    if (!foundUser) {
      throw new NotFoundError("User not found");
    }
    return this.userRepository.save(foundUser);
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    if (user.role === "role") {
      throw new NotFoundError("Root user cannot be deleted");
    }
    await this.userRepository.softDelete(id);
  }

  async getUserClassrooms(userId: string) {
    return (await this.userRepository.findOne(userId, { relations: ['userClassrooms'] })).userClassrooms;
  }
}
