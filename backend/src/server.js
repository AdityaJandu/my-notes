import express from "express";
import cors from 'cors';
import dotenv from "dotenv";

import rateLimiter from "./middlewares/rateLimiter.js";
import notesRoutes from "./routes/notes_route.js";
import { connectDB } from "./config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// MIDDLEWARE: Parse the JSON body like => req.body -> then can get the required fields..
app.use(cors(
    {
        origin: "http://localhost:5173",
    }
));
app.use(express.json());
app.use(rateLimiter);

// SIMPLE EXAMPLE OF MIDDLEWARE
// app.use((req, res, next) => {
//     // Depends on params of req => call functions from notes_routes on based of type of http request...
//     console.log(`Request method and url: ${req.method} and ${req.url}`); // Request method and url: GET and /api/notes/:id
//     next(); // => Means what is happening like: Response and calling functions..
// })

app.use("/api/notes", notesRoutes);



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("App is live on PORT: ", PORT);
    });
});



