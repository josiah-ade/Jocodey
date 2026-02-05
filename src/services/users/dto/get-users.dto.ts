import { Exclude, Expose } from "class-transformer";

@Exclude()
export class GetUsersResDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  phoneNumber?: string;

  @Expose()
  gender?: string;

  @Expose()
  role?: string;
}
