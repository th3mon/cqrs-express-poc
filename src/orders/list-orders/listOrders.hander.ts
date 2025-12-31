import type { QueryHandler } from "../../query.ts";
import type { OrderReadRepo, OrderViewDTO } from "../orderReadRepo.ts";
import type { ListOrdersQuery } from "./listOrders.query.ts";

export class ListOrdersHandler implements QueryHandler<
  ListOrdersQuery,
  OrderViewDTO[]
> {
  type: ListOrdersQuery["type"] = "ListOrders";

  private readRepo: OrderReadRepo;

  constructor(readRepo: OrderReadRepo) {
    this.readRepo = readRepo;
  }

  async execute(query: ListOrdersQuery): Promise<OrderViewDTO[]> {
    const orders = await this.readRepo.listViews({
      customerId: query.customerId,
      take: query.take,
      skip: query.skip,
    });

    return orders;
  }
}
