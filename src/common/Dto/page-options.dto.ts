export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

export class PageOptionsDto {
  limit?: number = 50;
  page?: number = 1;
  q?: string;
  order?: Order = Order.DESC;

  get offset() {
    return ((this.page || 1) - 1) * (this.limit || 50);
  }
}
