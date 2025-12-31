// TODO: Wire all modules
import express from "express";

import { CommandBus, QueryBus } from "./bus.ts";
import { ordersRoutes } from "./orders/orders.routes.ts";
import { ListOrdersHandler } from "./orders/list-orders/listOrders.hander.ts";
import { OrderReadRepo } from "./orders/orderReadRepo.ts";
import { GetOrderHandler } from "./orders/get-order/getOrder.handler.ts";
import { OrderWriteRepo } from "./orders/orderWriteRepo.ts";
import { CreateOrderHandler } from "./orders/create-order/createOrder.handler.ts";
import { EventBus } from "./eventBus.ts";
import { registerOrderProjector } from "./orders/order.projector.ts";

const app = express();

app.use(express.json());

const queryBus = new QueryBus();
const readRepo = new OrderReadRepo();

queryBus.register(new ListOrdersHandler(readRepo));
queryBus.register(new GetOrderHandler(readRepo));

const commandBus = new CommandBus();
const writeRepo = new OrderWriteRepo();
const events = new EventBus();

commandBus.register(new CreateOrderHandler(writeRepo, events));

registerOrderProjector(events, writeRepo, readRepo);

app.use("/api/orders", ordersRoutes(commandBus, queryBus));
app.get("/api/health", (_req, res) => res.json({ ok: true }));

const port = 3000;
app.listen(port, () => console.log(`listen on ${port}`));
