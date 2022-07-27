export type UserMetadata = {
  full_name?: string;
};

export type User = {
  id: string;
  email?: string;
  user_metadata?: UserMetadata;
};
