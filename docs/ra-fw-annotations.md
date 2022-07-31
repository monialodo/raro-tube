# TODO
- [ ] Criar uma tabela de Avatares com nome, caminho, tamanho e formato.
  - _Essa tabela, também, poderia armazenar as logos das turmas e/ou as thumbnails dos videos?_
- [ ] Criar uma tabela de Tags com nome, usuárioId, videoId e talvez cor.
- [ ] Criar uma tabela de Histórico com usuárioId, videoId e o momento que foi visto.
- [ ] Usuário pode dar upvote ou downvote em um comentário. Seria uma relação recursiva?
- [ ] Deve ser criado tabelas auxiliares entre:
  - [ ] administrador e Turmas
  - [ ] Alunos e Turmas
  - [ ] Professores e Turmas
  - [ ] Alunos e Videos (favoritos)
*Na modelagem definimos também Alunos e comentários, não?*

# Anotações

- O aluno, para realizar o cadastro, deve possuir um código de acesso que será recebido por email, tal código poderá ser um **JWT** com o id da turma em que o aluno será matriculado.
  
- A API terá por volta de 15 à 20 endpoints.
*acho modesto, to chutando umas 30*

- Seria interessante trabalhar com soft delete, ao envés de hard delete, pois caso uma turma seja deletada por acidente, todos os videos, alunos, professore e todas as outras entidades que se relacionam com essa turma, acabariam sendo removidas junto, o que gera um cenário apocalíptico, onde basta um administrador irritado para acabar com tudo. Uma outra opção seria desvincular todas as entidades de uma turma para assim poder deleta-la permanentemente.
*Por esse motivo criamos o super user (root) que é o unico com poderes de deleção. Além disso na regra de negócio de turmas foi levantado que uma turma não pode ser ser excluida se houver alunos vinculados. Podemos adicionar que também não pode ser excluida se houver vídeos vinculados a ela, mas no caso turmas não seriam excluidas?*

- O usuário root deve ser criado por meio de **seeding**, desde que o sistema começar a rodar, e ele não poderá ser deletado, então ele existirá enquanto a API existir. Outra abordagem seria não ter um usuário root, ou seja, tornar o administrador o maior cargo no sistema, logo, um administrador seria inserido por padrão no sistema e sempre deverá existir, ou seja, deve haver pelo menos um administrador no sistema, e esse administrador poderá criar, editar e deletar outros administradores.
*Já fiz o crud e estou montando o seed do super user*

- O professor, quando entrar no painel administrativo, só poderá acessar a aba de videos, e quando for registrar um video só poderá selecionar um das turmas em que ele leciona, logo devemos ter uma rota **GET** que retornar essas turma, como por exemplo `/teacher/:id/turmas`.

- O usuário ao esquecer senha, faz um request enviando seu email, e a API responde enviando um código para o email enviado pelo usuário, caso ele seja cadastrado, esse código pode ser um **JWT** com o id do usuário. Portanto, o usuário, ao enviar esse token com sua nova senha e a confirmação da mesma, será verificado se ambas as senha enviadas são idênticas, e se forem, a API atualizará a senha do usuário, caso contrário retornará um erro. O token deve ter um tempo de expiração ou deve ser invalidado uma vez já usado.
> **OBS:** Por questões de segurança, quando for feita a requisição de envio do código, deve ser retornado como resposta uma mensagem confirmando o envio do código para email, mesmo que o código não tenha sido enviado e o email não esteja cadastrado no site.


## Requisitos opcionais
- Fazer querys de filtragem nas rotas do painel administrativo de turmas, videos e usuários._

- Adicionar uma identificação da semana em que o video foi gravado, pode ser feito por meio de uma coluna na tabela video ou por meio de uma tag..
*Acho que uma tag ficaria elegante ao inves da coluna, não sei*






