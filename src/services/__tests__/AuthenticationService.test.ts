import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";
import { AuthResponseDTO } from "../../@types/dto/AuthenticationDto";
import { ForbiddenError } from "../../@types/errors/ForbiddenError";
import { InvalidEmailOrPassword } from "../../@types/errors/InvalidEmailOrPassword";
import * as emailSender from "../../helpers/sendEmail";
import * as tokenGenerator from "../../helpers/Token";
import { User } from "../../models/userEntity";
import { UserRepository } from "../../repositories/userRepository";
import { AuthenticationService } from "../AuthenticationService";

const sign = require('jwt-encode');

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
    token: faker.random.alphaNumeric(10),
  };


  it("should returns AuthResponseDTO", async () => {

    const { token, ...userData } = signupDto;

    const user = plainToInstance(User, {
      avatar: null,
      password,
      role: "student",
      ...userData,
    });

    userRepository.findByEmail = jest.fn().mockResolvedValue(user);
    userRepository.save = jest.fn().mockResolvedValue(user);

    const secret = password;

    const data = {
      id: "91a38689-9894-4ce4-9249-7cb051edde34",
      role: 'student',
    };


    const jwt = sign(data, secret);

    const tokenSpy = jest.spyOn(tokenGenerator, 'generatePassToken').mockReturnValue({ token: jwt });

    const signup = await authService.signup(signupDto);

    expect(userRepository.findByEmail).toBeCalledWith(email);
    expect(signup).toMatchObject({
      user: user,
      token: jwt,

    });
  });

  it("should throws ForbiddenError when there's no code", async () => {
    const { token, ...userData } = signupDto;

    userRepository.findByEmail = jest.fn().mockResolvedValue(null);
    userRepository.save = jest.fn().mockResolvedValue(null);

    await expect(
      authService.signup({ token: undefined, ...userData })
    ).rejects.toThrow(ForbiddenError);
  });

  it("should throws ForbiddenError when there's no user", async () => {
    const { email, ...userData } = signupDto;
    userRepository.findByEmail = jest.fn().mockResolvedValue(null);
    userRepository.save = jest.fn().mockResolvedValue(null);

    await expect(authService.signup({ email: undefined, ...userData })).rejects.toThrow(ForbiddenError);
  });
});

describe("Login", () => {
  const email = faker.internet.email();
  const password = faker.internet.password();
  const loginDto = {
    email,
    password,
  };

  it("should returns AuthResponseDTO", async () => {
    const user = plainToInstance(User, {
      avatar: null,
      password,
      role: "student",
      name: faker.name.findName(),
      email,
    });
    const loginData = {
      email,
      password,
    };

    const secret = password;
    const data = {
      email: email,
      role: 'student',
    };

    const jwt = sign(data, secret);
    const tokenSpy = jest.spyOn(tokenGenerator, 'generateToken').mockReturnValue({ token: jwt });

    userRepository.findByEmailAndPassword = jest.fn().mockResolvedValue(loginData);

    const login = await authService.login(loginDto);
    expect(login).toMatchObject<AuthResponseDTO>({
      user,
      token: jwt,
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
    const secret = user.password;

    const data = {
      email: user.email,
      id: user.id,
    };
    const jwt = sign(data, secret);

    const tokenSpy = jest.spyOn(tokenGenerator, 'generatePassToken').mockReturnValue({ token: jwt });

    userRepository.save = jest.fn().mockResolvedValue(user);

    await authService.forgot(email);

    expect(emailSpy).toBeCalledWith(user.email,
      expect.objectContaining({
        subject: expect.any(String),
        text: expect.any(String),
      })
    );

  });

  it("should not call sendEmail when there's no user", async () => {

    userRepository.findByEmail = jest.fn();
    await expect(authService.forgot(email)).rejects.toThrow(ForbiddenError)
    expect(emailSpy).not.toBeCalled();
  });
});

describe("ResetPassword", () => {
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

    const data = {
      email: user.email,
      id: user.id,
    };
    const jwt = sign(data, password);

    const tokenSpy = jest.spyOn(tokenGenerator, 'generatePassToken').mockReturnValue({ token: jwt });

    userRepository.findOne = jest.fn().mockResolvedValue(user.id);

    await authService.resetPassword({ password, token: jwt });
    expect(userRepository.save).toBeCalled();
  });

  it("should throw ForbiddenError", () => {
    const code = undefined;
    expect(authService.resetPassword({ password, token: code })).rejects.toThrow(ForbiddenError);
  });
});
