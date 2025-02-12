const { S3Client } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const s3 = new S3Client({
    region: process.env.AWS_REGION || "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const S3_BUCKET = "nikhbuckets";

module.exports = { s3, S3_BUCKET };
