import { UserRepository } from "../../repositories/userRepository";
import { AuthenticationService } from "../AuthenticationService";
import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";
import { AuthResponseDTO } from "../../@types/dto/AuthenticationDto";
import { User } from "../../models/userEntity";
import { ForbiddenError } from "../../@types/errors/ForbiddenError";
import * as emailSender from "../../helpers/sendEmail";
import { InvalidEmailOrPassword } from "../../@types/errors/InvalidEmailOrPassword";

const userRepository = new UserRepository();
const authService = new AuthenticationService(userRepository);

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Signup", () => {
  const email = faker.internet.email();
  const password = faker.internet.password();
  const signupDto = {
    name: faker.name.findName(),
    email,
    password,
    code: faker.random.alphaNumeric(10),
  };


  it("should returns AuthResponseDTO", async () => {
    const { code, ...userData } = signupDto;

    const user = plainToInstance(User, {
      avatar: null,
      password,
      role: "student",
      ...userData,
    });

    userRepository.findByEmail = jest.fn().mockResolvedValue(user);
    userRepository.save = jest.fn().mockResolvedValue(user);

    const signup = await authService.signup(signupDto);

    expect(userRepository.findByEmail).toBeCalledWith(email);
    expect(signup).toMatchObject<AuthResponseDTO>({
      user,
      token: expect.any(String),
    });
  });

  it("should throws ForbiddenError when there's no code", async () => {
    const { code, ...userData } = signupDto;

    userRepository.findByEmail = jest.fn().mockResolvedValue(null);
    userRepository.save = jest.fn().mockResolvedValue(null);

    await expect(
      authService.signup({ code: undefined, ...userData })
    ).rejects.toThrow(ForbiddenError);
  });

  it("should throws ForbiddenError when there's no user", async () => {
    const { code, ...userData } = signupDto;
    userRepository.findByEmail = jest.fn().mockResolvedValue(null);
    userRepository.save = jest.fn().mockResolvedValue(null);

    await expect(authService.signup({ code, ...userData })).rejects.toThrow(ForbiddenError);
  });
});

describe("Login", () => {
  const email = faker.internet.email();
  const password = faker.internet.password();
  const loginDto = {
    email,
    password,
  };

  it("should returns AuthReturnDto", async () => {
    const user = plainToInstance(User, {
      avatar: null,
      password,
      role: "student",
      name: faker.name.findName(),
      email,
    });

    userRepository.findByEmailAndPassword = jest.fn().mockResolvedValue(user);

    const login = await authService.login(loginDto);

    expect(userRepository.findByEmailAndPassword).toBeCalledWith({
      email,
      password,
    });
    expect(login).toMatchObject<AuthResponseDTO>({
      user,
      token: expect.any(String),
    });
  });

  it("should throws InvalidEmailOrPassword when email or password not match in the database", async () => {
    userRepository.findByEmailAndPassword = jest.fn().mockResolvedValue(null);

    await expect(authService.login(loginDto)).rejects.toThrow(InvalidEmailOrPassword);
  });
});

describe("Forgot", () => {
  const email = faker.internet.email();
  const user = plainToInstance(User, {
    name: faker.name.findName(),
    email,
    password: faker.internet.password(),
    role: "student",
  });

  const options = {
    subject: "Reset Password",
    text: `Here is your code to reset your password: ${faker.random.alphaNumeric(
      10
    )}`,
  };

  const emailSpy = jest.spyOn(emailSender, "sendEmail").mockResolvedValue();

  it("should call sendEmail with email and options", async () => {
    userRepository.findByEmail = jest.fn().mockResolvedValue(user);
    await authService.forgot(email);
    expect(emailSpy).toBeCalledWith(
      email,
      expect.objectContaining({
        subject: expect.any(String),
        text: expect.any(String),
      })
    );
  });

  it("should not call sendEmail when there's no user", async () => {
    userRepository.findByEmail = jest.fn();
    authService.forgot(email);
    expect(emailSpy).not.toBeCalled();
  });
});

describe("Code", () => {
  const password = faker.internet.password();
  const user = plainToInstance(User, {
    avatar: null,
    password,
    role: "student",
    name: faker.name.findName(),
    email: faker.internet.email(),
  });
  userRepository.save = jest.fn().mockResolvedValue(user);
  userRepository.findOne = jest.fn().mockResolvedValue(user);

  it("should call userRepository.save", async () => {
    const code = faker.random.alphaNumeric(10);
    await authService.resetPassword({ password, token: code });
    expect(userRepository.save).toBeCalled();
  });

  it("should throw ForbiddenError", () => {
    const code = undefined;
    expect(authService.resetPassword({ password, token:code })).rejects.toThrow(ForbiddenError);
  });
});
