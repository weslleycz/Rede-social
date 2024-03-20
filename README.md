# Rede Social

## Visão Geral

Esta é uma rede social criada para conectar jogadores, permitindo que compartilhem experiências, encontrem novos amigos, participem de comunidades de jogos e muito mais.

## Ambiente Front-end

As tecnologias utilizadas no ambiente Front-end incluem:

- ReactJS: Biblioteca JavaScript para construção de interfaces de usuário.
- Material-UI: Biblioteca de componentes React para um design moderno e responsivo.
- SCSS (Sass): Pré-processador CSS para estilização avançada e organização de estilos.
- Axios: Cliente HTTP para realizar requisições à API do servidor.
- Next.js: Framework React para desenvolvimento de aplicações web escaláveis e rápidas.
- Socket.IO Client: Biblioteca para comunicação em tempo real entre cliente e servidor.

## Ambiente Back-end

As tecnologias utilizadas no ambiente Back-end incluem:

- Node.js: Ambiente de execução JavaScript do lado do servidor.
- NestJS: Framework Node.js para construção de aplicações escaláveis e modularizadas.
- WebSocket: Protocolo de comunicação bidirecional em tempo real entre cliente e servidor.
- Swagger: Ferramenta de documentação para APIs RESTful.
- PostgreSQL: Sistema de gerenciamento de banco de dados relacional.
- MariaDB: Banco de dados relacional utilizado para armazenamento de dados.
- Redis: Banco de dados em memória utilizado para cache e armazenamento de sessões.
- JWT (JSON Web Tokens): Método para autenticação e autorização de usuários.
- Nextcloud: Plataforma para armazenamento e compartilhamento de arquivos, utilizada para uploads de mídia na rede social.
- Prisma: ORM para facilitar o acesso e manipulação de dados no banco de dados.

## Ferramentas

Além das tecnologias mencionadas, também utilizamos as seguintes ferramentas:

- Git e GitHub: Controle de versão e colaboração em equipe.
- Nginx: Servidor web utilizado para roteamento e balanceamento de carga.
- Docker Compose: Ferramenta para definir e executar aplicações Docker multi-container.

## Execução

```
 git clone https://github.com/weslleycz/Rede-social.git
 cd Rede-social
 docker compose up -d
```

### Configurando o Nextcloud

Acesse o endereço http://localhost:8080 e crie um usuário no Nextcloud com o nome "nextcloud" e senha "nextcloud", ou utilize as credenciais de sua preferência. Lembre-se de modificar o arquivo .env do backend, caso faça alguma alteração.

### Executando em modo dev

```
// backend
cd backend
yarn
yarn prisma migrate dev
yarn dev
```

```
// frontend
cd frontend
yarn
yarn dev

```
