import errorhandler from "errorhandler";
import app from "./app";

app.use(errorhandler());

// Start the server
const server = app.listen(app.get("port"), () => {
  console.log(
    "Bookmarks app is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
});
