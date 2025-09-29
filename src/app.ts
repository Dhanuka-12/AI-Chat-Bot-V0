import { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const VERSION = process.env.VERSION;
const WHATSAPP_USER_ACCESS_TOKEN = process.env.WHATSAPP_USER_ACCESS_TOKEN;

const app = express();

