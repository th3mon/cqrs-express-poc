import { Router } from "express";
import { CommandBus, QueryBus } from "../bus.ts";
import {
  createOrderBodySchema,
  listOrdersQuerySchema,
  orderQuerySchema,
} from "./orders.schemas.ts";
import type { ListOrdersQuery } from "./list-orders/listOrders.query.ts";
import type { OrderViewDTO } from "./orderReadRepo.ts";
import type { GetOrderQuery } from "./get-order/getOrder.query.ts";

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

    res.json(views ?? []);
  });

  router.get("/:id", async (req, res) => {
    const result = orderQuerySchema.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json(result.error.format());
    }

    const view = await queryBus.execute<GetOrderQuery, OrderViewDTO>({
      type: "GetOrder",
      id: result.data.id,
    });

    res.json(view);
  });

  router.post("/", async (req, res) => {
    const result = createOrderBodySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json(result.error.format());
    }

    const view = await commandBus.execute({
      type: "CreateOrder",
      customerId: result.data.customerId,
      items: result.data.items,
    });

    res.status(201).json(view);
  });

  return router;
}
