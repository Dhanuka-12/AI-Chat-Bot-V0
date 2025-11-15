export enum UserType{
    CUSTOMER = 'customer',
    ADMIN = 'admin'
}

export interface IUser {
    _id: string;
    name: string;
    phoneNumber: string;
    createdAt?:Date;
    updatedAt?: Date;

}

