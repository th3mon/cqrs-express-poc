import type { CommandHandler } from "../../command.ts";
import type { EventBus } from "../../eventBus.ts";
import type { OrderWriteRepo } from "../orderWriteRepo.ts";
import type { CreateOrderCommand } from "./createOrder.command.ts";

export class CreateOrderHandler implements CommandHandler<
  CreateOrderCommand,
  { id: string }
> {
  type: CreateOrderCommand["type"] = "CreateOrder";

  private writeRepo: OrderWriteRepo;
  private events: EventBus;

  constructor(writeRepo: OrderWriteRepo, events: EventBus) {
    this.writeRepo = writeRepo;
    this.events = events;
  }

  async execute(command: CreateOrderCommand): Promise<{ id: string }> {
    const order = await this.writeRepo.createOrder(
      command.customerId,
      command.items,
    );

    await this.events.publish({
      type: "OrderCreated",
      payload: { orderId: order.id },
    });

    return { id: order.id };
  }
}
