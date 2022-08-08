import { ClassroomRepository } from "../../repositories/classroomRepository";
import { ClassroomsService } from "../ClassroomService";
import { faker } from "@faker-js/faker";
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { plainToInstance } from "class-transformer";
import {
  ClassroomsDto,
  EnrollStudentsDTO,
} from "../../@types/dto/ClassroomsDto";
import { UserClassroomRepository } from "../../repositories/userClassroomRepository";
import { UserRepository } from "../../repositories/userRepository";
import { FileService } from "../FileService";
import { FileRepository } from "../../repositories/filesRepository";
import { UserDto } from "../../@types/dto/UserDto";
import { UserClassroom } from "../../models/userClassroomEntity";
import { ForbiddenError } from "../../@types/errors/ForbiddenError";

const classroomRepository = new ClassroomRepository();
const fileRepository = new FileRepository();
const userClassroomRepository = new UserClassroomRepository();
const userRepository = new UserRepository();
const filesService = new FileService(fileRepository);
const classroomService = new ClassroomsService(
  classroomRepository,
  userClassroomRepository,
  userRepository,
  filesService
);

beforeEach(() => {
  jest.resetAllMocks();
});

const classroomMock = {
  name: faker.name.findName(),
  description: faker.lorem.paragraph(),
};

const logoMock = {
  originalname: faker.system.fileName(),
  path: faker.system.filePath(),
  size: Number(faker.random.numeric(7)),
  mimetype: faker.system.fileExt(),
} as Express.Multer.File;

const userMock = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

describe("Create", () => {
  it("should call classroomRepository.save", async () => {
    classroomRepository.save = jest
      .fn()
      .mockResolvedValue({ ...classroomMock, logo: logoMock });
    filesService.upload = jest.fn().mockResolvedValue(logoMock);
    const classroomDto = plainToInstance(ClassroomsDto, { ...classroomMock });

    await classroomService.create(classroomDto, logoMock);
    expect(classroomRepository.save).toBeCalled();
  });
});

describe("FindOne", () => {
  it("should call findOne", () => {
    classroomRepository.findOne = jest
      .fn()
      .mockResolvedValue({ ...classroomMock, logo: logoMock });
    classroomService.findOne(faker.datatype.uuid());
    expect(classroomRepository.findOne).toBeCalledWith(
      expect.objectContaining({
        where: {
          id: expect.any(String),
        },
        relations: ["logo"],
      })
    );
  });

  it("should throw NotFoundError when id are incorrect", () => {
    classroomRepository.findOne = jest.fn().mockResolvedValue(null);

    expect(classroomService.findOne("")).rejects.toThrowError(NotFoundError);
  });
});

describe("Delete", () => {
  it("should call softDelete", async () => {
    classroomRepository.findOne = jest
      .fn()
      .mockResolvedValue(
        plainToInstance(ClassroomsDto, { logo: logoMock, ...classroomMock })
      );
    classroomRepository.softDelete = jest.fn().mockResolvedValue(null);
    await classroomService.delete(faker.datatype.uuid());
    expect(classroomRepository.softDelete).toBeCalledWith(expect.any(String));
  });

  it("should throw NotFoundError when id are incorrect", () => {
    classroomRepository.findOne = jest.fn().mockResolvedValue(null);
    classroomRepository.softDelete = jest.fn().mockResolvedValue(null);
    expect(classroomService.delete("")).rejects.toThrowError(NotFoundError);
  });
});

describe("ListStudents", () => {
  it("should call find", () => {
    userClassroomRepository.find = jest
      .fn()
      .mockResolvedValue([
        plainToInstance(ClassroomsDto, { logo: logoMock, ...classroomMock }),
      ]);
    classroomService.listStudents(faker.datatype.uuid());
    expect(userClassroomRepository.find).toBeCalledWith(
      expect.objectContaining({
        where: {
          classroomId: expect.any(String),
        },
        relations: ["user"],
      })
    );
  });

  it("should throw NotFoundError when id are incorrect", () => {
    userClassroomRepository.find = jest.fn().mockResolvedValue(null);
    expect(classroomService.listStudents("")).rejects.toThrowError(
      NotFoundError
    );
  });
});

