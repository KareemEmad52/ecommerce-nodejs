import express from "express";
import env from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { DBConnection } from "./database/dbConnection.js";
import v1Router from "./src/router/routes.js";
import { AppError, CatchAsyncError } from "./src/utils/error.handler.js";
import Stripe from "stripe";
import { makeOnlineOrder } from "./src/modules/orders/oreders.controllers.js";

const app = express();
const port = +process.env.PORT;
env.config();

app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    CatchAsyncError(async (request, response) => {
        const sig = request.headers["stripe-signature"];

        let event;

        try {
            event = Stripe.webhooks.constructEvent(
                request.body,
                sig,
                process.env.WEB_HOOK_SECRET
            );
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Handle the event
        switch (event.type) {
            case "checkout.session.completed":
                const data = event.data.object;
                await makeOnlineOrder(data);
                // Then define and call a function to handle the event checkout.session.completed
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        // Return a 200 response to acknowledge receipt of the event
        response.send();
    })
);

app.use(express.json());

app.use("/api/v1", v1Router);

app.all("*", (req, res, next) => {
    throw new AppError("Route not found", 404);
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

app.use((err, req, res, next) => {
    const { status, stack, message } = err;
    res.status(status || 500).json({
        message,
        ...(process.env.MODE === "development" && { stack }),
    });
});

DBConnection();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
