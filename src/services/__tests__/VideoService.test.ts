import { faker } from "@faker-js/faker"
import { videosRequestDTO } from "../../@types/dto/VideosDto"
import { NotFoundError } from "../../@types/errors/NotFoundError"
import { Classroom } from "../../models/classroomEntity"
import { User } from "../../models/userEntity"
import { Video } from "../../models/videoEntity"
import { VideoRepository } from "../../repositories/videoRepository"
import { ClassroomsService } from "../ClassroomService"
import { CommentService } from "../CommentService"
import { FileService } from "../FileService"
import { UserService } from "../userService"
import { VideosService } from "../VideoService"

const videoRepository = {} as VideoRepository;
const filesService = {} as FileService;
const userService = {} as UserService;
const classroomService = {} as ClassroomsService;
const commentService = {} as CommentService;
  
const videoService = new VideosService(
  videoRepository,
  filesService,
  userService,
  classroomService,
  commentService
);

// jest.mock("../../repositories/videoRepository", () => ({
//   VideoRepository: jest.fn().mockImplementation(() => ({
//     save: jest.fn(),
//   })),
// }));

const FileMock = [{
  originalname: faker.system.fileName(),
  path: faker.system.filePath(),
  mimetype: faker.system.mimeType(),
  size: Number(faker.random.numeric(7)),
}] as Express.Multer.File[]

const videoMock = {
  files : {
    video: FileMock,
    thumbnail: FileMock,
  },
  body: {
      title : 'string', 
      description : 'string',
      duration :'string',
      teacherId: 'string',
      classroomId: 'string'
  }
} as videosRequestDTO;
  
beforeEach(() => {
  jest.clearAllMocks();
});

describe("upload", () => {
  it("should call videoRepository.save", async () => {
    videoRepository.save = jest.fn().mockResolvedValueOnce({} as Video);
    userService.findOne = jest.fn().mockResolvedValueOnce({} as User);
    filesService.upload = jest.fn().mockResolvedValue({} as File);
    classroomService.findOne = jest.fn().mockResolvedValueOnce({} as Classroom);
    await videoService.upload(videoMock)
    expect(videoRepository.save).toBeCalled();
  });
  it("should throw an NotFoundError if teacher id is incorrect", () => {
    userService.findOne = jest.fn().mockResolvedValueOnce(null);
    expect(videoService.upload(videoMock)).rejects.toThrow(NotFoundError);
  });
});

describe("findAll", () => {
  it("should call videoRepository.find", async () => {
    videoRepository.find = jest.fn().mockResolvedValueOnce([]);
    await videoService.findAll();
    expect(videoRepository.find).toBeCalled();
  })
});

describe("findOne", () => {
  it("should call videoRepository.findOne", async () => {
    videoRepository.findOne = jest.fn().mockResolvedValueOnce({} as Video);
    await videoService.findOne("string");
    expect(videoRepository.findOne).toBeCalled();
  });
  it("should throw an NotFoundError if video is not found", () => {
    videoRepository.findOne = jest.fn().mockResolvedValueOnce(null);
    expect(videoService.findOne("string")).rejects.toThrow(NotFoundError);
  });
});

describe("update", () => {
  it("should call videoRepository.save", async () => {
    videoRepository.findOne = jest.fn().mockResolvedValueOnce({} as Video);
    videoRepository.save = jest.fn().mockResolvedValueOnce({} as Video);
    await videoService.update("string", {} as Video);
    expect(videoRepository.save).toBeCalled();
  });
  it("should throw an NotFoundError if video is not found", () => {
    videoRepository.findOne = jest.fn().mockResolvedValueOnce(null);
    expect(videoService.update("string", {} as Video)).rejects.toThrow(NotFoundError);
  });
  it("should throw an NotFoundError if teacher is not found", () => {
    userService.findOne = jest.fn().mockResolvedValueOnce(null);
    expect(videoService.update("string", {} as Video)).rejects.toThrow(NotFoundError);
  });
  it("should throw an NotFoundError if classroom is not found", () => {
    classroomService.findOne = jest.fn().mockResolvedValueOnce(null);
    expect(videoService.update("string", {} as Video)).rejects.toThrow(NotFoundError);
  });
});

describe("delete", () => {
  it("should call videoRepository.delete", async () => {
    videoRepository.findOne = jest.fn().mockResolvedValueOnce({} as Video);
    videoRepository.softDelete = jest.fn().mockResolvedValueOnce({} as Video);
    await videoService.delete("string");
    expect(videoRepository.softDelete).toBeCalled();
  });
  it("should throw an NotFoundError if video is not found", () => {
    videoRepository.findOne = jest.fn().mockResolvedValueOnce(null);
    expect(videoService.delete("string")).rejects.toThrow(NotFoundError);
  });
});

describe("findComments", () => {
  it("should call commentService.findAll", async () => {
    videoRepository.findOne = jest.fn().mockResolvedValueOnce([{}]);
    await videoService.findComments("string");
    expect(videoRepository.findOne).toBeCalledWith(
      expect.objectContaining({
        where:{
          id: expect.any(String),
        },
        relations: ['comments']
      })
    );
  });
  it("should throw an NotFoundError if video is not found", () => {
    videoRepository.findOne = jest.fn().mockResolvedValueOnce(null);
    expect(videoService.findComments("string")).rejects.toThrow(NotFoundError);
  });
});

describe("sendComment", () => {
  it.todo("should call commentService.create");
  it.todo("should throw an NotFoundError if video is not found");
  it.todo("should throw an NotFoundError if user is not found");
  it.todo("should throw an NotFoundError if classroom is not found");
});