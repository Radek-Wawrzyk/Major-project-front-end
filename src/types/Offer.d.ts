import { User } from "./User";

interface OfferGallery {
  id: number;
  is_primary: boolean;
  name: string;
  url: string;
}

interface Offer {
  author: User;
  authorId: number;
  building_age: string;
  building_level: number;
  building_type: string;
  created_at: Date;
  description: string;
  id: number;
  includes_air_conditioning: boolean;
  includes_balcony: boolean
  includes_basement: boolean;
  includes_garage: boolean;
  includes_garden: boolean
  includes_house_phone: boolean;
  includes_internet: boolean;
  includes_lift: boolean;
  includes_parking_space: boolean
  includes_smoke_detectors: boolean
  includes_tv: boolean
  includes_washing_machine: boolean
  living_area:30
  location_city: string;
  location_country: string;
  location_district: string;
  location_latidude: number;
  location_longitude: number;
  name: string;
  photos: OfferGallery[];
  price: number;
  published_date: Date;
  rooms_number: number;
  rule_no_animals: boolean;
  rule_no_smokers: boolean
  status: boolean;
  updated_at: Date;
}

export {
  Offer,
  OfferGallery,
};
