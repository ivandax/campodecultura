export type AppUser = CreateAppUserData & {
  id: string;
  emailVerified: boolean;
};

export type CreateAppUserData = {
  email: string;
  name: string;
  createdOn: number;
  role: 'ADMIN' | 'STANDARD';
};
