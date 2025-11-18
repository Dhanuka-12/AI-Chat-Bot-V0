import {Router} from "express";
import { UserRouter } from "./user.route";

export class MainRouter{
    private router: Router;
    private static instance: MainRouter;
    private userRouter =  UserRouter.getInstance();

    public static getInstance(): MainRouter {
        if (!MainRouter.instance) {
            MainRouter.instance = new MainRouter();
        }
        return MainRouter.instance;
    }

    private constructor() {
        this.router = Router();
        this.userRouter = new UserRouter();

    }

    public initRoutes() {
        this.router.use ("/user", this.userRouter.getRouter());
    }

    public getRouter(): Router {
        return this.router;
    }
}