type BuildingType = 'Apartment' | 'House' | 'Studio';
type BuildingAge = 'Old' | 'New';
type BuildingLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface OfferFilters {
  city?: undefined | string;
  price_min: undefined | number;
  price_max: undefined | number;
  living_area_min: undefined | number;
  building_type: undefined | BuildingType;
  rooms_number: undefined | number;
}

interface MainOfferFilters {
  location_city?: undefined | string;
  price_min?: undefined | number;
  price_max?: undefined | number;
  living_area_min?: undefined | number;
  building_type: undefined | BuildingType;
  building_level: undefined | number;
  living_area_min?: undefined | number;
  living_area_min?: undefined | number;
  includes_internet: undefined | boolean;
  rooms_number: undefined | number;
}

interface AllOfferFilters {
  building_age: undefined | BuildingAge;
  building_type: undefined | BuildingType;
  building_level: undefined | number;
  includes_air_conditioning: undefined | boolean;
  includes_balcony: undefined | boolean
  includes_basement: undefined | boolean;
  includes_garage: undefined | boolean;
  includes_garden: undefined | boolean
  includes_house_phone: undefined | boolean;
  includes_internet: undefined | boolean;
  includes_lift: undefined | boolean;
  includes_parking_space: undefined | boolean
  includes_smoke_detectors: undefined | boolean
  includes_tv: undefined | boolean
  includes_washing_machine: undefined | boolean
  living_area_min?: undefined | number;
  location_city?: undefined | string;
  price_min?: undefined | number;
  price_max?: undefined | number;
  rooms_number: undefined | number;
  rule_no_animals: undefined |boolean;
  rule_no_smokers: undefined | boolean  
}

interface AnyFilterObject {
  [key: string]: any;
}

interface SortingItem {
  label: string;
  value: string;
  order: 'DESC' | 'ASC';
  field: string;
}

interface FiltrationDetails {
  [key: string]: any;
}

interface CloseFilterEmit {
  syncFilters: boolean;
  filters: AllOfferFilters;
}

export {
  OfferFilters,
  MainOfferFilters,
  AllOfferFilters,
  BuildingType,
  BuildingAge,
  BuildingLevel,
  AnyFilterObject,
  SortingItem,
  FiltrationDetails,
  CloseFilterEmit,
};
