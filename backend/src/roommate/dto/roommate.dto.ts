import { IsOptional, IsString, IsBoolean } from "class-validator";
import { Transform } from "class-transformer";

export class RoommateQueryDto {
  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  ageRange?: string;

  @IsOptional()
  @IsString()
  budgetRange?: string;

  @IsOptional()
  @Transform(({ value }) => value === "true")
  smoke?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === "true")
  pet?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === "true")
  sleepLate?: boolean;

  @IsOptional()
  limit?: string;
  
  @IsOptional()
  page?: number;

}