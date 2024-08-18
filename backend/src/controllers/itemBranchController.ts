import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error.js";

export const newItemBranch = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {}
);
