import { Command } from "../../command";
import { OrderItemInput } from "../orderWriteRepo";

export type CreateOrderCommand = Command & {
  type: "CreateOrder";
  customerId: string;
  items: OrderItemInput[];
};
