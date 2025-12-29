import type { CommandHandler } from "../../command";
import type { EventBus } from "../../eventBus";
import { OrderDomain } from "../domain";
import type { OrderWriteRepo } from "../orderWriteRepo";
import type { AddItemCommand } from "./addItem.command";

export class AddItemHandler implements CommandHandler<
  AddItemCommand,
  { ok: true }
> {
  type: AddItemCommand["type"] = "AddItem";

  constructor(
    private writeRepo: OrderWriteRepo,
    private events: EventBus,
  ) {}

  async execute(command: AddItemCommand): Promise<{ ok: true }> {
    const order = await this.writeRepo.getOrderWithItems(command.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    OrderDomain.ensureCanAddItem(order.status);

    await this.writeRepo.addItem(command.orderId, command.item);
    await this.events.publish({
      type: "OrderChanged",
      payload: { orderId: command.orderId },
    });

    return { ok: true };
  }
}
