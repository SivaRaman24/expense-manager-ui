export interface Category {
  id?: string;
  name: string;
  description?: string;
  isDefault: boolean;
  userId?: string;
  parentCategoryId?: string;
}

export interface CategoryEvent {
  id?: string;
  action: string;
}
