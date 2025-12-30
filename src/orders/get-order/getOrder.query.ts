import { Query } from "../../query";

export type GetOrderQuery = Query & {
  type: "GetOrder";
  id: string;
};
