const multer = require("multer");
const path = require("path");

// Définir où les fichiers seront stockés
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));   }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Limite de taille du fichier à 5 Mo
});

module.exports = upload;
