require("dotenv").config();

const express = require("express");

const {
  createBucketIfNotExists
} = require("./config/minio");

const filesRoutes = require("./routes/files.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API de armazenamento de objetos",
    status: "online"
  });
});

app.use(filesRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {

    await createBucketIfNotExists();

    app.listen(PORT, () => {
      console.log(`API rodando em http://localhost:${PORT}`);
    });

  } catch (error) {

    console.error("Erro ao iniciar aplicação:");
    console.error(error);

    process.exit(1);
  }
}

startServer();