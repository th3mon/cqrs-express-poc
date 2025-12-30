import { describe, it, expect, vi, beforeEach } from "vitest";
import { registerOrderProjector } from "./order.projector";

describe("Order projector", () => {
  const events = { on: vi.fn() };
  const writeRepo = { getOrderWithItems: vi.fn() };
  const readRepo = { upsertView: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rebuilds view on OrderCreated", async () => {
    registerOrderProjector(events as any, writeRepo as any, readRepo as any);

    const calls = events.on.mock.calls as Array<
      [string, (e: any) => Promise<void>]
    >;

    const createdCb = calls.find((c) => c[0] === "OrderCreated")?.[1];
    expect(createdCb).toBeTypeOf("function");

    writeRepo.getOrderWithItems.mockResolvedValue({
      id: "order-1",
      customerId: "c-123",
      status: "CREATED",
      createdAt: new Date("2025-01-01T00:00:00Z"),
      items: [
        { sku: "A1", qty: 2 },
        { sku: "B2", qty: 1 },
      ],
    });

    await createdCb!({ type: "OrderCreated", payload: { orderId: "order-1" } });
    expect(readRepo.upsertView).toHaveBeenCalledTimes(1);
    expect(readRepo.upsertView.mock.calls[0][0]).toMatchObject({
      id: "order-1",
      customerId: "c-123",
      status: "CREATED",
      statusText: "Created",
      itemCount: 3,
    });
  });
});
