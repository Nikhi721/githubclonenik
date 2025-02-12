const fs = require("fs").promises;
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3, S3_BUCKET } = require("../config/aws-config");

async function pushRepo() {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitPath = path.join(repoPath, "commits");

    try {
        const commitDirs = await fs.readdir(commitPath);

        for (const commitDir of commitDirs) {
            const commitDirPath = path.join(commitPath, commitDir);
            const files = await fs.readdir(commitDirPath);

            for (const file of files) {
                const filePath = path.join(commitDirPath, file);
                const fileContent = await fs.readFile(filePath);

                const params = {
                    Bucket: S3_BUCKET,
                    Key: `commits/${commitDir}/${file}`,
                    Body: fileContent,
                };

                // Use AWS SDK v3 syntax
                const command = new PutObjectCommand(params);
                await s3.send(command);
            }
        }

        console.log("All commits pushed to S3.");
    } catch (err) {
        console.error("Error pushing to S3:", err);
    }
}

module.exports = { pushRepo };
