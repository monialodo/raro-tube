import { FileRepository } from "../../repositories/filesRepository";
import { FileService } from "../FileService";
import { faker } from '@faker-js/faker';
import { NotFoundError } from "../../@types/errors/NotFoundError";
import { plainToInstance } from "class-transformer";
import { FileDto } from "../../@types/dto/FileDto";

const fileRepository = new FileRepository()
const fileService = new FileService(fileRepository)

beforeEach(() => {
  jest.resetAllMocks();
});

const fileMock = {
  name: faker.system.fileName(),
  path: faker.system.filePath(),
  sizeBytes: faker.random.numeric(7),
  format: faker.system.fileExt(),
  type: faker.system.mimeType(),
}

describe("Create", () => {
  it("should call fileRepository.save", async () => {
    fileRepository.save = jest.fn().mockResolvedValue(fileMock);
    fileService.upload(fileMock);
    expect(fileRepository.save).toBeCalled()
  })
});

describe("FindOne", () => {
  it("should call findOne", async () => {
    const id = faker.datatype.uuid();
    fileRepository.findOne = jest.fn().mockResolvedValue(fileMock);
    await fileService.download(id);
    expect(fileRepository.findOne).toBeCalledWith(id);
  });

  it("should throw NotFoundError when id are incorrect", () => {
    fileRepository.findOne = jest.fn().mockResolvedValue(null);
    expect(fileService.download('')).rejects.toThrowError(NotFoundError);
  });
}); 

describe("Delete", () => {
  it("should call softDelete", async () => {
    fileRepository.findOne = jest.fn().mockResolvedValue(fileMock);
    fileRepository.softDelete = jest.fn().mockResolvedValue(null);
    await fileService.delete(faker.datatype.uuid());
    expect(fileRepository.softDelete).toBeCalledWith(expect.any(String));
  });

  it("should throw NotFoundError when id are incorrect", () => {
    fileRepository.findOne = jest.fn().mockResolvedValue(null);
    fileRepository.softDelete = jest.fn().mockResolvedValue(null);

    expect(fileService.delete('')).rejects.toThrowError(NotFoundError);
  })
})