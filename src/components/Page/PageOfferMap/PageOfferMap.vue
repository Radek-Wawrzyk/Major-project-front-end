<template>
  <div id="map" class="offer-map" ref="mapRef" v-if="!error"/>
  <p class="offer-map__not-found" v-else>
    Sorry but the offer's localization has not been found (No map)
  </p>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import { loadScript } from '@/helpers/others';
import config from 'config';

export default defineComponent({
  name: 'PageOfferMap',
  props: {
    address: {
      type: String as PropType<string>,
      required: true,
    },
    options: {
      type: Object as PropType<google.maps.MapOptions>,
      required: false,
      default: () => ({
        zoom: 10,
      }),
    },
  },
  setup(props) {
    const map = ref();
    const mapRef = ref();
    const geocoder = ref();
    const marker = ref();
    const error = ref(null);

    watch(() => props.address, () => { 
      findCoordinates(props.address);
    });

    const setupMap = () => {
      map.value = new google.maps.Map(mapRef.value, props.options);
      geocoder.value = new google.maps.Geocoder();

      findCoordinates(props.address);

      marker.value = new google.maps.Marker({
        map: map.value
      });
    };

    const findCoordinates = async (address: string) => {
      try {
        const { results } = await geocoder.value.geocode({ address });

        map.value.setCenter(results[0].geometry.location);
        marker.value.setPosition(results[0].geometry.location);
        error.value = null;
      } catch (err) {
        error.value = err;
      }
    };

    onMounted(async () => {
      try {
        await loadScript(
          `${config.google.mapUrl}/js?key=${config.google.mapApi}&libraries=geocoder`,
          true,
          'google-maps-api'
        );

        setupMap();
      } catch (error) {
        error.value = error;
      }
    });

    return {
      error,
      map,
      mapRef,
      geocoder,
    };
  },
});
</script>

<style lang="scss" src="./PageOfferMap.scss" />
