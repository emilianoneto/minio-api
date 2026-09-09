const express = require("express");
const multer = require("multer");

const {
  PutObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
  GetObjectCommand
} = require("@aws-sdk/client-s3");

const {
  getSignedUrl
} = require("@aws-sdk/s3-request-presigner");

const {
  s3,
  bucket
} = require("../config/minio");

const router = express.Router();

// Configuração do Multer
const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 50 * 1024 * 1024
  }
});

/**
 * POST /upload
 * Envia um arquivo para o MinIO.
 */
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Nenhum arquivo foi enviado."
      });
    }

    const file = req.file;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentLength: file.size
    });

    await s3.send(command);

    return res.status(201).json({
      message: "Arquivo enviado com sucesso.",
      filename: file.originalname,
      size: file.size,
      contentType: file.mimetype
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao enviar arquivo.",
      details: error.message
    });
  }
});


/**
 * GET /files
 * Lista os arquivos armazenados no bucket.
 */
router.get("/files/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;

    // 1. Verifica se o arquivo existe
    const headCommand = new HeadObjectCommand({
      Bucket: bucket,
      Key: filename
    });

    try {
      await s3.send(headCommand);
    } catch (error) {

      // Arquivo não encontrado
      if (
        error.name === "NotFound" ||
        error.$metadata?.httpStatusCode === 404
      ) {
        return res.status(404).json({
          error: "Arquivo não encontrado.",
          filename: filename
        });
      }

      // Outro erro relacionado ao MinIO
      throw error;
    }

    // 2. Se chegou aqui, o arquivo existe
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucket,
      Key: filename
    });

    // 3. Gera a URL temporária
    const url = await getSignedUrl(
      s3,
      getObjectCommand,
      {
        expiresIn: 300
      }
    );

    // 4. Retorna a URL
    return res.status(200).json({
      message: "Arquivo encontrado.",
      filename: filename,
      expiresIn: 300,
      url: url
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro interno ao consultar o arquivo.",
      details: error.message
    });
  }
});



/**
 * GET /files/:filename
 * Gera uma URL pré-assinada.
 */
router.get("/files/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: filename
    });

    const url = await getSignedUrl(s3, command, {
      expiresIn: 300
    });

    return res.json({
      filename: filename,
      expiresIn: 300,
      url: url
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao gerar URL do arquivo.",
      details: error.message
    });
  }
});

router.get("/files", async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucket
    });

    const response = await s3.send(command);

    const objects = response.Contents || [];

    const files = await Promise.all(
      objects.map(async (object) => {

        const headCommand = new HeadObjectCommand({
          Bucket: bucket,
          Key: object.Key
        });

        const metadata = await s3.send(headCommand);

        return {
          filename: object.Key,
          size: object.Size,
          createdAt: object.LastModified,
          contentType: metadata.ContentType || "application/octet-stream"
        };
      })
    );

    res.json(files);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao listar arquivos.",
      details: error.message
    });
  }
});

module.exports = router;