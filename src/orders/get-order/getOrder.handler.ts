import type { QueryHandler } from "../../query.ts";
import type { OrderReadRepo, OrderViewDTO } from "../orderReadRepo.ts";
import type { GetOrderQuery } from "./getOrder.query.ts";

export class GetOrderHandler implements QueryHandler<
  GetOrderQuery,
  OrderViewDTO
> {
  type: GetOrderQuery["type"] = "GetOrder";

  private readRepo: OrderReadRepo;

  constructor(readRepo: OrderReadRepo) {
    this.readRepo = readRepo;
  }

  async execute(query: GetOrderQuery): Promise<OrderViewDTO> {
    const order = await this.readRepo.getViewById(query.id);

    return order ?? ({} as OrderViewDTO);
  }
}
