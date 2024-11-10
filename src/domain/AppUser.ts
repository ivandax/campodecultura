export type AppUser = CreateAppUserData & { id: string };

export type CreateAppUserData = {
  email: string;
  name: string;
  verified: boolean;
  createdOn: number;
  role: "ADMIN" | "STANDARD"
};
