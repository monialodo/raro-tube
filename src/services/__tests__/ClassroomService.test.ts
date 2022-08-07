import { ClassroomRepository } from "../../repositories/classroomRepository";
import { ClassroomsService } from "../ClassroomService";
import { faker } from '@faker-js/faker';
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { plainToInstance } from "class-transformer";
import { ClassroomsDto } from "../../@types/dto/ClassroomsDto";
import { FileDto } from "../../@types/dto/FileDto";

const classroomRepository = new ClassroomRepository()
const classroomService = new ClassroomsService(classroomRepository)

beforeEach(() => {
  jest.resetAllMocks();
});

const classroomMock = {
  name: faker.name.findName(),
  description: faker.lorem.paragraph(),
}

const logoMock = plainToInstance(FileDto, {
  name: faker.system.fileName(),
  path: faker.system.filePath(),
  sizeBytes: faker.random.numeric(7),
  format: faker.system.fileExt(),
  type: faker.system.mimeType(),
})

describe("Create", () => {
  it("should call classroomRepository.save", async () => {
    const { name, description } = classroomMock;
    classroomRepository.save = jest.fn().mockResolvedValue(
      { ...classroomMock, logo: logoMock }
    );
    classroomService.create({ name, description }, logoMock);
    expect(classroomRepository.save).toBeCalled()
  })
});

describe("FindOne", () => {
  it("should call findOne", () => {
    classroomRepository.findOne = jest.fn().mockResolvedValue({...classroomMock, logo: logoMock});
    classroomService.findOne(faker.datatype.uuid());
    expect(classroomRepository.findOne).toBeCalledWith(
      expect.objectContaining({
        where: {
          id: expect.any(String)
        },
        relations: ["logo"] })
    );
  });

  it("should throw NotFoundError when id are incorrect", () => {
    classroomRepository.findOne = jest.fn().mockResolvedValue(null);

    expect(classroomService.findOne('')).rejects.toThrow(NotFoundError);
  });
});

describe("Delete", () => {
  it("should call softDelete", async () => {
    classroomRepository.findOne = jest.fn().mockResolvedValue(
      plainToInstance(ClassroomsDto, { logo: logoMock, ...classroomMock })
    );
    classroomRepository.softDelete = jest.fn().mockResolvedValue(null);
    await classroomService.delete(faker.datatype.uuid());
    expect(classroomRepository.softDelete).toBeCalledWith(
      expect.any(String)
    );
  });

  it("should throw NotFoundError when id are incorrect", () => {
    classroomRepository.findOne = jest.fn().mockResolvedValue(null);
    classroomRepository.softDelete = jest.fn().mockResolvedValue(null);

    expect(classroomService.delete('')).rejects.toThrow(NotFoundError);
  })
})