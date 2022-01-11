const fs = require('fs');

function createReadme(words) {
  const readme = fs.readFileSync("./README.md", 'utf-8');
  return readme.replace(/<!-- BEGIN -->[\W\w]*<!-- END -->/, createList(words));
}

function createList(words) {
  return `<!-- BEGIN -->
<!-- 最后更新时间 ${new Date()} -->
${
    words.map((x, i) => `${i+1}. [${x.title}](https://sspai.com/post/${x.id})`)
      .join("\n")
  }
<!-- END -->`;
}

function createArchive(words, date) {
  return `# ${date}\n
共 ${words.length} 条\n
${createList(words)}
`;
}

module.exports = {
    createReadme,
    createList,
    createArchive
}