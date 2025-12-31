// TODO: Implement

import { Router } from "express";
import { CommandBus, QueryBus } from "../bus.ts";

export function ordersRoutes(commandBus: CommandBus, queryBus: QueryBus) {
  const router = Router();

  return router;
}
