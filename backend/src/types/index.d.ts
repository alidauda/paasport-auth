import { User as UserDocument } from "@prisma/client";
declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}
