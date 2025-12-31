import { prisma } from "../../prisma/client.ts";

export type OrderViewDTO = {
  id: string;
  customerId: string;
  status: string;
  statusText: string;
  itemCount: number;
  createdAt: Date;
};

export class OrderReadRepo {
  async upsertView(view: OrderViewDTO): Promise<OrderViewDTO> {
    return prisma.orderView.upsert({
      where: { id: view.id },
      create: view,
      update: view,
    });
  }

  async getViewById(id: string): Promise<OrderViewDTO | null> {
    return prisma.orderView.findUnique({ where: { id } });
  }

  async listViews(params: {
    customerId?: string;
    take?: number;
    skip?: number;
  }): Promise<OrderViewDTO[]> {
    const { customerId, take = 20, skip = 0 } = params;

    return prisma.orderView.findMany({
      where: customerId ? { customerId } : undefined,
      orderBy: { createdAt: "desc" },
      take,
      skip,
    });
  }
}
