export type AppUser = {
  id: string;
  email: string;
  name: string;
  verified: boolean;
  createdOn: number;
};

export type CreateAppUserData = {
  email: string;
  name: string;
  verified: boolean;
  createdOn: number;
};
