export interface User {
  email: string;
  sub: string;
  first_name: string;
  last_name: string;
  status: string;
  create_date: Date;

  display_name?: string;
}
