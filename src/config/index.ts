const config = {
  api: {
    baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
  },
  google: {
    mapApi: import.meta.env.VITE_APP_GOOGLE_MAPS_API,
    mapUrl: 'https://maps.googleapis.com/maps/api',
  },
};

export default config;
