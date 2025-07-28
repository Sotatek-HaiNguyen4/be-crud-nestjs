import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum CategoryType {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsEnum(CategoryType)
  type: CategoryType;
}
