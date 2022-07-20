# REGRAS E REQUISITOS - RARO TUBE

## SuperUser

### Requisitos de usuários

- Pode atribuir perfil à usuário
- Pode consultar, cadastrar, editar e deletar usários no sistems
- Pode consultar, cadastrar, editar e deletar turmas
- Pode consultar, cadastrar, editar e deletar videos
- Pode consultar, cadastrar, editar e deletar aluno
- Pode consultar, cadastrar, editar e deletar professores

### Regras de negócio
- Não deve ser póssivel excluir turmas com alunos?
- Não deve ser possivel excluir alunos vinculados à turma

## Admin
### Requisitos de usuários
- Pode consultar, cadastrar e editar turmas
- Pode consultar, cadastrar, editar e alterar videos
- Pode consultar, cadastrar, editar e alterar professores
- Pode consultar, cadastrar, editar e alterar alunos? 

### Regras de negócio
- Não deve ser possível excluir turmas, videos, professores e alunos


## Professor
### Requisitos de usuários
- Pode consultar turmas
- Pode consultar alunos
- Pode consultar, cadastrar e alterar vídeos
- Pode comentar e editar seus comentários em vídeos
- Pode favoritar comentários

### Regras de negócio
- Não deve ser possível excluir turmas, videos, professores e alunos
- Não deve ser possível consultar todos os alunos
- Não deve ser possível consultar todas as turmas

## Aluno
### Requisitos de usuários
- Pode consultar a própria turma
- Pode consultar vídeos
- Pode favoritar videos
- Pode comentar e editar seus comentários em vídeos
- Pode favoritar comentários

### Regras de negócio
- Não deve ser possível consultar outras turmas
- Não deve ser possível consultar professores não relacionados a turma
- Não deve ser possível visualizar videos não relacionados à turma
- Não deve ser possível comentar em vídeos não relacionados à turma
- Não deve ser possível excluir comentários
