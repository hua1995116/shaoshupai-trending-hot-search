const axios = require('axios');
const dayjs = require('dayjs');
const path = require("path");
const fs = require('fs');
const { createReadme, createArchive } = require("./utils");

(async () => {
    try {
        const result = await axios.get("https://sspai.com/api/v1/article/tag/page/get?limit=10&offset=0&created_at=1641703407&tag=%E7%83%AD%E9%97%A8%E6%96%87%E7%AB%A0&released=false");
        const data = result.data.data;

        const yyyyMMdd = dayjs().format("YYYY-MM-DD");
        const fullPath = path.join("raw", `${yyyyMMdd}.json`);
        
        // 保存原始数据
        fs.writeFileSync(fullPath, JSON.stringify(data));

        // 更新 README.md
        const readme = createReadme(data);
        fs.writeFileSync('./README.md', readme);

        // 更新 archives
        const archiveText = createArchive(data, yyyyMMdd);
        const archivePath = path.join("archives", `${yyyyMMdd}.md`);
        fs.writeFileSync(archivePath, archiveText);

    } catch (e) {
        console.log(e);
    }
})();

