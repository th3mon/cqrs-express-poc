import { QueryHandler } from "../../query";
import { OrderReadRepo, OrderViewDTO } from "../orderReadRepo";
import { GetOrderQuery } from "./getOrder.query";

export class GetOrderHandler implements QueryHandler<
  GetOrderQuery,
  OrderViewDTO
> {
  type: GetOrderQuery["type"] = "GetOrder";

  constructor(private readRepo: OrderReadRepo) {}

  async execute(query: GetOrderQuery): Promise<OrderViewDTO> {
    const order = await this.readRepo.getViewById(query.id);

    return order;
  }
}
