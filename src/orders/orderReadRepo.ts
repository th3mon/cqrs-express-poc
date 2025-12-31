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
  }): Promise<OrderViewDTO[]> {
    const { customerId, take = 20, skip = 0 } = params;
    const ordersFromDB: OrderViewDTO[] = [
      {
        id: "order-001",
        customerId: "customer-123",
        status: "CREATED",
        statusText: "Created",
        itemCount: 3,
        createdAt: new Date("2025-01-10T10:15:00.000Z"),
      },
      {
        id: "order-002",
        customerId: "customer-456",
        status: "PAID",
        statusText: "Paid",
        itemCount: 1,
        createdAt: new Date("2025-01-11T14:42:30.000Z"),
      },
      {
        id: "order-003",
        customerId: "customer-123",
        status: "CANCELLED",
        statusText: "Cancelled",
        itemCount: 5,
        createdAt: new Date("2025-01-12T08:05:45.000Z"),
      },
    ];

    // return prisma.orderView.findMany({
    //   where: customerId ? { customerId } : undefined,
    //   orderBy: { createdAt: "desc" },
    //   take,
    //   skip,
    // });
    return ordersFromDB;
  }
}
