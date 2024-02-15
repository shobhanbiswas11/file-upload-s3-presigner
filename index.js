var express = require("express");
var bodyParser = require("body-parser");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// AKIAQG2S2BQZKWAPC5CC
// wVgkdvP15HmamKZ1M9ZcstgIvM0BUf5muGhU13qM

var app = express();
app.use(bodyParser.json());

app.post("/file-upload", async (req, res) => {
  const { fileName } = req.body;

  // create pre-signed-url
  const client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: "AKIAQG2S2BQZKWAPC5CC",
      secretAccessKey: "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",
    },
  });

  const command = new PutObjectCommand({
    Bucket: "yotube-file-upload-test",
    Key: fileName,
  });

  const url = await getSignedUrl(client, command, {
    expiresIn: 10 * 60,
  });

  return res.json({
    url,
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
