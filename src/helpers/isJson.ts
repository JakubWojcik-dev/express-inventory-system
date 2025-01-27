import { Request } from "express";

const isJson = (req: Request): Boolean => {
  try {
    JSON.parse(JSON.stringify(req.body));

    return true;
  } catch (error) {
    return false;
  }
};
export default isJson;
