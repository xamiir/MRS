export interface IDriver {
  id: number;
  name: string;
  image_url: string | null;
  mobile_number: string;
  origin_location: string | null;
  current_location: string | null;
  mother_name: string | null;
  mother_contact: string | null;
  father_name: string | null;
  father_contact: string | null;
  settling_home_details: string | null;
  fingerprint_data: string | null;
}

export interface IDriverDTO {
  mobile_number: string;
  name: string;
  current_location?: string;
  father_name?: string;
  mother_name?: string;
}
