import { Router } from "express";
import { UserController } from "../controller/user.controller";

export class UserRouter{
    private static instance: UserRouter;
    private userController: UserController;
    private router: Router;

    public static getInstance(): UserRouter {
        if (!UserRouter.instance) {
            UserRouter.instance = new UserRouter();
        }
        return UserRouter.instance;
    }

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.initRoutes(); 
    }

    public initRoutes() {
        this.router.post("/", this.userController.createUser);
    }

    public getRouter(): Router {
        return this.router;
    }
}