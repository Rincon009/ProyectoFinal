'use server';

import { authOptions } from "@/lib/authOptions";
import { getLiveblocksClient, liveblocksClient } from "@/lib/liveblocksClient";
import { Liveblocks, RoomInfo } from "@liveblocks/node";
import { getServerSession } from "next-auth";
import uniqid from 'uniqid';

/**
 * Crea un nuevo tablero y asigna acceso al usuario actual.
 * @param {string} name - El nombre del tablero.
 * @returns {Promise<false | RoomInfo>} - La información de la sala creada o false si el email no está disponible.
 */
export async function createBoard(name: string) : Promise<false | RoomInfo> {
  const liveblocksClient = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY || '',
  });
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || '';
  if (email) {
    const roomId = uniqid.time();
    return await liveblocksClient.createRoom(roomId, {
      defaultAccesses: [],
      usersAccesses: {
        [email]: ['room:write'],
      },
      metadata: {
        boardName: name,
      },
    });
  }

  return false;
}

/**
 * Añade un email a un tablero existente con permisos de escritura.
 * @param {string} boardId - El ID del tablero.
 * @param {string} email - El email del usuario que se añadirá.
 * @returns {Promise<boolean>} - True si se añadió el usuario correctamente.
 */
export async function addEmailToBoard(boardId: string, email: string): Promise<boolean> {
  const room = await liveblocksClient.getRoom(boardId);
  const usersAccesses = room.usersAccesses;
  usersAccesses[email] = ['room:write'];
  console.log(usersAccesses);
  await liveblocksClient.updateRoom(boardId, { usersAccesses });
  return true;
}

/**
 * Actualiza la información de un tablero existente.
 * @param {string} boardId - El ID del tablero.
 * @param {any} updateData - Los datos que se actualizarán en el tablero.
 * @returns {Promise<boolean>} - True si se actualizó el tablero correctamente.
 */
export async function updateBoard(boardId: string, updateData: any): Promise<boolean> {
  const result = await liveblocksClient.updateRoom(boardId, updateData);
  console.log({ resultado: result });
  return true;
}

/**
 * Elimina un email de un tablero existente.
 * @param {string} boardId - El ID del tablero.
 * @param {string} email - El email del usuario que se eliminará.
 * @returns {Promise<boolean>} - True si se eliminó el usuario correctamente.
 */
export async function removeEmailFromBoard(boardId: string, email: string): Promise<boolean> {
  const room = await liveblocksClient.getRoom(boardId);
  const usersAccesses: any = room.usersAccesses;
  usersAccesses[email] = null;
  await liveblocksClient.updateRoom(boardId, { usersAccesses });
  return true;
}

/**
 * Elimina un tablero existente.
 * @param {string} boardId - El ID del tablero.
 * @returns {Promise<boolean>} - True si se eliminó el tablero correctamente.
 */
export async function deleteBoard(boardId: string): Promise<boolean> {
  await liveblocksClient.deleteRoom(boardId);
  return true;
}
