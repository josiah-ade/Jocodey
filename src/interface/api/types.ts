import { GetContactResDto } from "@/services/contact/dto/get-contacts-res.dto";
import { GetUsersResDto } from "@/services/users/dto/get-users.dto";

export type PaginationMeta = {
  totalRecords: number;
  totalPages: number;
  nextPage: number;
  currentPage: number;
  previousPage: number;
};

export type GetContactDataProps = PaginationMeta & {
  data: GetContactResDto[];
};

export type GetUserDataProps = PaginationMeta & {
  data: GetUsersResDto[];
};
