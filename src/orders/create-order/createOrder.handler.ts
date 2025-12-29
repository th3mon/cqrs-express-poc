import type { CommandHandler } from "../../command";
import type { EventBus } from "../../eventBus";
import type { OrderWriteRepo } from "../orderWriteRepo";
import type { CreateOrderCommand } from "./createOrder.command";

export class CreateOrderHandler implements CommandHandler<
  CreateOrderCommand,
  { id: string }
> {
  type: CreateOrderCommand["type"] = "CreateOrder";

  constructor(
    private writeRepo: OrderWriteRepo,
    private events: EventBus,
  ) {}

  async execute(command: CreateOrderCommand): Promise<{ id: string }> {
    const order = await this.writeRepo.createOrder(
      command.customerId,
      command.items,
    );

    await this.events.publish({
      type: "OrderCreated",
      payload: { order: order.id },
    });

    return { id: order.id };
  }
}
