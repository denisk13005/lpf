// Ce fichier permet de rendre dispo une instance de prisma dans tout le projet en évitant de créer un trop gros nb d'instance durant les tests en mode development

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma : PrismaClient | undefined
}

const prisma = global.prisma|| new PrismaClient()
if(process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma


