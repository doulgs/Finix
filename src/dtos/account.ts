export interface CreateAccountDTO {
  name: string;
  alias?: string;
  type: string;
  bank?: string;
  agency?: string;
  number?: string;
  longDescription?: string;
  color?: string;
  icon?: string;
  iconFont?: string;
  emoji?: string;
  balance?: number;
  initialBalance?: number;
  creditLimit?: number;
  currency?: string;
  isFavorite?: number;
  isIncludedInTotal?: number;
  isArchived?: number;
  order?: number;
  userId?: string;
  webSyncId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateAccountDTO {
  name?: string;
  alias?: string;
  type?: string;
  bank?: string;
  agency?: string;
  number?: string;
  longDescription?: string;
  color?: string;
  icon?: string;
  iconFont?: string;
  emoji?: string;
  balance?: number;
  initialBalance?: number;
  creditLimit?: number;
  currency?: string;
  isFavorite?: number;
  isIncludedInTotal?: number;
  isArchived?: number;
  order?: number;
  userId?: string;
  webSyncId?: string;
  createdAt?: string;
  updatedAt?: string;
}
