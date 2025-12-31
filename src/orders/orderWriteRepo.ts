import { prisma } from "../../prisma/client.ts";

export type OrderItemInput = { sku: string; qty: number };

export class OrderWriteRepo {
  async createOrder(customerId: string, items: OrderItemInput[]) {
    return prisma.order.create({
      data: {
        customerId,
        items: { create: items.map((i) => ({ sku: i.sku, qty: i.qty })) },
      },
      include: { items: true },
    });
  }

  async addItem(orderId: string, item: OrderItemInput) {
    return prisma.orderItem.create({
      data: { orderId, sku: item.sku, qty: item.qty },
    });
  }

  async getOrderWithItems(orderId: string) {
    return prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
  }
}
