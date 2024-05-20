import { createClient } from "@liveblocks/client";
import { LiveList, LiveObject } from "@liveblocks/core";
import { createRoomContext } from "@liveblocks/react";

// Configura el cliente incluyendo la opción `resolveUsers`
const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  throttle: 100,
  resolveUsers: async ({ userIds }) => {
    const response = await fetch(`/api/users?ids=` + userIds.join(','));
    return await response.json();
  },
  resolveMentionSuggestions: async ({ text }) => {
    const response = await fetch(`/api/users?search=` + text);
    const users = await response.json();
    return users.map((user: { id: string }) => user.id);
  }
});

// Tipos definidos para las funcionalidades
export type Presence = {
  boardId?: null | string;
  cardId?: null | string;
};

export type Column = {
  name: string;
  id: string;
  index: number;
};

export type Card = {
  name: string;
  id: string;
  index: number;
  columnId: string;
};

type Storage = {
  columns: LiveList<LiveObject<Column>>;
  cards: LiveList<LiveObject<Card>>;
};

type UserMeta = {
  id: string;
  info: {
    name: string;
    email: string;
    image: string;
  };
};

type RoomEvent = {};

type ThreadMetadata = {
  cardId: string;
};

// Crear el contexto de la habitación sin incluir `resolveUsers`
export const {
  RoomProvider,
  useMyPresence,
  useUpdateMyPresence,
  useStorage,
  useMutation,
  useRoom,
  useSelf,
  useOthers,
  useThreads,
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(client);
