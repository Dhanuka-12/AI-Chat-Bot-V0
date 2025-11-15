import mongoose from 'mongoose';

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

export const UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        phoneNumber: {type: String, required: true},
        type: {type: String, enum: Object.values(UserType), required: true},
    },
    {
        timestamps: true
    }
);
export const User = mongoose.model<IUser>('User', UserSchema);
