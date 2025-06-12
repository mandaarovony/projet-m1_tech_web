
# 👟 Boutique Chaussures - Application Fullstack
Une application web complète pour gérer une boutique de chaussures, avec un backend en Node.js/Express et une interface utilisateur en React.
---
## 🚀 Fonctionnalités
- 🔄 CRUD des produits (ajouter, modifier, supprimer, afficher)
- 📷 Upload d’images via Multer
- 📡 API RESTful avec documentation Swagger
- 🖥️ Frontend moderne et responsive en React
---
## 🛠️ Technologies utilisées
- **Backend** : Node.js, Express
- **Base de données** : PostgreSQL avec Sequelize
- **Frontend** : React
- **Documentation** : Swagger UI
---
## ⚙️ Installation
### 🔧 Prérequis
- Node.js (v14 ou supérieur)
- PostgreSQL installé et configuré
- `npm` ou `yarn`
---
### 📦 Installation backend
1. Cloner le dépôt :
```bash
git clone https://github.com/mandaarovony/projet-m1_tech_web.git
cd ecommerce_backend
```
2. Installer les dépendances :
```bash
npm install
```
3. Créer un fichier `.env` avec les informations de connexion PostgreSQL :
```env
DB_HOST=localhost
DB_USER=mon_utilisateur
DB_PASSWORD=mon_mot_de_passe
DB_NAME=ecommerce
PORT=5000
```
4. Lancer le serveur backend :
```bash
npm start
```
---
### 💻 Installation frontend
1. Aller dans le dossier React :
```bash
cd ../raissa-shop
```
2. Installer les dépendances :
```bash
npm install
```
3. Lancer l'application :
```bash
npm run dev
```
---
## 📘 Documentation de l'API
Une fois le serveur backend lancé, accédez à la documentation Swagger ici :
🔗 [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
---
## 🗂 Structure du projet
```
projet-m1_tech_web/
├── ecommerce_backend/     # Backend Express + Sequelize
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── ...
└── raissa-shop/           # Frontend React
    ├── components/
    ├── pages/
    └── ...
```
---
## 🙋‍♀️ Auteurs
- Mandaa Arovony Raissa
- Projet M1 Tech Web 
---
