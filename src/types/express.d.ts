import { UserRole } from "../constants/user.constants";

declare global {
    namespace Express {
        interface Request {
            user?: {
                user_id: string;
                role: UserRole;
            };
        }
    }
}

export {};