import { createApp } from "../server/src/app.js";

const app = createApp();

export default (req, res) => {
  return app(req, res);
};
