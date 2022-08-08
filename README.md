
![Badge](https://img.shields.io/badge/RARO-Raro%20Tube-blue?style=for-the-badge&logo=ghostt) 

<h1 align="center">Raro Tube</h1> 

<h2 align="center">Grupo 200 OK </h2> 

<p align="center">Projeto Final - Turma Node V2 </p>

   * [Sobre](#Sobre)
   * [Features](#features)
   * [Como usar](#como-usar)
      * [Pre Requisitos](#pré-requisitos)
      * [Como Iniciar](#rodando-o-back-end)
   * [Tecnologias](#tecnologias)

### Sobre

Esse projeto é um projeto de desenvolvimento de software que visa atender a demanda de uma plataforma de streaming de vídeos aulas da Raro Academy.

O atual modelo é uma planilha hospedada no Google Drive, modelo que não satisfaz a necessidade de segurança e praticidade.

Esse projeto traz uma proposta inicial de uma plataforma de conteúdo acessível por alunos e professores da Raro Academy e gerenciada por administadores que terão controle total do cadastro e acesso aos vídeos.


### Features

- [x] Rotas com acesso definido por permissões
- [x] Cadastro de Usuários por cargo
- [x] Edicao de usuários
- [x] Upload de vídeos 
- [x] Visualização de vídeos 
- [x] Gerenciamento de vídeos por adminsitradores e professores
- [x] Adição de comentários
- [x] Adição de likes

## Como Usar

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [TypeScript](https://www.typescriptlang.org/), [Node.js](https://nodejs.org/en/), [NPM](https://www.npmjs.com/) e [Docker](https://www.docker.com) 
Além disto é bom ter um editor para trabalhar com o código como o [VSCode](https://code.visualstudio.com/)

### Rodando o Back End (servidor)

```bash
# Clone o repositório
$ git clone <https://gitlab.com/g.zanco12/trabalho-final-grupo-200.git>

# Abra o projeto na sua IDE

# Instale as dependências com o comando npm install

# No terminal execute docker-compose up -d

# Esse comando irá criar um container do servidor e do banco de dados

# O servidor inciará na porta:3000

# Rode as migrations com o comando: npm run typeorm:run
 
# Rode os seeds com o comando: npm run seed:root

# O projeto estará pronto para uso

# O swagger para teste do projeto está disponível em: 

<http://localhost:3000/docs/swagger>

```


### Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [TypeScript](https://www.typescriptlang.org/), linguagem de programação orientada a objetos.
- [Node.js](https://nodejs.org/en/), ambiente de desenvolvimento.
- [NPM](https://www.npmjs.com/), gestor de pacotes para o Node.js.
- [Docker](https://www.docker.com/), ambiente de desenvolvimento para criar containers.
- [Postgres](https://www.postgresql.org/), banco de dados relacional.
- [TypeORM](https://typeorm.io/), aplicação para gestão de banco de dados.
- [Swagger](https://swagger.io/), framework para documentação, gestão de rotas e teste.
- [GitLab](https://gitlab.com/), sistema de controle de versão para o desenvolvimento de software.
- [Postman](https://www.getpostman.com/), ferramenta para testar aplicações web.


