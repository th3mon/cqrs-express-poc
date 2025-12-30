import { EventBus } from "../eventBus";
import { OrderReadRepo } from "./orderReadRepo";
import { OrderWriteRepo } from "./orderWriteRepo";

type OrderEvents = {
  OrderCreated: { orderId: string };
  OrderChanged: { orderId: string };
};

function statusText(status: string): string {
  switch (status) {
    case "CREATED":
      return "Created";
    case "PAID":
      return "Paid";
    case "CANCELLED":
      return "Cancelled";
    default:
      return status;
  }
}

export function registerOrderProjector(
  events: EventBus<OrderEvents>,
  writeRepo: OrderWriteRepo,
  readRepo: OrderReadRepo,
): void {
  async function rebuild(orderId: string) {
    const order = await writeRepo.getOrderWithItems(orderId);

    if (!order) return;

    const itemCount = order.items.reduce((sum, i) => sum + i.qty, 0);

    await readRepo.upsertView({
      id: order.id,
      customerId: order.customerId,
      status: order.status,
      statusText: statusText(order.status),
      itemCount,
      createdAt: order.createdAt,
    });
  }

  events.on("OrderCreated", async (e) => rebuild(e.payload.orderId));
  events.on("OrderChanged", async (e) => rebuild(e.payload.orderId));
}
