export class CreateRoomDto {
  title!: string;
  description?: string;
  price!: number;

  location!: string;
  latitude!: number | null;
  longitude!: number | null;

  images!: string[];

  furnished?: boolean;
  aircon?: boolean;
  parking?: boolean;

  minStay?: number | null;
  maxStay?: number | null;
}