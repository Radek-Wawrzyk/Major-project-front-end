type BuildingType = 'Apartment' | 'House' | 'Studio';
type BuildingAge = 'Old' | 'New';

interface OfferFilters {
  city?: undefined | string,
  price_min: undefined | number,
  price_max: undefined | number,
  living_area_min: undefined | number,
  building_type: undefined | BuildingType,
  rooms_number: undefined | number,
}

interface MainOfferFilters {
  location_city?: undefined | string,
  price_min?: undefined | number,
  price_max?: undefined | number,
  living_area_min?: undefined | number,
  building_type: undefined | BuildingType,
  building_level: undefined | number,
  living_area_min?: undefined | number,
  living_area_min?: undefined | number,
  includes_internet: undefined | boolean,
  rooms_number: undefined | number,
}

interface AnyFilterObject {
  [key: string]: any;
}

export {
  OfferFilters,
  MainOfferFilters,
  BuildingType,
  BuildingAge,
  AnyFilterObject,
};
