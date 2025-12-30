export type OrderViewDTO = {
  id: string;
  customerId: string;
  status: string;
  statusText: string;
  itemCount: number;
  createdAt: Date;
};

export class OrderReadRepo {
  async upsertView(view: OrderViewDTO) {
    // return prisma.orderView.upsert({
    //   where: { id: view.id },
    //   create: view,
    //   update: view,
    // });
  }

  async getViewById(id: string): Promise<OrderViewDTO> {
    return {
      id,
      customerId: "5706dda5-db79-499b-b7b8-545edf166b81",
      status: "CREATED",
      statusText: "Created",
      itemCount: 3,
      createdAt: new Date(),
    };
    // return prisma.orderView.findUnique({ where: { id } });
  }

  async listViews(params: {
    customerId?: string;
    take?: number;
    skip?: number;
  }) {
    const { customerId, take = 20, skip = 0 } = params;

    // return prisma.orderView.findMany({
    //   where: customerId ? { customerId } : undefined,
    //   orderBy: { createdAt: "desc" },
    //   take,
    //   skip,
    // });
  }
}
