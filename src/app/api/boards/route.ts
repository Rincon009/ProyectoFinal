import { Liveblocks } from "@liveblocks/node";
import { NextRequest, NextResponse } from "next/server";

/**
 * Maneja la solicitud PUT para actualizar un tablero.
 * 
 * Esta función recibe una solicitud PUT, extrae los datos necesarios del cuerpo de la solicitud,
 * y utiliza la API de Liveblocks para actualizar el tablero correspondiente. Devuelve una respuesta JSON 
 * indicando el éxito o el error de la operación.
 * 
 * @param {NextRequest} req - La solicitud de Next.js.
 * @returns {Promise<NextResponse>} - La respuesta de Next.js.
 */
export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    // Extrae el ID del tablero y los datos de actualización del cuerpo de la solicitud
    const { id, update } = await req.json();
    
    // Crea una instancia de Liveblocks con la clave secreta del entorno
    const liveblocks = new Liveblocks({ secret: process.env.LIVEBLOCKS_SECRET_KEY as string });
    
    // Imprime los datos en la consola para depuración
    console.log({ id, update });
    
    // Actualiza el tablero en Liveblocks
    await liveblocks.updateRoom(id, update);
    
    // Devuelve una respuesta JSON indicando éxito
    return NextResponse.json(true);
  } catch (error) {
    // Imprime el error en la consola y devuelve una respuesta JSON de error
    console.error('Error al actualizar el tablero:', error);
    return NextResponse.json({ error: 'Hubo un problema al actualizar el tablero' }, { status: 500 });
  }
}

