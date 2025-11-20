import { Errors } from "../constants/errors.constants";
import { LoginDto } from "../dto/login/login.dto";
import { IUser } from "../model/user.model";
import { UserService } from "../service/user.service";
import { Request, Response } from "express";


export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = UserService.getInstance();
    }

    createUser = async (req: Request, res: Response) => {
        const user = req.body as unknown as IUser;
        if(!user.name || !user.phoneNumber){
            res.status(400).json({message: 'Name and Phone Number are required'});
            return;
        }
        const createdUser = await this.userService.createUser(user);
        res.status(201).json(createdUser);
    }

    login = async (req: Request, res: Response) => {
        const user = req.body as unknown as LoginDto;

        try{
            const loginUser = await this.userService.login(user);

            res.status(200).json(loginUser);
        }catch(error:any){
            if(error.message === Errors.USER_NOT_FOUND){
                res.status(404).json({message: 'User not found'});
                return;
            }else if(error.message === Errors.INVALID_PASSWORD){
                res.status(401).json({message: 'Invalid password'});
                return;
            }else{
                res.status(500).json({message: 'Internal server error'});
                return;
            }
        }

    }
}