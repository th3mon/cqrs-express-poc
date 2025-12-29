export type OrderItemInput = { sku: string; qty: number };

export class OrderWriteRepo {
  async createOrder(createOrder: any, items: OrderItemInput[]) {
    return { id: "" };
  }

  async getOrderWithItems(orderId: string): Promise<{
    status: string;
    orderId: string;
    item: OrderItemInput;
  }> {
    return {
      status: "",
      orderId,
      item: [] as unknown as OrderItemInput,
    };
  }

  async addItem(orderId: string, item: OrderItemInput) {
    const items = new Map<string, OrderItemInput>();

    items.set(orderId, item);
  }
}
