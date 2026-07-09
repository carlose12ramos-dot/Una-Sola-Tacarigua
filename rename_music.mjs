import fs from 'fs';
import path from 'path';

const musicDir = path.join('public', 'Musica Tacariguera');
const jsonPath = path.join('src', 'data', 'musicaAuto.json');
let jsonData = fs.readFileSync(jsonPath, 'utf8');

fs.readdirSync(musicDir).forEach(dir => {
    const dirPath = path.join(musicDir, dir);
    if (!fs.statSync(dirPath).isDirectory()) return;

    // Renombrar directorio si tiene caracteres raros
    const newDir = dir.replace(/[^a-zA-Z0-9-]/g, '_');
    if (dir !== newDir) {
        fs.renameSync(dirPath, path.join(musicDir, newDir));
        console.log(`Renamed folder: ${dir} -> ${newDir}`);
        // Reemplazar en el JSON
        jsonData = jsonData.replaceAll(dir, newDir);
    }

    const newDirPath = path.join(musicDir, newDir);
    fs.readdirSync(newDirPath).forEach(file => {
        const newFile = file.replace(/[^a-zA-Z0-9.-]/g, '_');
        if (file !== newFile) {
            fs.renameSync(path.join(newDirPath, file), path.join(newDirPath, newFile));
            console.log(`Renamed file: ${file} -> ${newFile}`);
            // Reemplazar en el JSON
            jsonData = jsonData.replaceAll(file, newFile);
        }
    });
});

fs.writeFileSync(jsonPath, jsonData, 'utf8');
console.log("Renaming complete and JSON updated.");