describe("enrollStuddents", () => {
  const enrollStudentsMock = {
    userId: faker.datatype.uuid(),
    classroomId: faker.datatype.uuid(),
  } as EnrollStudentsDTO;

  // const userFindOneSpy = jest.spyOn(userRepository, "findOne").mockResolvedValue(
  //   plainToInstance(UserDto, userMock)
  // );
  // const classroomFindOneSpy = jest.spyOn(classroomRepository, "findOne").mockResolvedValue(
  //   plainToInstance(ClassroomsDto, { logo: logoMock, ...classroomMock })
  // );
  // const userClassroomSaveSpy = jest.spyOn(userClassroomRepository, "save").mockResolvedValue(
  //   plainToInstance(UserClassroom, {
  //     ...enrollStudentsMock,
  //     user: userMock,
  //     classroom: classroomMock,
  //   })
  // );
  // const userClassroomFindOneSpy = jest.spyOn(userClassroomRepository, "findOne").mockResolvedValue(
  //   plainToInstance(UserClassroom, {
  //     ...enrollStudentsMock,
  //     user: userMock,
  //     classroom: classroomMock,
  //   })
  // );

  it("should call save", async () => {
    userRepository.findOne = jest.fn().mockResolvedValue({ ...userMock });
    classroomRepository.findOne = jest.fn().mockResolvedValue({ ...classroomMock });
    userClassroomRepository.findOne = jest.fn().mockResolvedValue(null);
    userClassroomRepository.save = jest.fn().mockResolvedValue({ ...enrollStudentsMock });
    await classroomService.enrollStudents(enrollStudentsMock);
    expect(userClassroomRepository.save).toBeCalled();
  }),

  it("should throw NotFoundError when userId are incorrect", () => {
    userRepository.findOne = jest.fn().mockResolvedValue(null);
    classroomRepository.findOne = jest.fn().mockResolvedValue({ ...classroomMock });
    userClassroomRepository.findOne = jest.fn().mockResolvedValue(null);
    userClassroomRepository.save = jest.fn().mockResolvedValue({ ...enrollStudentsMock });
    expect(classroomService.enrollStudents(enrollStudentsMock)).rejects.toThrowError(NotFoundError);
  });

  it("should throw NotFoundError when classroomId are incorrect", () => {
    userRepository.findOne = jest.fn().mockResolvedValue({ ...userMock });
    classroomRepository.findOne = jest.fn().mockResolvedValue(null);
    userClassroomRepository.findOne = jest.fn().mockResolvedValue(null);
    userClassroomRepository.save = jest.fn().mockResolvedValue({ ...enrollStudentsMock });
    expect(classroomService.enrollStudents(enrollStudentsMock)).rejects.toThrowError(NotFoundError);
  });
  it("should throw ForbiddenError if user is already enrolled in the classroom", () => {
    userRepository.findOne = jest.fn().mockResolvedValue({ ...userMock });
    classroomRepository.findOne = jest.fn().mockResolvedValue({ ...classroomMock });
    userClassroomRepository.findOne = jest.fn().mockResolvedValue({ ...enrollStudentsMock });
    userClassroomRepository.save = jest.fn().mockResolvedValue({ ...enrollStudentsMock });
    expect(classroomService.enrollStudents(enrollStudentsMock)).rejects.toThrowError(ForbiddenError);
  });
});

describe("FindAll", () => {
  it("should call find", () => {
    classroomRepository.find = jest.fn().mockResolvedValue([]);
    classroomService.findAll();
    expect(classroomRepository.find).toBeCalled();
  });
});

describe("Update", () => {
  const classroomDto = plainToInstance(ClassroomsDto, { ...classroomMock });
  it("should call update", async () => {
    classroomRepository.findOne = jest.fn().mockResolvedValue(classroomMock);
    classroomRepository.save = jest.fn().mockResolvedValue(classroomMock);
    await classroomService.update(faker.datatype.uuid(), classroomDto);
    expect(classroomRepository.save).toBeCalled();
  });

  it("should throw NotFoundError when id are incorrect", () => {
    classroomRepository.findOne = jest.fn().mockResolvedValue(null);
    classroomRepository.save = jest.fn().mockResolvedValue(null);
    expect(classroomService.update("", classroomDto)).rejects.toThrowError(
      NotFoundError
    );
  });
});
