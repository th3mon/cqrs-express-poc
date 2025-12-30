import { describe, it, expect, vi } from "vitest";
import { ListOrdersHandler } from "./listOrders.hander";
import { OrderReadRepo, OrderViewDTO } from "../orderReadRepo";
import { ListOrdersQuery } from "./listOrders.query";

describe("ListOrdersHandler", () => {
  it("Instantiate", () => {
    const readRepo: OrderReadRepo = {} as OrderReadRepo;
    const listOrdersHandler = new ListOrdersHandler(readRepo);

    expect(listOrdersHandler).toBeTruthy();
  });

  it("get orders", async () => {
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
    const readRepo: OrderReadRepo = {
      listViews: vi.fn().mockReturnValue(ordersFromDB),
    } as unknown as OrderReadRepo;
    const listOrdersHandler = new ListOrdersHandler(readRepo);

    const orders = await listOrdersHandler.execute({
      customerId: "920c3de6-39c8-4a59-8d02-2a136a7f6dad",
      take: 3,
    } as unknown as ListOrdersQuery);

    expect(orders.length).toBe(3);
  });
});
