import { CarListOrderByEnum } from "../enums/car-list-order-by.enum";
import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";

export interface IPaginatorResponse<T> {
  data: T[];
  total: number;
  orderBy: UserListOrderByEnum | CarListOrderByEnum;
  order: string;
  limit: number;
  page: number;
}
