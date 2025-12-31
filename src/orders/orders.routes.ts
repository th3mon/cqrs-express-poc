// TODO: Implement

import { Router } from "express";
import { CommandBus, QueryBus } from "../bus.ts";
import { listOrdersQuerySchema } from "./orders.schemas.ts";
import type { ListOrdersQuery } from "./list-orders/listOrders.query.ts";
import type { OrderViewDTO } from "./orderReadRepo.ts";

export function ordersRoutes(commandBus: CommandBus, queryBus: QueryBus) {
  const router = Router();

  router.get("/", async (req, res) => {
    const result = listOrdersQuerySchema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json(result.error.format());
    }

    const views = await queryBus.execute<ListOrdersQuery, OrderViewDTO[]>({
      type: "ListOrders",
      customerId: result.data.customerId,
      take: result.data.take,
      skip: result.data.skip,
    });

    if (!views.length) {
      return res.status(404).json({ error: "Orders not found" });
    }

    res.json(views);
  });

  return router;
}
