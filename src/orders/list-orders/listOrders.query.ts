import type { Query } from "../../query.ts";

export type ListOrdersQuery = Query & {
  type: "ListOrders";
  customerId?: string;
  take?: number;
  skip?: number;
};
