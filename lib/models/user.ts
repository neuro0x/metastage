export interface User {
  data: {
    id: number;
    attributes: {
      blocked: boolean;
      confirmed: boolean;
      createdAt: Date;
      email: string;
      ethereumAddress: string;
      provider: string;
      solanaAddress: string;
      updatedAt: Date;
      username: string;
    };
  };
}
