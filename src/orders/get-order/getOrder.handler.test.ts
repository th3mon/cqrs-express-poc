import { describe, it, expect, vi } from "vitest";
import { GetOrderHandler } from "./getOrder.handler";
import { OrderReadRepo } from "../orderReadRepo";
import { GetOrderQuery } from "./getOrder.query";

describe("GetOrderHandler", () => {
  it("Instantiate", () => {
    const readRepo: OrderReadRepo = {} as OrderReadRepo;
    const getOrderHandler = new GetOrderHandler(readRepo);

    expect(getOrderHandler).toBeTruthy();
  });

  it("get order", async () => {
    const id = "0772f173-b238-41dd-9b3e-ec58ec819053";
    const readRepo: OrderReadRepo = {
      getViewById: vi.fn().mockReturnValue({ id, status: "CREATED" }),
    } as unknown as OrderReadRepo;
    const getOrderHandler = new GetOrderHandler(readRepo);

    const order = await getOrderHandler.execute({
      id,
    } as GetOrderQuery);

    expect(order.id).toBe(id);
    expect(order.status).toBe("CREATED");
  });
});
