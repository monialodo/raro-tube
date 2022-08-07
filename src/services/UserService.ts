import { plainToInstance } from "class-transformer";
import { Inject, Service } from "typedi";
import { UserDto } from "../@types/dto/UserDto";
import { EmailRegistered } from "../@types/errors/EmailRegistered";

import { NotFoundError } from "../@types/errors/NotFoundError";
import { IUserRepository } from "../@types/repositories/IUserRepository";
import { IUserService } from "../@types/services/IUserService";
import { hashPassword } from "../helpers/HashPassword";
import { sendEmail } from "../helpers/sendEmail";
import { User } from "../models/userEntity";

@Service("UserService")
export class UserService implements IUserService {
  constructor(
    @Inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async create(userDto: UserDto): Promise<User> {
    const hash = hashPassword(Math.random().toString(16).substring(2, 12));
    const authCode = Math.random().toString(16).substring(2, 8)
    const registeredUser = await this.userRepository.findByEmail(userDto.email);

    if (registeredUser) {
      throw new EmailRegistered();
    }

    const newUser = await this.userRepository.save(plainToInstance(UserDto, {
      ...userDto,
      password: hash,
      authCode: authCode,
    }));

    await sendEmail(userDto.email, {
      subject: "Welcome to Monia",
      text: `Welcome to ${userDto.name}!
      Your authentication code is: ${authCode}`
    });
    return;
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
    await this.userRepository.softDelete(id);
  }
}
