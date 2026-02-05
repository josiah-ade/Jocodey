import { Expose } from "class-transformer";
import type { Uuid } from "@/common/types/common.types";

export class GetContactResDto {
  @Expose()
  id!: Uuid;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  phone?: string;

  @Expose()
  subject!: string;

  @Expose()
  message!: string;

  @Expose()
  createdAt!: Date;
}
