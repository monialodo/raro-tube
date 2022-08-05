# ROUTES

## LABELS
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
- [x] POST /code
  - (ADMIN, STUDENT, TEACHER)
  - verify if code is valid to change password
<!-- - [ ] POST /logout
  - (ADMIN, STUDENT, TEACHER)
  - logout user -->
<!-- - [ ] POST /me
  - (ADMIN[OW], STUDENT[OW], TEACHER[OW])
  - must return user data -->

## USER
- [ ]  GET /
  - (ADMIN))
- [ ]  POST /
  - (ADMIN)
- [ ]  GET /:id
  - (ADMIN)
- [ ]  PUT /:id
  - (ADMIN, STUDENT[OW], TEACHER[OW])
- [ ]  DELETE /:id
  - (ADMIN)

## CLASSROOM
- [ ]  GET /
  - (ADMIN, TEACHER[OC])
  - get all classrooms
- [ ]  POST /
  - (ADMIN)
  - post a new classroom
- [ ]  GET /:id
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
- [ ] GET /:id/teachers
  - (ADMIN, TEACHER[OC], STUDENT[OC])
  - get all teachers of a classroom

## VIDEO
- [ ]  GET /
  - (ADMIN, TEACHER[OC], ALUNO[OC])
  - get all videos from classroom
- [ ]  POST /
  - (ADMIN, TEACHER[OC])
  - post a video to a classroom
- [ ]  GET /:id
  - (ADMIN, STUDENT[OC], TEACHER[OC])
  - get video by id
- [ ]  PUT /:id
  - (ADMIN, TEACHER[OC])
  - update video by id
- [ ]  DELETE /:id
  - (ADMIN, TEACHER[OC])
  - delete video from classroom
- [ ]  PATCH /:id/favorite
  - (ADMIN, TEACHER[OW], STUDENT[OW])
  - favorite a video (switch favorite)
- [ ]  GET /:id/favorite
  - (ADMIN, TEACHER[OW], STUDENT[OW])
  - get favorite videos from classroom
- [ ]  GET /:id/comments
  - (ADMIN, TEACHER[OC], ALUNO[OC])
  - get all comments of a video
- [ ]  POST /:id/comments
  - (ADMIN, TEACHER[OC], ALUNO[OC])
  - post a comment to a video
<!-- - [ ]  GET /:id/comments/:id
  - (ADMIN, TEACHER[OC], ALUNO[OC])
  - get a specific comment from a video -->
- [ ]  PATCH /:id/comments/:id
  - (ADMIN, TEACHER[OC], ALUNO[OC])
  - react to a comment from a video (downvote, upvote)

## TAG
- [ ]  GET /
  - (ADMIN, TEACHER[OC])
  - get all tags
- [ ]  POST /
  - (ADMIN)
  - post a tag
- [ ]  GET /:id
  - (ADMIN, TEACHER[OC])
  - get tag by id
- [ ]  PUT /:id
  - (ADMIN)
  - update tag by id
- [ ]  DELETE /:id
  - (ADMIN)
  - delete tag by id