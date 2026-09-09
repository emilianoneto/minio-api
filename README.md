API de Armazenamento de Objetos com Node.js e MinIO

 Projeto desenvolvido para a disciplina de Análise e Desenvolvimento de Sistemas.

 A aplicação implementa uma API REST em Node.js integrada ao MinIO, utilizando a API compatível com Amazon S3.

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

 - Node.js
- npm
- Docker
- Docker Compose
- VS Code
- Extensão REST Client

 ## Instalação

 Clone o projeto:

```
git clone https://github.com/emilianoneto/minio-api
```

 Acesse a pasta do projeto:

```
cd minio-api
```

 Instale as dependências:

```
npm install
```

 ## Configuração do MinIO

 O projeto utiliza o MinIO para armazenar os arquivos enviados pela API.

 ### 1\. Inicie o MinIO

 Na pasta do projeto, execute:

```
docker compose up -d
```

 Verifique se os containers estão funcionando:

```
docker compose ps
```

 O MinIO ficará disponível em:

```
http://localhost:9000
```

 O painel de administração ficará disponível em:

```
http://localhost:9001
```

 ### 2\. Acesse o painel do MinIO

 Abra no navegador:

```
http://localhost:9001
```

 Utilize as credenciais configuradas no arquivo `docker-compose.yml`.

 ### 3\. Crie o bucket

 No painel do MinIO:

 1. Acesse **Buckets**.
2. Clique em **Create Bucket**.
3. Informe o nome:

```
arquivos
```

 4. Clique em **Create Bucket**.

 Esse é o bucket utilizado pela API.

 ## Configuração da API

 Na raiz do projeto, crie um arquivo chamado `.env`:

```
cp .env.example .env
```

 O arquivo deverá conter:

```
PORT=3000

MINIO_ENDPOINT=http://localhost:9000
MINIO_ACCESS_KEY=seu_usuario
MINIO_SECRET_KEY=sua_senha

MINIO_BUCKET=arquivos
MINIO_REGION=us-east-1
```

 Altere `MINIO_ACCESS_KEY` e `MINIO_SECRET_KEY` para as credenciais utilizadas pelo seu MinIO.

 O arquivo `.env` não deve ser enviado para o GitHub.

 ## Executando a API

 Depois de configurar o MinIO e o arquivo `.env`, execute:

```
npm start
```

 A API estará disponível em:

```
http://localhost:3000
```

 ## Testando a API

 Os testes das requisições podem ser realizados utilizando a extensão **REST Client** do VS Code.

 Abra o arquivo:

```
tests/api.http
```

 Execute as requisições diretamente pelo VS Code.

 ## Parando o MinIO

 Para parar os containers:

```
docker compose down
```

 Para iniciar novamente:

```
docker compose up -d
```
