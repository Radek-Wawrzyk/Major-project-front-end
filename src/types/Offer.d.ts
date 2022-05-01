import { User } from './User';

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
  includes_balcony: boolean;
  includes_basement: boolean;
  includes_garage: boolean;
  includes_garden: boolean;
  includes_house_phone: boolean;
  includes_internet: boolean;
  includes_lift: boolean;
  includes_parking_space: boolean;
  includes_smoke_detectors: boolean;
  includes_tv: boolean;
  includes_washing_machine: boolean;
  living_area: number;
  location_city: string;
  location_country: string;
  location_street: string;
  location_post_code: string;
  location_latidude: number;
  location_longitude: number;
  name: string;
  photos: OfferGallery[];
  price: number;
  deposit: number;
  published_date: Date;
  rooms_number: number;
  rule_no_animals: boolean;
  rule_no_smokers: boolean;
  status: boolean;
  updated_at: Date;
}

interface FavoriteOffer {
  id: number;
  added_at: Date;
  id: number;
  offerId: number;
  userId: number;
}

interface FullFavOffer extends FavoriteOffer {
  offer: Offer;
}

interface CreateOffer {
  id?: number;
  authorId?: number;
  created_at?: Date;
  updated_at?: Date;
  building_age: string;
  building_level: number;
  building_type: string;
  includes_air_conditioning: boolean;
  includes_balcony: boolean;
  includes_basement: boolean;
  includes_garage: boolean;
  includes_garden: boolean;
  includes_house_phone: boolean;
  includes_internet: boolean;
  includes_lift: boolean;
  includes_parking_space: boolean;
  includes_smoke_detectors: boolean;
  includes_tv: boolean;
  includes_washing_machine: boolean;
  living_area: number;
  location_city: string;
  location_country: string;
  location_street: string;
  location_post_code: string;
  description: string;
  name: string;
  deposit: number;
  rooms_number: number;
  rule_no_animals: boolean;
  rule_no_smokers: boolean;
  status?: boolean;
  price: number;
}

export { Offer, CreateOffer, OfferGallery, FavoriteOffer, FullFavOffer };
