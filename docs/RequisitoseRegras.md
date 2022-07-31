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
- Não deve ser póssivel excluir turmas com alunos
- Não deve ser possivel excluir alunos vinculados à turma

## Admin
### Requisitos de usuários
- Pode consultar, cadastrar e editar turmas
- Pode consultar, cadastrar, editar e alterar videos
- Pode consultar, cadastrar, editar e alterar professores
- Pode consultar, cadastrar, editar e alterar alunos
- Pode associar tags a videos


### Regras de negócio
- Não deve ser possível excluir turmas, videos, professores e alunos


## Professor
### Requisitos de usuários
- Pode consultar turmas
- Pode consultar alunos
- Pode consultar, cadastrar e alterar vídeos
- Pode comentar e editar seus comentários em vídeos
- Pode favoritar comentários
- Pode associar tags a videos

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

## Turmas

### Requisitos de Turmas
- Deve ter alunos e professores associados
- Deve ter vídeos associados
- Deve ter tags associadas
- Deve ser classíficadas por tópicos


### Regras de negócio
- Não deve ser possível excluir turmas se tiverem alunos associados
- Não deve ser possível excluir turmas se tiverem professores associados
- Não deve ser possível a alunos e professores alterar alunos de turmas
- Não deve ser possível a alunos acessar conteúdos relacionados a turmas às quais não esteja vinculado

## Videos

### Requistos de vídeos
- Deve ser possível aos alunos favoritar vídeos
- Deve ser possível associar um vídeo à turma
- Deve ser possível listar os vídeos favoritos
- Deve ser possível categorizar e listar videos por tags

### Regras de negócio
- Não deve ser possível à alunos e professores excluir vídeos
- Não deve ser possível à alunos e professores alterar a turma em que um vídeo está relacionado
- Não deve ser possível à alunos alterar as tags dos vídeos 

## Comentários

### Requisitos de comentários
- Deve ser possível à um aluno adicionar comentários
- Deve ser possível a todos votar comentários
- Deve ser possivel editar o seu próprio comentário 

### Regras de negócio
- Não deve ser possível editar comentário que não é da própria autoria
- Não deve ser possível à alunos excluir comentário
