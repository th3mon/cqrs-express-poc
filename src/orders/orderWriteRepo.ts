export type OrderItemInput = { sku: string; qty: number };

export class OrderWriteRepo {
  async createOrder(createOrder: any, items: OrderItemInput[]) {
    return { id: "" };
  }
}
