import { UserDao } from "../dao/user.dao";
import { IUser } from "../model/user.model";
import { Errors } from "../constants/errors.constants";
import { LoginDto } from "../dto/login/login.dto";

export class UserService{
    private userDao: UserDao;
    public static instance: UserService;

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    private constructor() {
        this.userDao = UserDao.getInstance();
    }

    public async createUser(user:IUser):Promise<IUser>{
        try{
            const createdUser = await this.userDao.createUser(user);
            return createdUser;
        }catch(error:any){
            console.log(error);
            if(error.code === 11000){
                throw new Error(Errors.USER_ALREADY_EXISTS);
            }
            console.log(error);
            throw error;
        }
    }

    public async login(user: LoginDto): Promise <Partial<IUser>>{
        try{
            const loginUser = await this.userDao.getUserByEmail(user.email);
            if(!loginUser){
                throw new Error(Errors.USER_NOT_FOUND);
            }
            if(loginUser.password !== user.password){
                throw new Error(Errors.INVALID_PASSWORD);
            }

            const {password,createdAt, updatedAt, ...userWithoutPassword} = loginUser;

            return userWithoutPassword;

        }catch(error){
            console.error(error);
            throw error;
        } 
    }
}