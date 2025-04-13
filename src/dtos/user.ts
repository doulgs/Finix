export interface CreateUserDTO {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  image?: string;
  role?: string;
  isActive?: number;
  documentNumber?: string;
  language?: string;
  theme?: string;
  pushToken?: string;
  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  acceptedTermsAt?: string;
  webSyncId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserDTO {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  image?: string;
  role?: string;
  isActive?: number;
  documentNumber?: string;
  language?: string;
  theme?: string;
  pushToken?: string;
  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  acceptedTermsAt?: string;
  webSyncId?: string;
  createdAt?: string;
  updatedAt?: string;
}
