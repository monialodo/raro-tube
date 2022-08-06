# ROUTES

## LEGENDA
- OW: Own
- OC: Own Class

## INDEX
- /v1/auth
- /v1/users
- /v1/classrooms
- /v1/videos
- v1/tags

## AUTH
- [x] POST /signup
  - (ADMIN, STUDENT, TEACHER)
  - must return a token
- [x]  POST /login
  - (ADMIN, STUDENT, TEACHER)
  - must return a token
- [x] POST /forgot
  - (ADMIN, STUDENT, TEACHER)
- [x] POST /logout
  - (ADMIN, STUDENT, TEACHER)
  - logout user
<!-- - [ ] POST /me
  - (ADMIN[OW], STUDENT[OW], TEACHER[OW])
  - must return user data -->
- [x] POST /code
  - (ADMIN)
  - verify if code is valid to change password

## USER
- [ ]  GET /
  - (ADMIN, TEACHER[OC]))
- [ ]  POST /
  - (ADMIN)
- [ ]  GET /:id
  - (ADMIN, STUDENT[OW], TEACHER[OW/OC])
- [ ]  PUT /:id
  - (ADMIN[OW], STUDENT[OW], TEACHER[OW])
- [ ]  DELETE /:id
  - (ADMIN, STUDENT[OW], TEACHER[OW])

## CLASSROOM
- [x]  GET /
  - (ADMIN, TEACHER[OC])
  - get all classrooms
- [x]  POST /
  - (ADMIN)
  - post a new classroom
- [x]  GET /:id
  - (ADMIN, STUDENT[OW], TEACHER[OW/OC])
  - get a classroom
- [ ]  PUT /:id
  - (ADMIN)
  - update a classroom
- [ ]  DELETE /:id
  - (ADMIN)
  - delete a classroom
- [ ]  GET /:id/students
  - (ADMIN, TEACHER[OC])
  - get all students of a classroom
- [ ] POST /:id/teachers
  - (ADMIN, TEACHER[OC], STUDENT[OC])
  - get all teachers of a classroom

## VIDEO
- [x]  GET /
  - (ADMIN, TEACHER[OC], ALUNO[OC])
  - get all videos from classroom
- [x]  POST /
  - (ADMIN, TEACHER[OC])
  - post a video to a classroom
- [x]  GET /:id
  - (ADMIN, STUDENT[OW], TEACHER[OW/OC])
  - get video by id
- [x]  PUT /:id
  - (ADMIN[OW], TEACHER[OW])
  - update video by id
- [ ]  DELETE /:id
  - (ADMIN, TEACHER[OW])
  - delete video from classroom
- [ ]  GET /favorites
  - (ADMIN, TEACHER[OW], STUDENT[OW])
  - get all favorites videos from classroom
- [ ]  PATCH /:id/favorite
  - (ADMIN, TEACHER[OW], STUDENT[OW])
  - favorite a video (switch favorite)
- [ ]  GET /:id/comments
  - (ADMIN, TEACHER[OC], ALUNO[OC])
  - get all comments of a video
- [ ]  POST /:id/comments
  - (ADMIN, TEACHER[OC], ALUNO[OC])
  - post a comment to a video
<!-- - [ ]  GET /:id/comments/:id
  - (ADMIN, TEACHER[OC], ALUNO[OC])
  - get a specific comment from a video -->
- [ ]  PATCH /:videoId/comments/:commentId
  - (ADMIN, TEACHER[OC], ALUNO[OC])
  - react to a comment from a video (downvote, upvote)

## TAG
- [ ]  GET /
  - (ADMIN)
  - get all tags
- [ ]  POST /
  - (ADMIN)
  - post a tag
- [ ]  GET /:id
  - (ADMIN)
  - get tag by id
- [ ]  PUT /:id
  - (ADMIN)
  - update tag by id
- [ ]  DELETE /:id
  - (ADMIN)
  - delete tag by id