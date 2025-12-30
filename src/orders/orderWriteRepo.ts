export type OrderItemInput = { sku: string; qty: number };

export class OrderWriteRepo {
  async createOrder(createOrder: any, items: OrderItemInput[]) {
    return { id: "" };
  }

  async getOrderWithItems(orderId: string) {
    const orderWithItems = {
      id: "order-001",
      customerId: "customer-123",
      status: "CREATED",
      createdAt: new Date("2025-01-10T10:15:00.000Z"),

      items: [
        {
          id: "item-001",
          orderId: "order-001",
          sku: "SKU-APPLE",
          qty: 2,
        },
        {
          id: "item-002",
          orderId: "order-001",
          sku: "SKU-BANANA",
          qty: 1,
        },
        {
          id: "item-003",
          orderId: "order-001",
          sku: "SKU-ORANGE",
          qty: 5,
        },
      ],
    };

    return orderWithItems;
  }

  async addItem(orderId: string, item: OrderItemInput) {
    const items = new Map<string, OrderItemInput>();

    items.set(orderId, item);
  }
}
