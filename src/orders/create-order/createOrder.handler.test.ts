import { describe, it, expect, vi } from "vitest";
import { OrderWriteRepo } from "../orderWriteRepo";
import { EventBus } from "../../eventBus";
import { CreateOrderCommand } from "./createOrder.command";
import { CreateOrderHandler } from "./createOrder.handler";

describe("CreateOrderHandler", () => {
  it("Instantiate", () => {
    const writeRepo: OrderWriteRepo = {} as OrderWriteRepo;
    const events: EventBus = {} as EventBus;
    const createOrderHandler = new CreateOrderHandler(writeRepo, events);

    expect(createOrderHandler).toBeTruthy();
  });

  it("type field equals to CreateOrder", () => {
    const writeRepo: OrderWriteRepo = {} as OrderWriteRepo;
    const events: EventBus = {} as EventBus;
    const createOrderHandler = new CreateOrderHandler(writeRepo, events);

    expect(createOrderHandler.type).toBe("CreateOrder");
  });

  it("create order", async () => {
    const command: CreateOrderCommand = {
      customerId: "c1b45cf1-05d7-412b-be8c-db85d3afc814",
      items: [
        {
          sku: "40411e39-7126-4f86-9735-c9eda7cb39f7",
          qty: 1,
        },
      ],
    } as CreateOrderCommand;

    const writeRepo: OrderWriteRepo = {
      createOrder: vi
        .fn()
        .mockReturnValue({ id: "cf24a76b-b0d6-40a0-8fcc-36ac4c2ab95c" }),
    } as unknown as OrderWriteRepo;

    const events: EventBus = {
      publish: vi.fn(),
    } as unknown as EventBus;

    const createOrderHandler = new CreateOrderHandler(writeRepo, events);

    await createOrderHandler.execute(command);

    expect(writeRepo.createOrder).toHaveBeenCalled();
  });

  it("publish event", async () => {
    const command: CreateOrderCommand = {
      customerId: "c1b45cf1-05d7-412b-be8c-db85d3afc814",
      items: [
        {
          sku: "40411e39-7126-4f86-9735-c9eda7cb39f7",
          qty: 1,
        },
      ],
    } as CreateOrderCommand;

    const writeRepo: OrderWriteRepo = {
      createOrder: vi
        .fn()
        .mockReturnValue({ id: "cf24a76b-b0d6-40a0-8fcc-36ac4c2ab95c" }),
    } as unknown as OrderWriteRepo;

    const events: EventBus = {
      publish: vi.fn(),
    } as unknown as EventBus;

    const createOrderHandler = new CreateOrderHandler(writeRepo, events);

    await createOrderHandler.execute(command);

    expect(events.publish).toHaveBeenCalled();
  });

  it("passes customerId and items to createOrder", async () => {
    const command: CreateOrderCommand = {
      customerId: "c1b45cf1-05d7-412b-be8c-db85d3afc814",
      items: [
        {
          sku: "40411e39-7126-4f86-9735-c9eda7cb39f7",
          qty: 1,
        },
        {
          sku: "50522f48-8237-5f97-a846-dac96e4dcb50",
          qty: 3,
        },
      ],
    } as CreateOrderCommand;

    const writeRepo: OrderWriteRepo = {
      createOrder: vi
        .fn()
        .mockReturnValue({ id: "cf24a76b-b0d6-40a0-8fcc-36ac4c2ab95c" }),
    } as unknown as OrderWriteRepo;

    const events: EventBus = {
      publish: vi.fn(),
    } as unknown as EventBus;

    const createOrderHandler = new CreateOrderHandler(writeRepo, events);

    await createOrderHandler.execute(command);

    expect(writeRepo.createOrder).toHaveBeenCalledWith(
      command.customerId,
      command.items,
    );
  });

  it("publishes OrderCreated event with order id", async () => {
    const command: CreateOrderCommand = {
      customerId: "c1b45cf1-05d7-412b-be8c-db85d3afc814",
      items: [
        {
          sku: "40411e39-7126-4f86-9735-c9eda7cb39f7",
          qty: 1,
        },
      ],
    } as CreateOrderCommand;

    const orderId = "cf24a76b-b0d6-40a0-8fcc-36ac4c2ab95c";
    const writeRepo: OrderWriteRepo = {
      createOrder: vi.fn().mockReturnValue({ id: orderId }),
    } as unknown as OrderWriteRepo;

    const events: EventBus = {
      publish: vi.fn(),
    } as unknown as EventBus;

    const createOrderHandler = new CreateOrderHandler(writeRepo, events);

    await createOrderHandler.execute(command);

    expect(events.publish).toHaveBeenCalledWith({
      type: "OrderCreated",
      payload: { order: orderId },
    });
  });

  it("returns order id", async () => {
    const command: CreateOrderCommand = {
      customerId: "c1b45cf1-05d7-412b-be8c-db85d3afc814",
      items: [
        {
          sku: "40411e39-7126-4f86-9735-c9eda7cb39f7",
          qty: 1,
        },
      ],
    } as CreateOrderCommand;

    const orderId = "cf24a76b-b0d6-40a0-8fcc-36ac4c2ab95c";
    const writeRepo: OrderWriteRepo = {
      createOrder: vi.fn().mockReturnValue({ id: orderId }),
    } as unknown as OrderWriteRepo;

    const events: EventBus = {
      publish: vi.fn(),
    } as unknown as EventBus;

    const createOrderHandler = new CreateOrderHandler(writeRepo, events);

    const result = await createOrderHandler.execute(command);

    expect(result).toEqual({ id: orderId });
  });
});
