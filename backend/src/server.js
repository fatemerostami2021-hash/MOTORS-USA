import "dotenv/config";
import { createApp } from "./app.js";
const PORT = Number(process.env.PORT || 4000);
if (!process.env.DATABASE_URL) console.warn("DATABASE_URL not set: dev mode, submissions are only logged here");
createApp().listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
