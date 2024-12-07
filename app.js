const fs = require('fs');
const path = require('path');
// Pour macOS/L
const dir = 'Downloads';
const myDir = `/Users/kesraouimohamed/${dir}`;
//pour Windows
//const myDir = `C:\\Users\\Utilisateur\${dir}`;

// Dossier des téléchargements (remplacez par le chemin de votre dossier si nécessaire)

// Catégories et extensions associées
const categories = {
    Images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'],
    Documents: ['.pdf', '.docx', '.txt', '.xlsx', '.pptx'],
    Archives: ['.zip', '.rar', '.7z', '.tar', '.gz'],
    Musique: ['.mp3', '.wav', '.flac'],
    Vidéos: ['.mp4', '.mkv', '.avi', '.mov'],
    Autres: [] // Si un fichier ne correspond à aucune catégorie
};

// Fonction pour créer un dossier s'il n'existe pas
const createFolder = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
};

// Fonction pour déplacer un fichier
const moveFile = (filePath, targetFolder) => {
    const fileName = path.basename(filePath);
    const targetPath = path.join(targetFolder, fileName);

    fs.rename(filePath, targetPath, (err) => {
        if (err) console.error(`Erreur lors du déplacement de ${fileName}:`, err);
        else console.log(`Déplacé : ${fileName} → ${targetFolder}`);
    });
};

// Trier les fichiers
const organizeFiles = () => {
    fs.readdir(myDir, (err, files) => {
        if (err) {
            console.error('Erreur lors de la lecture du dossier :', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(myDir, file);

            // Vérifier si c'est un fichier
            if (fs.statSync(filePath).isFile()) {
                const fileExt = path.extname(file).toLowerCase();

                // Trouver la catégorie
                const category = Object.keys(categories).find((key) =>
                    categories[key].includes(fileExt)
                ) || 'Autres';

                const targetFolder = path.join(myDir, category);

                // Créer le dossier cible si nécessaire
                createFolder(targetFolder);

                // Déplacer le fichier
                moveFile(filePath, targetFolder);
            }
        });
    });
};

// Lancer le script
organizeFiles();
