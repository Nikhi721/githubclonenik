const fs = require("fs").promises;
const path = require("path");
const { S3Client, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3, S3_BUCKET } = require("../config/aws-config");

async function pullRepo() {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        // Fetch list of objects from S3 bucket
        const listCommand = new ListObjectsV2Command({
            Bucket: S3_BUCKET,
            Prefix: "commits/",
        });

        const data = await s3.send(listCommand);
        const objects = data.Contents || [];

        if (objects.length === 0) {
            console.log("No commits found in S3.");
            return;
        }

        for (const object of objects) {
            const key = object.Key;
            const commitDir = path.join(commitsPath, path.dirname(key).split("/").pop());

            await fs.mkdir(commitDir, { recursive: true });

            const getObjectCommand = new GetObjectCommand({
                Bucket: S3_BUCKET,
                Key: key,
            });

            const response = await s3.send(getObjectCommand);

            // Convert response.Body (stream) into Buffer
            const fileContent = await response.Body.transformToByteArray();

            // Write the file to the local directory
            await fs.writeFile(path.join(repoPath, key), Buffer.from(fileContent));

            console.log(`Pulled: ${key}`);
        }

        console.log("All commits pulled from S3.");
    } catch (err) {
        console.error("Unable to pull:", err);
    }
}

module.exports = { pullRepo };
