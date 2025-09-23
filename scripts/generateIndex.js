import fs from 'fs';
import path from 'path';

function generateIndex(targetDir, outputFileName = 'index.jsx') {
  const resolvedTargetDir = path.resolve(targetDir);
  const indexFile = path.join(resolvedTargetDir, outputFileName);

  const files = fs.readdirSync(resolvedTargetDir).filter(
    (file) =>
      (file.endsWith('.jsx') || file.endsWith('.js')) &&
      file !== outputFileName
  );

  const exportLines = files.map((file) => {
    const name = path.basename(file, path.extname(file));
    const filePath = path.join(resolvedTargetDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('export default')) {
      return `export { default as ${name} } from './${name}';`;
    } else if (
      content.includes(`export function ${name}`)
      ||
      content.includes(`export const ${name}`)
    ) {
      return `export { ${name} } from './${name}';`;
    } else {
      console.warn(
        `Could not determine export type for ${file}. Assuming named export.`
      );
      return `export { ${name} } from './${name}';`;
    }
  });

  const newContent = exportLines.join('\n') + '\n';

  let oldContent = '';
  try {
    oldContent = fs.readFileSync(indexFile, 'utf8');
  } catch (error) {
    // ignore if file doesn't exist
  }

  if (newContent !== oldContent) {
    fs.writeFileSync(indexFile, newContent);
    console.log(
      `✅ ${targetDir}/${outputFileName} generated with:`,
      files.join(', ')
    );
  }
}

export default generateIndex;
