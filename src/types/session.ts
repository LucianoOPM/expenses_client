export type Session = {
  user: {
    sub: number;
    username: string;
    role: string;
  };
  accessToken: string;
  // refreshToken: string;
};
