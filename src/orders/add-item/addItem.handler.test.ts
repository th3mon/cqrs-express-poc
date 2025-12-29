import { describe, it, expect, vi } from "vitest";
import { EventBus } from "../../eventBus";
import { OrderWriteRepo } from "../orderWriteRepo";
import { AddItemHandler } from "./addItem.handler";
import { AddItemCommand } from "./addItem.command";

describe("AddItemHandler", () => {
  it("Instantiate", () => {
    const writeRepo: OrderWriteRepo = {} as OrderWriteRepo;
    const events: EventBus = {} as EventBus;
    const addItemHandler = new AddItemHandler(writeRepo, events);

    expect(addItemHandler).toBeTruthy();
  });

  it("type field equals to AddItem", () => {
    const writeRepo: OrderWriteRepo = {} as OrderWriteRepo;
    const events: EventBus = {} as EventBus;
    const addItemHandler = new AddItemHandler(writeRepo, events);

    expect(addItemHandler.type).toBe("AddItem");
  });

  it("add item to existing order", async () => {
    const writeRepo: OrderWriteRepo = {
      getOrderWithItems: vi.fn().mockReturnValue({
        orderId: "f0f180ac-9bc3-43de-b0ef-10a76430dbdb",
        item: [
          {
            sku: "46fd24ff-daf1-4d85-9704-be59b192abc2",
            qty: 1,
          },
        ],
      }),
      addItem: vi.fn(),
    } as unknown as OrderWriteRepo;
    const events: EventBus = {
      publish: vi.fn(),
    } as unknown as EventBus;
    const addItemHandler = new AddItemHandler(writeRepo, events);
    const command: AddItemCommand = {
      customerId: "2e9d2548-4771-4cf9-a1da-6666900cf064",
      items: [
        {
          sku: "40411e39-7126-4f86-9735-c9eda7cb39f7",
          qty: 1,
        },
      ],
    } as unknown as AddItemCommand;

    const result = await addItemHandler.execute(command);

    expect(writeRepo.addItem).toHaveBeenCalled();
    expect(result).toEqual({ ok: true });
  });

  it("throws error when order not found", async () => {
    const writeRepo: OrderWriteRepo = {
      getOrderWithItems: vi.fn().mockReturnValue(null),
      addItem: vi.fn(),
    } as unknown as OrderWriteRepo;
    const events: EventBus = {} as EventBus;
    const addItemHandler = new AddItemHandler(writeRepo, events);
    const command: AddItemCommand = {
      orderId: "non-existent-order-id",
      item: {
        sku: "40411e39-7126-4f86-9735-c9eda7cb39f7",
        qty: 1,
      },
    } as unknown as AddItemCommand;

    await expect(addItemHandler.execute(command)).rejects.toThrow(
      "Order not found",
    );
  });

  it("throws error when order cannot be fullfilled", async () => {
    const writeRepo: OrderWriteRepo = {
      getOrderWithItems: vi.fn().mockReturnValue({ status: "CANCELLED" }),
      addItem: vi.fn(),
    } as unknown as OrderWriteRepo;
    const events: EventBus = {} as EventBus;
    const addItemHandler = new AddItemHandler(writeRepo, events);
    const command: AddItemCommand = {
      orderId: "non-existent-order-id",
      item: {
        sku: "40411e39-7126-4f86-9735-c9eda7cb39f7",
        qty: 1,
      },
    } as unknown as AddItemCommand;

    await expect(addItemHandler.execute(command)).rejects.toThrow(
      "Cannot modify cancelled order",
    );
  });

  it("publish event", async () => {
    const writeRepo: OrderWriteRepo = {
      getOrderWithItems: vi.fn().mockReturnValue({
        orderId: "f0f180ac-9bc3-43de-b0ef-10a76430dbdb",
        item: [
          {
            sku: "46fd24ff-daf1-4d85-9704-be59b192abc2",
            qty: 1,
          },
        ],
      }),
      addItem: vi.fn(),
    } as unknown as OrderWriteRepo;
    const events: EventBus = {
      publish: vi.fn(),
    } as unknown as EventBus;
    const addItemHandler = new AddItemHandler(writeRepo, events);
    const command: AddItemCommand = {
      customerId: "2e9d2548-4771-4cf9-a1da-6666900cf064",
      items: [
        {
          sku: "40411e39-7126-4f86-9735-c9eda7cb39f7",
          qty: 1,
        },
      ],
    } as unknown as AddItemCommand;

    await addItemHandler.execute(command);

    expect(events.publish).toHaveBeenCalled();
  });

  it("passes orderId and item to addItem", async () => {
    const orderId = "f0f180ac-9bc3-43de-b0ef-10a76430dbdb";
    const item = {
      sku: "40411e39-7126-4f86-9735-c9eda7cb39f7",
      qty: 1,
    };

    const writeRepo: OrderWriteRepo = {
      getOrderWithItems: vi.fn().mockReturnValue({
        orderId,
        status: "PENDING",
      }),
      addItem: vi.fn(),
    } as unknown as OrderWriteRepo;
    const events: EventBus = {
      publish: vi.fn(),
    } as unknown as EventBus;
    const addItemHandler = new AddItemHandler(writeRepo, events);
    const command: AddItemCommand = {
      orderId,
      item,
    } as unknown as AddItemCommand;

    await addItemHandler.execute(command);

    expect(writeRepo.addItem).toHaveBeenCalledWith(orderId, item);
  });

  it("publishes OrderChanged event with orderId", async () => {
    const orderId = "f0f180ac-9bc3-43de-b0ef-10a76430dbdb";

    const writeRepo: OrderWriteRepo = {
      getOrderWithItems: vi.fn().mockReturnValue({
        orderId,
        status: "PENDING",
      }),
      addItem: vi.fn(),
    } as unknown as OrderWriteRepo;
    const events: EventBus = {
      publish: vi.fn(),
    } as unknown as EventBus;
    const addItemHandler = new AddItemHandler(writeRepo, events);
    const command: AddItemCommand = {
      orderId,
      item: {
        sku: "40411e39-7126-4f86-9735-c9eda7cb39f7",
        qty: 1,
      },
    } as unknown as AddItemCommand;

    await addItemHandler.execute(command);

    expect(events.publish).toHaveBeenCalledWith({
      type: "OrderChanged",
      payload: { orderId },
    });
  });

  it("pass orderId when quering repo", async () => {
    const orderId = "f0f180ac-9bc3-43de-b0ef-10a76430dbdb";

    const writeRepo: OrderWriteRepo = {
      getOrderWithItems: vi.fn().mockReturnValue({
        orderId,
        status: "PENDING",
      }),
      addItem: vi.fn(),
    } as unknown as OrderWriteRepo;
    const events: EventBus = {
      publish: vi.fn(),
    } as unknown as EventBus;
    const addItemHandler = new AddItemHandler(writeRepo, events);
    const command: AddItemCommand = {
      orderId,
      item: {
        sku: "40411e39-7126-4f86-9735-c9eda7cb39f7",
        qty: 1,
      },
    } as unknown as AddItemCommand;

    await addItemHandler.execute(command);

    expect(writeRepo.getOrderWithItems).toHaveBeenCalledWith(orderId);
  });
});
