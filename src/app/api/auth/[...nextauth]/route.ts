import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";

/**
 * Configura NextAuth con las opciones de autenticación.
 * @type {import("next").NextApiHandler}
 */
const handler = NextAuth(authOptions);

// Maneja solicitudes GET y POST
export { handler as GET, handler as POST };
