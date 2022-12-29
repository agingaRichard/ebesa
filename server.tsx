import backend from "./server";

const next = require("next");
const dev = process.env.NODE_ENV !== "production";

const exe = next({ dev });
const handle = exe.getRequestHandler();

exe
  .prepare()
  .then(() => {
    const server = backend();
  })
  .catch((err) => {
    console.error();
  });
