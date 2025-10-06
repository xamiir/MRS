export interface IOwner {
  id: number;
  name: string;
  mobile_number: string;
  image_url: string | null;
  motorcycles: IMotorcycle[];
}

export interface IOwnerDTO {
  mobile_number: string;
  name: string;
  motorcycles?: {
    plate_number: string;
    chassis_number: string;
    motorcycle_category?: string;
    registration_date?: string;
    motorcycle_image_url?: string;
  }[];
}

export interface IMotorcycle {
  id: number;
  plate_number: string;
  chassis_number: string;
  owner_id: number | null;
  motorcycle_image_url: string | null;
  motorcycle_category: string | null;
  registration_date: string | null;
}
