import express from "express";

import axios from "axios";
import { APP_CONFIG } from "./config/app.config";
import { MessageController } from "./controller/message.controller";
import { WebhookController } from "./controller/webhook.controller";
import mongoose from "mongoose";
import { User } from "./model/user.model";
import { UserController } from "./controller/user.controller";
import { webhookRouter } from "./routes/webhook.router";
import { MessageRouter } from "./routes/message.router";
import { UserRouter } from "./routes/user.route";
import { AuthRouter } from "./routes/auth.route";






const app = express();
app.use(express.json());

const WebhookRouter = webhookRouter.getInstance();
const messageRouter = MessageRouter.getInstance();
const userRouter = UserRouter.getInstance();
const authRouter = AuthRouter.getInstance();

//app.post("/send-message",messageController.sendMessage);
app.use("/webhook", WebhookRouter.getRouter());
app.use("/user", userRouter.getRouter());
app.use("/message", messageRouter.getRouter()); 
app.use("/auth", authRouter.getRouter());

app.get('/health', (req, res) => {
    res.send('OK');
});

mongoose.connect(APP_CONFIG.MONGO_URI).then((mongoose) => {
    const models = mongoose.modelNames();
    for (const model of models) {
        mongoose.model(model).createIndexes();
        console.log(`Indexes created for model: ${model}`);
        mongoose.model(model).ensureIndexes();
        mongoose.model(model).createCollection();
    }

    console.log('Connected to MongoDB');
    app.listen(8558,() => {
        console.log("Server is running on port 8558");
    });
}).catch((err) => {
    console.error(err);
});


//app.listen(8558, () => {
//    console.log("Server is running on port 8558");    
//});

