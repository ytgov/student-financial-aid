export * from "./email-service";
export * from "./student-service";

export interface QueryStatement {
  field: string;
  fields: [];
  operator: string;
  value: any;
}

export interface SortStatement {
  field: string;
  direction: SortDirection;
}

export enum SortDirection {
  ASCENDING = "asc",
  DESCENDING = "desc",
}
