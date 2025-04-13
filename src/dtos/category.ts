export interface CreateCategoryDTO {
  name: string;
  type?: string;
  description?: string;
  longDescription?: string;
  color?: string;
  icon?: string;
  iconFont?: string;
  emoji?: string;
  alias?: string;
  parentId?: string;
  group?: string;
  order?: number;
  isFixed?: number;
  isEditable?: number;
  isFavorite?: number;
  isVisible?: number;
  webSyncId?: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  type?: string;
  description?: string;
  longDescription?: string;
  color?: string;
  icon?: string;
  iconFont?: string;
  emoji?: string;
  alias?: string;
  parentId?: string;
  group?: string;
  order?: number;
  isFixed?: number;
  isEditable?: number;
  isFavorite?: number;
  isVisible?: number;
  webSyncId?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}
