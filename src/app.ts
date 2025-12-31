// TODO: Wire all modules
import express from "express";

import { CommandBus, QueryBus } from "./bus.ts";
import { ordersRoutes } from "./orders/orders.routes.ts";
import { ListOrdersHandler } from "./orders/list-orders/listOrders.hander.ts";
import { OrderReadRepo } from "./orders/orderReadRepo.ts";
import { GetOrderHandler } from "./orders/get-order/getOrder.handler.ts";

const app = express();

app.use(express.json());

const commandBus = new CommandBus();
const queryBus = new QueryBus();

const readRepo = new OrderReadRepo();
queryBus.register(new ListOrdersHandler(readRepo));
queryBus.register(new GetOrderHandler(readRepo));

app.use("/api/orders", ordersRoutes(commandBus, queryBus));
app.get("/api/health", (_req, res) => res.json({ ok: true }));

const port = 3000;
app.listen(port, () => console.log(`listen on ${port}`));
