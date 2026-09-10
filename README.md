# MinIO API

 API de armazenamento de objetos desenvolvida em **Node.js**, integrada ao **MinIO** por meio de uma API compatível com Amazon S3.

 Projeto desenvolvido para a disciplina de **Análise e Desenvolvimento de Sistemas**.

 ## Tecnologias

 - Node.js
- Express
- MinIO
- Docker
- Docker Compose
- AWS SDK for JavaScript
- Multer
- REST Client

 ## Requisitos

 Antes de iniciar, certifique-se de ter instalado:

 - Node.js
- npm
- Docker
- Docker Compose
- Visual Studio Code
- Extensão REST Client para o Visual Studio Code

 ## 1\. Clonar o projeto

 Clone o repositório:

```
git clone https://github.com/emilianoneto/minio-api.git
```

 Acesse a pasta do projeto:

```
cd minio-api
```

 ## 2\. Configuração do ambiente

 O projeto possui um arquivo `.env-example` com as variáveis necessárias para configurar a aplicação.

 Copie o arquivo para criar o `.env`:

```
cp .env-example .env
```

 Abra o arquivo `.env`:

```
nano .env
```

 Configure as variáveis:

```
PORT=3000

MINIO_ENDPOINT=http://localhost:9000
MINIO_ACCESS_KEY=seu_usuario
MINIO_SECRET_KEY=sua_senha

MINIO_BUCKET=arquivos
MINIO_REGION=us-east-1
```

 ### Variáveis de ambiente

 | Variável | Descrição |
| --- | --- |
| `PORT` | Porta utilizada pela API |
| `MINIO_ENDPOINT` | Endereço do servidor MinIO |
| `MINIO_ACCESS_KEY` | Usuário/chave de acesso do MinIO |
| `MINIO_SECRET_KEY` | Senha/chave secreta do MinIO |
| `MINIO_BUCKET` | Nome do bucket utilizado pela aplicação |
| `MINIO_REGION` | Região utilizada pelo MinIO |

 > **Importante:** substitua `seu_usuario` e `sua_senha` pelas credenciais configuradas no seu ambiente MinIO.

 O arquivo `.env` contém informações de configuração e credenciais. **Não compartilhe ou envie esse arquivo para o GitHub.**
 Caso o arquivo .env não seja configurado, o acesso padrão será:

```
Usuário: minioadmin
Senha: minioadmin
```

 ## 3\. Iniciar o MinIO

 Com o Docker em execução, inicie o MinIO utilizando o Docker Compose:

```
docker compose up -d
```

 Verifique se o container está em execução:

```
docker compose ps
```

 O MinIO estará disponível em:

```
http://localhost:9000
```

 O painel de gerenciamento do MinIO estará disponível em:

```
http://localhost:9001
```

 As credenciais utilizadas para acessar o painel são as mesmas configuradas no `docker-compose.yml`.

 ## 4\. Instalar as dependências

 Na pasta do projeto, execute:

```
npm install
```

 Esse comando instala todas as dependências necessárias para executar a API.

 ## 5\. Executar a aplicação

 Após configurar o `.env`, iniciar o MinIO e instalar as dependências, execute:

```
npm start
```

 A API será iniciada na porta configurada no `.env`.

 Com a configuração padrão, a API estará disponível em:

```
http://localhost:3000
```

 ### Criação automática do bucket

 Não é necessário criar o bucket manualmente.

 Ao executar:

```
npm start
```

 a aplicação verifica se o bucket definido em:

```
MINIO_BUCKET=arquivos
```

 já existe no MinIO.

 Caso o bucket não exista, ele será **criado automaticamente pela aplicação durante o processo de inicialização**.

 ## 6\. Testando a API

 Para realizar as solicitações à API, foi utilizada a extensão **REST Client** do Visual Studio Code.

 O projeto possui uma pasta:

```
tests/
```

 Nessa pasta estão disponíveis arquivos de teste com as requisições da API.

 ### Utilizando o REST Client

 1. Abra o projeto no Visual Studio Code.
2. Instale a extensão **REST Client**, caso ainda não esteja instalada.
3. Acesse a pasta `tests`.
4. Abra o arquivo de requisições.
5. Certifique-se de que o MinIO e a API estejam em execução.
6. Clique em **Send Request** acima de cada requisição para executá-la.

 As solicitações disponíveis na pasta de testes permitem verificar o funcionamento da API e suas operações de armazenamento de arquivos.

 ## Estrutura do projeto

```
minio-api/
├── src/
│   ├── config/
│   │   └── minio.js
│   ├── routes/
│   │   └── files.routes.js
│   └── server.js
│
├── tests/
│   ├── api.http
│   └── teste.txt
│
├── .env-example
├── .gitignore
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

 ## Parando o MinIO

 Para parar o container do MinIO:

```
docker compose down
```

 Para iniciar novamente:

```
docker compose up -d
```

 ## Fluxo rápido

 Para configurar o projeto do zero:

```
git clone https://github.com/emilianoneto/minio-api.git
cd minio-api
cp .env-example .env
docker compose up -d
npm install
npm start
```

 Depois, abra o Visual Studio Code, acesse a pasta `tests` e utilize o **REST Client** para realizar as solicitações à API.
