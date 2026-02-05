import { Expose } from "class-transformer";

export class ContactStatusGroupDto {
  @Expose()
  status!: string;

  @Expose()
  total!: number;
}

export class GetContactStatsResDto {
  @Expose()
  year!: number;

  @Expose()
  allTimeContacts!: number;

  @Expose()
  todayContacts!: number;

  @Expose()
  chartData!: { month: string; total: number }[];

  @Expose()
  allTimeStatus!: ContactStatusGroupDto[];

  @Expose()
  todayStatus!: ContactStatusGroupDto[];
}
