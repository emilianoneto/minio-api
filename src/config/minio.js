require("dotenv").config();

const {
  S3Client,
  HeadBucketCommand,
  CreateBucketCommand
} = require("@aws-sdk/client-s3");

const endpoint = process.env.MINIO_ENDPOINT;
const bucket = process.env.MINIO_BUCKET;

const s3 = new S3Client({
  endpoint: endpoint,
  region: process.env.MINIO_REGION || "us-east-1",

  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY
  },

  forcePathStyle: true
});

async function createBucketIfNotExists() {
  try {
    await s3.send(
      new HeadBucketCommand({
        Bucket: bucket
      })
    );

    console.log(`Bucket "${bucket}" já existe.`);
  } catch (error) {
    console.log(`Bucket "${bucket}" não encontrado. Criando...`);

    await s3.send(
      new CreateBucketCommand({
        Bucket: bucket
      })
    );

    console.log(`Bucket "${bucket}" criado com sucesso.`);
  }
}

module.exports = {
  s3,
  bucket,
  createBucketIfNotExists
};