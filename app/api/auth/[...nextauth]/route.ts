import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers


//optional Middleware to keep the session alive, this will update the session expiry every time its called.
//export { auth as middleware } from "@/auth"
