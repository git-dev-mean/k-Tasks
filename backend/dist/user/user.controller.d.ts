import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(name: string, email: string, password: string): Promise<{
        result: import("./user.model").User & {
            _id: any;
        };
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    getAllUser(): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }[]>;
    getUser(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }>;
}
