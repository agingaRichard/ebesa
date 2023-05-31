import handler from "./pages/api/posts";

const next = require("next");
const dev = process.env.NODE_ENV !== "production";

const exe = next({ dev });
const handle = exe.getRequestHandler();

const req = "myreq";
const res = "yourres";

exe
  .prepare()
  .then(() => {
    const server = handler(req, res);
  })
  .catch((err: any) => {
    console.error();
  });
