import initDb from "./db/index.js";
import app from "./app.js";
import chalk from "chalk";

const port = process.env.PORT || 8000;

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.bgGreen(`Server is running on ${port}`));
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
