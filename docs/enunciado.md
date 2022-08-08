# Portal de videos Raro Academy - Raro Tube

Atualmente, todas as aulas gravadas da Raro Academy estão no Zoom. Para os alunos terem acesso a essas aulas, disponibilizamos o link de cada uma em uma planilha. Estes conteúdos, desta forma, permanecem públicos, com acesso disponível a qualquer pessoa com o link de acesso.

Queremos melhorar nosso modelo de distribuição deste conteúdo, criando um portal de acesso aos materiais de vídeo, onde nossos alunos poderão ter acesso ao conteúdo direcionados a eles.

## O portal:

### Página principal (área não logada)

- Deverá existir uma área não logada do portal de vídeos, onde qualquer pessoa pode acessar as gravações dos nossos aulões públicos; 
- Ao clicar em qualquer uma destas aulas, esta pessoa deverá ser redirecionada para a Tela de Visualização do vídeo; 
- Ainda na página principal, no topo da tela, deve existir um botão de login do usuário, que leva à Tela de login. 

### Tela de login

- Nesta tela, os alunos terão a opção de fazer login ou se cadastrar na plataforma, caso seja seu primeiro acesso; 
- No primeiro caso, alunos já cadastrados serão autenticados para terem acesso aos conteúdos referentes a sua turma; 
- Após o login, o usuário deverá ser redirecionado novamente à página principal da aplicação, que passará a exibir os vídeos referentes à turma do usuário. 
- Requisitos acessórios:
  - "Esqueci minha senha"
      - O usuário deverá preencher seu email de cadastro na aplicação. O sistema deverá enviar um email para o usuário, com o código de recuperação de senha. Ao receber este código, o usuário deverá preencher um formulário contendo o código recebido e a nova senha, seguida da confirmação da mesma. O código de recuperação de senha tem uma duração máxima de 2 horas.
  - Cadastro de novos usuários
      - Considerando que a pessoa foi aprovada em uma turma da Raro Academy, esta pessoa deverá receber um e-mail de boas vindas, com instruções de acesso ao Raro Tube, e um código de acesso. Este novo usuário deverá entrar na tela de cadastro e preencher seus dados pessoais (nome, email e senha), seguido do código de acesso recebido por email. Este código credencia este usuário para a turma na qual ele deverá ser inscrito. Usuários sem código de acesso devem ser impedidos de criar uma nova conta.

### Página principal (área logada)

- Após o login, além dos aulões públicos, a página principal do usuário também vai conter a lista de vídeos da sua turma;
- Para facilitar a visualização, a lista de aulas deve estar separada por semanas (ou conteúdo), no formato de playlists;
- A tela também vai exibir uma lista de "Favoritos", que contém os vídeos que foram favoritados pelo usuário. No caso de um primeiro acesso, essa lista vai estar em branco, com as instruções para o usuário favoritar seu primeiro vídeo.

Extra: Esta tela também pode exibir uma lista com o histórico dos vídeos já acessados pelo usuário.

### Tela de visualização dos vídeos

- Quando o usuário clicar em um dos vídeos, seja dos aulões públicos, seja dos vídeos da turma, este deverá ser redirecionado para a tela de visualização;
- Além do player do vídeo, esta tela também deverá exibir uma lista contendo os próximos vídeos sugeridos na sequência;
- Ainda nesta tela, deverá existir uma área de comentários, onde os usuários podem deixar sugestões, reviews, dúvidas e respostas sobre o conteúdo. Todos os comentários devem ser identificados, ou seja, o usuário criador da mensagem é identificado. Todos os usuários logados podem responder e interagir com comentários de outros usuários, com upvote ou downvote;
- O usuário também terá a opção de favoritar o vídeo, que ficará salvo na lista de favoritos a ser exibida na tela principal.

> Importante: A ação de comentar vídeos está autorizada somente para usuários autenticados. Usuários não autenticados podem apenas visualizar os comentários, sem autorização de comentar ou interagir com estes comentários.

## O painel Administrativo

Este painel será de acesso exclusivo a usuários cadastrados como administradores do sistema.

### Cadastro de turmas

CRUD de gestão de turmas. Este registro deverá servir de agregador para as informações das turmas vigentes. Toda a informação privada para determinada turma estará restrita baseada neste registro. Ou seja, os alunos e vídeos pertencentes às turmas serão restritas à estas, a partir dos dados mantidos neste CRUD.
- campos obrigatórios
  - nome
  - descrição
  - Logo do curso

### Cadastro de usuários

Crud de criação de usuários do sistema. Os usuários podem assumir os papeis de: 
  - Usuário comum do sistema: Este usuário terá direito de acesso ao portal de vídeos. Este usuário deverá estar vinculado a uma turma, e pode interagir exclusivamente com o conteúdo de sua turma. Interagir significa:
    - consumir conteúdos de vídeo
    - comentar vídeos
    - dar upvotes e downvotes nos comentários dos vídeos da turma
    - favoritar vídeos
  - Professores: Este usuário deverá ter acesso à(s) turma(s) que ele leciona e fazer a gestão dos videos desta(s) turma(s). Este usuário poderá também ter acesso às funções do portal para as turmas às quais ele pertence, interagindo como um usuário comum.
  - Administrador: Este usuário poderá ter acesso ao painel adminstrativo, com permissão de executar todas as tarefas dos CRUDs de turmas, usuários, e vídeos. Este usuário poderá também consumir todos os conteúdos de videos da plataforma.
  - campos obrigatórios:
    - nome
    - email
    - tipo de usuário (perfil)
    - foto de perfil
    - turma

### Cadastro de vídeos

