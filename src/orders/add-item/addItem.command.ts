import { Command } from "../../command";
import { OrderItemInput } from "../orderWriteRepo";

export type AddItemCommand = Command & {
  type: "AddItem";
  orderId: string;
  item: OrderItemInput;
};
