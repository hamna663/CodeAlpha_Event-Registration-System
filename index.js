import { app } from "./src/app.js";
// import { configDotenv } from "dotenv";
// configDotenv()

const PORT=process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});
