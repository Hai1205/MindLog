import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import { AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_REGION, AWS_SECRET_ACCESS_KEY } from "./constants";

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
});

export const uploadFile = async ({ key, filePath, contentType }) => {
  try {
    const fileStream = fs.createReadStream(filePath);

    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      Body: fileStream,
      ContentType: contentType,
    };

    const command = new PutObjectCommand(uploadParams);
    const res = await s3Client.send(command);
    console.log("Upload success");

    return res;
  } catch (err) {
    console.error("Error:", err);
  }
};

export const deleteFile = async ({ key }) => {
  try {
    const deleteParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
    };

    const command = new DeleteObjectCommand(deleteParams);
    const res = await s3Client.send(command);
    console.log("Delete success");

    return res;
  } catch (err) {
    console.error("Error:", err);
  }
};