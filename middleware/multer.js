// const multer = require('multer');
// const path = require('path');


// // Spécifiez le répertoire permanent où les fichiers téléchargés seront stockés
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, 'uploads'));
//   },
//   filename: function (req, file, cb) {
//     // Générez un nom de fichier unique (vous pouvez utiliser un package comme `uuid` pour cela)
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const fileExtension = path.extname(file.originalname);
//     cb(null, uniqueSuffix + fileExtension);
//   },
// });

// export const upload = multer({ storage: storage });
// // pages/api/createUser.js

// import multer from 'multer';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
// import path from 'path';

// const prisma = new PrismaClient();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(process.cwd(), 'uploads'));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const fileExtension = path.extname(file.originalname);
//     cb(null, uniqueSuffix + fileExtension);
//   },
// });

// const upload = multer({ storage: storage });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Méthode non autorisée' });
//   }

//   upload.single('photo')(req, res, async function (err) {
//     if (err) {
//       console.error('Erreur lors du téléchargement de la photo :', err);
//       return res.status(500).json({ error: 'Erreur lors du téléchargement de la photo.' });
//     }

//     const { nom, email, motDePasse } = req.body;
//     const photoUrl = 'uploads/' + req.file.filename;

//     try {
//       const newUser = await prisma.user.create({
//         data: {
//           nom,
//           email,
//           motDePasse,
//           photoUrl,
//         },
//       });

//       res.status(201).json(newUser);
//     } catch (error) {
//       console.error('Erreur lors de la création de l\'utilisateur :', error);
//       res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
//     }
//   });
// }
