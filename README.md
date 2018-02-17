# Desafio do curso de performance Node.js

> Desafio proposto para o curso [performance com Node.js em produção](https://github.com/codeprestige/curso-performancenode) apresentado pela Code Prestige

<!-- TOC -->

- [Desafio do curso de performance Node.js](#desafio-do-curso-de-performance-nodejs)
  - [Motivação](#motivação)
  - [Regras de negócio](#regras-de-negócio)
  - [Estrutura do projeto](#estrutura-do-projeto)
    - [Serviços](#serviços)
    - [API](#api)
      - [Regras da API](#regras-da-api)
    - [Front-end](#front-end)
      - [Regras do front-end](#regras-do-front-end)
    - [Banco de dados](#banco-de-dados)
      - [Regras do banco de dados](#regras-do-banco-de-dados)
  - [Regras gerais do projeto](#regras-gerais-do-projeto)
  - [Entrega do projeto](#entrega-do-projeto)
  - [Dúvidas](#dúvidas)

<!-- /TOC -->

## Motivação

Uma escola veio até você para pedir que desenvolvesse um sistema para agendar reuniões entre pais e professores.

## Regras de negócio

- O sistema terá uma tela de login aonde os pais vão fazer os seus acessos, tanto o login quanto a senha já estão cadastradas no banco de dados da escola
- O sistema terá uma data de abertura. Antes desta data __não é permitido o login dos pais__
- O sistema também terá uma data de fechamento, após a mesma __não é permitido novos agendamentos de reuniões__
- Após o fechamento do sistema, os pais ainda poderão verificar as reuniões que foram marcadas por eles, mas não poderão cancelá-las
- Os pais deverão poder cancelar as reuniões agendadas enquanto o sistema estiver aberto para novos agendamentos
- Todos os dados de cadastro, como as listas de professores e pais de alunos serão dadas pela escola
- Os intervalos entre as reuniões deverão ser de 40 min, pois é o tempo máximo de uma reunião
- Os horários de reuniões deverão ser após as 10h e antes das 17h
- Um professor só pode ser agendado uma vez por dia por cada pai, ou seja, se um pai agendar um horário com um professor, este dia deve sumir da lista _daquele professor_ para _aquele pai_
- Uma vez que o professor seja agendado em um horário, aquele horário não poderá ficar disponível para nenhum outro agendamento por qualquer pai de aluno
- O pai de aluno pode agendar mais de uma reunião por dia __com professores diferentes__
- Um professor só pode atender um pai por horário

## Estrutura do projeto

### Serviços

O projeto foi pensado para ser executado com o mínimo possível de complicações, por isto estamos utilizando o arquivo [docker-compose.yml](./docker-compose.yml) que está devidamente anotado e comentado.

Para iniciar o projeto basta executar

```sh
$ docker-compose up
```

> Se você quiser utilizar o terminal, execute o comando em background com `docker-compose up -d`

Este comando vai subir 3 containers Docker, com a API, o front-end e o banco de dados (com os dados já cadastrados).

- A api estará rodando em `localhost:3000`
- O banco estará em `localhost:3306`, o usuário é `root` não há senha
- O front-end será servido pelo NGINX em `localhost:8080`

> O arquivo compose __pode__ ser alterado para que novas implementações sejam feitas, por exemplo, implementar um cache em Redis utilizando a aplicação.

### API

A api está sendo servida a partir da pasta [api](./api), dentro desta pasta você pode fazer qualquer estrutura que você desejar. Existe um arquivo index básico com um servidor HTTP na porta 3000.

Toda a alteração nesta pasta vai refletir no servidor rodando no docker.

#### Regras da API

- Você pode escolher qualquer arquitetura
- Você pode utilizar quaisquer pacotes ou libs, apenas tomem cuidado para aplicar o que aprendemos
- Todos os detalhes tecnicos estão sobre sua decisão
- Você __não pode__ alterar a porta que a API está rodando, mantenha 3000

### Front-end

O front-end estará pronto e servido em `localhost:8080` a partir de um NGINX que utilizará os arquivos da pasta [client](./client). As mesmas regras se aplicam para o Docker, todo o arquivo alterado aqui será refletido imediatamente no servidor de desenvolvimento que o Docker subiu anteriormente.

O Framework CSS usado é o minimalista [Bulma](http://bulma.io), ele não tem nenhum JS pronto. Tente se ater somente aos componentes dele.

#### Regras do front-end

- Você __não pode__ alterar a estrutura de pastas do front-end
- __Não é permitido__ o uso de quaisquer libs externas em Javascript no front-end (ou seja, sem jQuery, Lodash e qualquer outra coisa, apenas o JS roots)
- Também __não é permitido__ o uso de preprocessadores CSS como Sass, Less e etc
- Você pode criar quantos arquivos JS e CSS forem necessários
- Você __não pode__ criar novos arquivos html
- O stack do front-end __deve obrigatoriamente__ ser JS + CSS + HTML, nada mais
- O layout da aplicação não pode ser alterado, adicionando ou removendo itens (salvo mensagens de erro e balões de notificação).
- Toda a comunicação com o banco ou o back end deve ser feita por meio da API desenvolvida por vocês
- Tentem não colocar lógica de negócio no front-end porque é muito fácil de ser alterada por qualquer um, devolva apenas respostas na API e monte o HTML no front-end
- Não se preocupe com compatibilidade de browsers, mas evite usar coisas _bleeding-edge_, que não estão ainda implementados em todos, mantenha o software rodando para, pelo menos, as versões latest do Firefox e Chrome (esqueça o Edge e o IE)

### Banco de dados

O banco de dados já vai subir com os dados cadastrados, gerados pelo [Faker.js](https://github.com/marak/Faker.js/).

#### Regras do banco de dados

- __Nenhum__ dado pode ser removido, alterado ou inserido nas tabelas `TBL_TEACHERS` e `TBL_PARENTS`, ou seja, estas tabelas são _read-only_
- A única tabela que poderá ser manipulada por vocês e pela aplicação é a `TBL_SCHEDULE`
- A estrutura do banco __não pode ser alterada__, nenhuma tabela pode ser criada nem removida
- As senhas da `TBL_PARENTS` não precisam ser encodadas em MD5 ou qualquer outro esquema de segurança, elas podem ficar em texto puro, pois não é o nosso foco neste desafio

## Regras gerais do projeto

- Não é permitido o uso de nenhum Framework: React, Angular e afins
- O projeto deverá conter um flamegraph gerado pelo programador __apenas da api__, este flamegraph deverá ser versionado junto com a aplicação
- Não versione a pasta `node_modules`
- Não estamos preocupados com segurança e nem com compatibilidade aqui, mas o login deverá ser desenvolvido como sendo para um aaplicação de produção, então se alguma variável de ambiente ou algum valor secreto for utilizado, pode ser versionado sem problemas.
- Não é permitido o uso de serviços externos (como o Auth0) para implementar logins
- Todos os arquivos devem conter os comentários no código sobre o que aquele trecho faz, isto facilita muito a correção

## Entrega do projeto

Primeiramente, você deverá criar um _fork_ deste projeto para o seu próprio usuário, clone-o para seu computador e trabalhe apenas nele, quando estiver pronto para ser entregue, abra uma Pull Request neste repositório com o título: `[Seu nome] - Desafio Node.js`. Na descrição coloque quaisquer observações para execução do projeto ou alguma instrução atípica do mesmo, caso contrário irei iniciar seu projeto com `docker-compose up` e acessarei o front-end para testar.

Explique em poucas palavras na PR como você pensou em desenvolver as regras de negócio e qual foi a arquitetura utilizada, também analise o flamegraph gerado e exprima suas opiniões obtidas desta análise, por exemplo, "Notei que a função X está ocupando mais tempo de CPU" ou "A função Y tem um callstack alto, por motivo XPTO".

## Dúvidas

Quaisquer dúvidas me mandem uma mensagem em uma das minhas redes sociais presentes em https://lsantos.me