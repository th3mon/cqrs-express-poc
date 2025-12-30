import { QueryHandler } from "../../query";
import { OrderReadRepo, OrderViewDTO } from "../orderReadRepo";
import { ListOrdersQuery } from "./listOrders.query";

export class ListOrdersHandler implements QueryHandler<
  ListOrdersQuery,
  OrderViewDTO[]
> {
  type: ListOrdersQuery["type"] = "ListOrders";

  constructor(private readRepo: OrderReadRepo) {}

  async execute(query: ListOrdersQuery): Promise<OrderViewDTO[]> {
    const orders = await this.readRepo.listViews({
      customerId: query.customerId,
      take: query.take,
      skip: query.skip,
    });

    return orders;
  }
}
