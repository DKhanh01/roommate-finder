export class UpdateRoomDto {
  title?: string;
  description?: string;
  price?: number;

  location?: string;
  latitude?: number;
  longitude?: number;
  
  images?: string[];
  isActive?: boolean;
  isRenting?: boolean;

  minStay?: number;
  maxStay?: number;
  furnished?: boolean;
  aircon?: boolean;
  parking?: boolean;
}
