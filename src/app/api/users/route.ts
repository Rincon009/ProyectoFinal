import { User, UserType } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

/**
 * Maneja la solicitud GET para buscar usuarios en la base de datos.
 * 
 * Esta función conecta a la base de datos MongoDB, busca usuarios por lista de correos electrónicos
 * o por una frase de búsqueda, y devuelve los resultados en formato JSON.
 * 
 * @param {NextRequest} req - La solicitud HTTP de Next.js.
 * @returns {Promise<Response>} - La respuesta HTTP con los usuarios encontrados.
 */
export async function GET(req: NextRequest): Promise<Response> {
  const url = new URL(req.url);
  const connectionString = process.env.MONGODB_URI;

  // Verificar si hay conexión a la base de datos
  if (!connectionString) {
    return new Response('No hay conexión a la base de datos', { status: 500 });
  }

  await mongoose.connect(connectionString);

  let users = [];

  // Buscar usuarios por lista de correos electrónicos (ids)
  if (url.searchParams.get('ids')) {
    const emails = url.searchParams.get('ids')?.split(',');
    users = await User.find({ email: { $in: emails } });
  }

  // Buscar usuarios mediante una frase de búsqueda
  if (url.toString().includes('?search=')) {
    const searchPhrase = url.searchParams.get('search');
    const searchRegex = new RegExp(`.*${searchPhrase}.*`, 'i');
    users = await User.find({
      $or: [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
      ],
    });
  }

  // Devolver los usuarios encontrados en formato JSON
  return Response.json(
    users.map((u: UserType) => ({
      id: u.email,
      name: u.name,
      image: u.image,
      avatar: u.image,
    }))
  );
}
