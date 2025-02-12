const fs = require("fs").promises;
const path = require("path");

async function revertRepo(commitID) {
    console.log("Received commitID:", commitID); // Debugging

    if (typeof commitID !== "string" || !commitID.trim()) {
        throw new Error("Invalid commit ID provided.");
    }

    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsPath = path.join(repoPath, "commits");
    const commitDir = path.join(commitsPath, commitID);

    try {
        await fs.access(commitDir); // Ensure commit exists
        const files = await fs.readdir(commitDir);
        const parentDir = path.resolve(repoPath, "..");

        for (const file of files) {
            await fs.copyFile(path.join(commitDir, file), path.join(parentDir, file));
            console.log(`Restored: ${file}`);
        }

        console.log(` Commit ${commitID} reverted successfully!`);
    } catch (err) {
        console.error(" Unable to revert:", err.message);
    }
}

module.exports = { revertRepo };
