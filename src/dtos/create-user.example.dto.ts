export interface CreateUserExampleDTO {
  name: string;
  email: string;
  password?: string;
  level: number;
  active: boolean;
}

export interface CreateUserExampleResponseDTO {
  id: number;
  name: string;
  email: string;
  active: boolean;
  permissionLevel: number;
  createdAt: string;
}
