# Carrinho Digital

- [Ideia principal do projeto](https://www.evernote.com/shard/s625/sh/3e9f87fe-b964-ff2f-1ef7-6907662abb16/1bffb03c74cd8e4af1cf3c550239b769)

### Levantando a web-api

1. Instale o docker e o docker-compose na sua máquina
2. Verifique a instalação do **docker** e **docker-compose**:

- `docker -v`
- `docker-compose -v`

3. Pelo terminal entre na pasta **.docker** e:

- Starte o serviço do mongo: `docker-compose up -d mongodb`
- Verifique se o serviço do mongo esta rodando: `docker ps`, a saída deve exibir o serviço `docker_mongodb_1`
- Starte o serviço da webapi: `docker-compose up -d --build webapi`
- Verifique se o serviço do mongo esta rodando: `docker ps`, a saída deve exibir o serviço `docker_webapi_1`
- Se tudo estiver correto a aplicação estará em pé e pronta para utilização:
  - Se voce estiver em um linux/mac a aplicação estará rodando em: **http://localhost:8001**
  - Se voce estiver em um windows precisará saber o ip da docker-machine: `docker-machine ip` e a aplicação estará rodando na porta **8001** do ip da docker machine.

### Roteamento

O roteamento da api segue o padrão: **{url}/api/v1/{rota}**
