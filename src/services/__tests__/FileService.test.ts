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

const fileMock = plainToInstance(FileDto, {
  name: faker.system.fileName(),
  path: faker.system.filePath(),
  sizeBytes: faker.random.numeric(7),
  format: faker.system.fileExt(),
  type: faker.system.mimeType(),
})

describe("Upload", () => {
  it("should call fileRepository.save", async () => {
    fileRepository.save = jest.fn().mockResolvedValue(fileMock);
    await fileService.upload(fileMock);
    expect(fileRepository.save).toBeCalled()
  })
});

describe("Download", () => {
  it("should call findOne", async () => {
    const id = faker.datatype.uuid();
    fileRepository.findOne = jest.fn().mockResolvedValue(fileMock);
    await fileService.download(id);
    expect(fileRepository.findOne).toBeCalledWith(id);
  });

  it("should throw NotFoundError when id is incorrect", () => {
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

  it("should throw NotFoundError when id is incorrect", () => {
    fileRepository.findOne = jest.fn().mockResolvedValue(null);
    fileRepository.softDelete = jest.fn().mockResolvedValue(null);

    expect(fileService.delete('')).rejects.toThrowError(NotFoundError);
  })
})

describe("FindAll", () => {
  it("should call find", () => {
    fileRepository.find = jest.fn().mockResolvedValue([]);
    fileService.findAll();
    expect(fileRepository.find).toBeCalled();
  });
})

describe("Update", () => {
  it("should call update", async () => {
    fileRepository.findOne = jest.fn().mockResolvedValue(fileMock);
    fileRepository.save = jest.fn().mockResolvedValue(fileMock);
    await fileService.update(faker.datatype.uuid(), fileMock);
    expect(fileRepository.save).toBeCalled();
  });

  it("should throw NotFoundError when id is incorrect", () => {
    fileRepository.findOne = jest.fn().mockResolvedValue(null);
    fileRepository.save = jest.fn().mockResolvedValue(null);
    expect(fileService.update('', fileMock)).rejects.toThrowError(NotFoundError);
  })
})
