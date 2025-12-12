export type AppUser = CreateAppUserData & {
  id: string;
  emailVerified: boolean;
  token: string;
};

export type CreateAppUserData = {
  email: string;
  name: string;
  createdOn: number;
  role: 'ADMIN' | 'STANDARD' | 'DEV';
  preferences: {
    language: 'en' | 'es' | 'fr' | null;
  };
};
