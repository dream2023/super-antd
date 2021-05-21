const globby = require('globby');
const fs = require('fs');
const path = require('path');

const replaceDec = async (lib) => {
  const paths = await globby(`./${lib}/**/*.d.ts`);
  for (const filePath of paths) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    if (fileContent.includes("from '@/")) {
      const pathRelative = path.relative(filePath, `./${lib}`);
      const changedFile = fileContent.replace(/from \'\@\//g, `from '${pathRelative.replace('../', './')}/`);
      fs.writeFile(filePath, changedFile, (err) => {
        if (err) console.error(err);
      });
    }
  }
};

replaceDec('es');
replaceDec('lib');
