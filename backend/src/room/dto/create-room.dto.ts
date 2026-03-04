export class CreateRoomDto {
  title: string;
  description?: string;
  price: number;

  location: string;
  latitude: number;
  longitude: number;

  images: string[];
}
