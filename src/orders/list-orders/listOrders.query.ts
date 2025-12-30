import { Query } from "../../query";

export type ListOrdersQuery = Query & {
  type: "ListOrders";
  customerId?: string;
  take?: number;
  skip?: number;
};
