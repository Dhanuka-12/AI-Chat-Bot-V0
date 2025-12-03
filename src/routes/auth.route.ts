import { Router } from "express";
import { Authcontroller } from "../controller/auth.controller";

export class AuthRouter{
    private router: Router;
    private static instance: AuthRouter;
    private authController: Authcontroller;
    public static getInstance(): AuthRouter {
        if(!AuthRouter.instance){
            AuthRouter.instance = new AuthRouter();
        }
        return AuthRouter.instance;
    }

    private constructor(){
        this.router = Router();
        this.authController = new Authcontroller();
        this.initRoutes();
    }

    public initRoutes(){
        this.router.post('/login', this.authController.login);
        this.router.post('/register', this.authController.register);
    }

    public getRouter(): Router {
        return this.router;
    }

} 