- Crud de cadastro dos vídeos a serem publicados no portal. 
Os vídeos deverão contar com os uploads dos arquivos de vídeo e o banner. Se associado a uma turma, este vídeo é exclusivo para usuários pertencentes à turma em questão. Caso contrário, este vídeo deverá ser público, disponível para todas as turmas e para os usuários não logados.
- campos obrigatórios:
  - nome
  - descricão
  - arquivo do vídeo
  - imagem de banner do vídeo

### Observações e dicas:
Mock-up/Layout de baixa resolução:
- Link para Diagrama: https://drive.google.com/file/d/1KrtXirxz-xs9KrCsDe-4xUjCjCpG0elT/view 
- O diagrama foi distribuído através do diagrams.net, ferramenta integrada ao Google drive. Para melhor visualização de todo o layout, sugerimos seguir [este tutorial](https://www.diagrams.net/doc/faq/google-drive-diagrams#:~:text=In%20Google%20Drive%2C%20click%20New,in%20the%20diagrams.net%20editor.) para integrar este aplicativo à sua conta.
- os uploads de arquivos (vídeos e imagens) para a API poderão ser armazenados em uma pasta local, da própria API. Não há um requisito de envio para armazenamento em nuvem.
- dica: sugerimos a utilização do [multer](http://expressjs.com/en/resources/middleware/multer.html) para gestão de uploads de arquivos. Este [artigo](https://consolelog.com.br/upload-de-arquivos-imagens-utilizando-multer-express-nodejs/) pode ajudar o entendimento da biblioteca.
- o envio de e-mail deverá ser feito por um cliente externo de envio. Sugerimos a utilização do [sendgrid](https://docs.airplane.dev/), por ser gratuito de de fácil utilização. Para depuração dos envios de e-mail, sugerimos também o uso do [mailtrap.io](https://mailtrap.io/)


# REGRAS

## O que será avaliado?

- Totalidade dos requisitos implementados: 12 pontos

  - O projeto deverá ser iniciado no template disponibilizado pelos instrutores ou a partir de um modelo que o próprio grupo decida que é mais cômodo. O template de exemplo descreve uma arquitetura MVC, implementada em typescript, utilizando o framework http express, para comunicação de rede, TypeORM, como ferramenta de gestão de dados;
  - Precisa contar com recursos de armazenamento em banco de dados. A utilização de APIs terceiras para cumprir funções desta API é um requisito obrigatório;
  - As issues (cada item a ser resolvido do backlog da API) precisam ser entregues para o repositório via Pull Requests/Merge Requests;
  - O andamento do projeto precisa ser demonstrado através do fluxo das issues no board do gitlab;
  - As funcionalidades previstas devem estar corretamente implementadas.

- Qualidade: 10 pontos

  - A qualidade do código e boas práticas de organização e segurança das rotas da API.

- Documentação: 8 pontos

  - Deverá ser detalhada no README, a fim de ajudar a banca avaliadora e possíveis novos devs do projeto, para que consigam sustentar a aplicação de forma autônoma;
  - Deverá conter os comandos de utilização do repositório;
  - PRs, issue e gitflow são componentes importantes na documentação da entrega;
  - Objetivos da API: deve conter um swagger operacional;
  - Documento demonstrando as tabelas e relações entre elas no banco de dados;
  - Recursos terceiros que sua API utiliza.

- Desempenho: 5 pontos

  - Será verificado se há problemas do ponto de vista de desempenho. Ex.: Verificar se há um consumo excessivo da API, em atividades que esta utilização pode ser mais moderada;

- Cobertura de testes: 5 pontos

  - Cobertura com testes de unidade

- Apresentação: 5 pontos

  - Não temos critérios obrigatórios para essa apresentação. O importante é que cada grupo consiga vender a solução criada. Sejam criativos!
  - As regras para a Apresentação/Banca Final são essas:
  - 10 minutos de apresentação por grupo;
  - 15 minutos para comentários e perguntas da banca;
  - Banca composta pelos instrutores + Alguma(s) pessoa(s) de referência técnica da Raro Labs;
  - A nota final para este critério será a média das notas de cada membro da banca;
  - A nota da Apresentação será a mesma para todos os integrantes do grupo;
  - Dicas:
    - Eleger um porta-voz ou distribuir bem o tempo para que todos possam falar
    - Produzir slides e materiais visuais

- TOTAL: 45 PONTOS

ATENÇÃO:

- Os grupos serão pontuados coletivamente: será avaliado se os critérios acima descritos foram contemplados;
- Os integrantes serão avaliados individualmente, de acordo com a contribuição, para o resultado alcançado. Ou seja, as notas do trabalho final serão individuais, ponderando a pontuação geral do grupo de acordo com a contribuição individual de cada integrante.
A única exceção é a nota da Apresentação, que será a mesma para todos os integrantes.

## Sugerimos que:

- O trabalho da equipe seja regido pelo gitflow
- Cada entrega das issues seja feita em um pull request separado
- Os integrantes do grupo se comuniquem, ajudando uns aos outros, e revisando as entregas dos códigos, para garantir a melhor qualidade possível


### E VAMOS AOS GRUPOS......
```
Grupo 1
  Arthur Porto
  Clayton Mendes
  Larissa Leite
  Octávio Rocha
  Paulo André
Grupo 2
  Ana Paula
  Felipe Patrocínio
  Gabriel Balbinot
  João Orlando
  Matheus Pereira
Grupo 3
  André Valentim
  Bruno Guirra
  Igor Oszter
  Jose Wesley
  Tiago Macedo
Grupo 4
  Daniel Santana
  Gabriel Zanco
  Marcus Davi
  Monia Lodo
  William Ricardo
```
