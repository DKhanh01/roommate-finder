import { IsOptional, IsString, IsInt, IsBoolean, IsNumber } from "class-validator";

export class UpdateProfileDto {

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsInt()
  budget?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsBoolean()
  smoke?: boolean;

  @IsOptional()
  @IsBoolean()
  pet?: boolean;

  @IsOptional()
  @IsBoolean()
  sleepLate?: boolean;
}
