interface OfferFilters {
  city?: undefined | string,
  price_min: undefined | number,
  price_max: undefined | number,
  living_area_min: undefined | number,
  building_type: undefined | 'apartment' | 'house' | 'studio',
  rooms_number: undefined | number,
}

export {
  OfferFilters,
};
