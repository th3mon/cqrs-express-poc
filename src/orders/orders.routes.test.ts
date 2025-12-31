import { describe, it, expect, vi } from "vitest";
import express from "express";
import request from "supertest";
import { ordersRoutes } from "./orders.routes";
import { CommandBus, QueryBus } from "../bus";

type SetupOptions = {
  queryResult?: unknown;
};

function setup({ queryResult }: SetupOptions = {}) {
  const commandBus = { execute: vi.fn() } as unknown as CommandBus;
  const queryBus = {
    execute: vi.fn().mockReturnValue(queryResult),
  } as unknown as QueryBus;

  const app = express();
  app.use(express.json());
  app.use(ordersRoutes(commandBus, queryBus));

  return { app, commandBus, queryBus };
}

describe("ordersRoutes", () => {
  describe("GET /", () => {
    it("returns orders", async () => {
      const views = [
        {
          id: "order-1",
          customerId: "customer-666",
          status: "CREATED",
          statusText: "Created",
          itemCount: 3,
          createdAt: "2025-12-31T04:38:02.000Z",
        },
      ];

      const { app } = setup({ queryResult: views });

      const res = await request(app)
        .get("/")
        .query({ customerId: "customer-666" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(views);
    });

    it("returns 400 when query is not correct - empty customerId", async () => {
      const { app } = setup();

      const res = await request(app).get("/").query({ customerId: "" });

      expect(res.status).toBe(400);
    });

    it("returns empty list", async () => {
      const { app } = setup();

      const res = await request(app)
        .get("/")
        .query({ customerId: "customer-666" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });
});
