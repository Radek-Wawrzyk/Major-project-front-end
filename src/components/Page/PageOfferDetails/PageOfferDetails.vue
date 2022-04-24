<template>
  <section class="offer-details">
    <header class="offer-details__main">
      <h1 class="offer-details__main-name">
        {{ offer.name }}
      </h1>

      <h2 class="offer-details__main-price">
        {{ formatPrice(offer.price) }} (per month)
      </h2>
    </header>
    

    <p class="offer-details__location">
      <span v-html="locationIcon" class="offer-details__location-icon" />
      {{ fullLocation }}
    </p>

    <ul class="offer-details__list offer-details__list--main">
      <li class="offer-details__list-item">
        <p class="offer-details__list-label">
          <span class="offer-details__list-icon" v-html="roomsIcon" />
          Rooms
        </p>

        <p class="offer-details__list-value">
          {{ offer.rooms_number }}
        </p>
      </li>

      <li class="offer-details__list-item">
        <p class="offer-details__list-label">
          <span class="offer-details__list-icon" v-html="depositIcon" />
          deposit
        </p>

        <p class="offer-details__list-value">
          {{ offer.price }}
        </p>
      </li>

      <li class="offer-details__list-item">
        <p class="offer-details__list-label">
          <span class="offer-details__list-icon" v-html="floorIcon" />
          Floor
        </p>

        <p class="offer-details__list-value">
          {{ offer.building_level }}
        </p>
      </li>

      <li class="offer-details__list-item">
        <p class="offer-details__list-label">
          <span class="offer-details__list-icon" v-html="buildingIcon" />
          Building type
        </p>

        <p class="offer-details__list-value">
          {{ offer.building_type }}
        </p>
      </li>

      <li class="offer-details__list-item">
        <p class="offer-details__list-label">
          <span class="offer-details__list-icon" v-html="livingAreaIcon" />
          Living area
        </p>

        <p class="offer-details__list-value">
          {{ offer.living_area }} (m2)
        </p>
      </li>

      <li class="offer-details__list-item">
        <p class="offer-details__list-label">
          <span class="offer-details__list-icon" v-html="internetIcon" />
          Internet (WiFi)
        </p>

        <p class="offer-details__list-value">
          {{ offer.includes_internet }}
        </p>
      </li>
    </ul>

    <div class="offer-details__row">
      <h3 class="offer-details__row-heading">
        Description
      </h3>

      <p class="offer-details__description" v-html="offer.description" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { Offer } from '@/types/Offer';
import { formatPrice } from '@/helpers/price';
import { getMainList } from '@/helpers/offer';

// Icons
import locationIcon from '@/assets/icons/location.svg?raw';
import buildingIcon from '@/assets/icons/building.svg?raw';
import depositIcon from '@/assets/icons/deposit.svg?raw';
import floorIcon from '@/assets/icons/floor.svg?raw';
import internetIcon from '@/assets/icons/internet.svg?raw';
import livingAreaIcon from '@/assets/icons/living-area.svg?raw';
import roomsIcon from '@/assets/icons/rooms.svg?raw';

export default defineComponent({
  name: 'PageOfferDetails',
  props: {
    offer: {
      type: Object as PropType<Offer>,
      required: true,
    },
  },
  setup(props) {
    const fullLocation = computed(() => {
      return `${props.offer.location_district}, ${props.offer.location_city}, ${props.offer.location_country}`
    });
    const mainInformationList = computed(() => {
      return getMainList(props.offer);
    });
    const additionalInformationList = computed(() => {

    });

    return {
      fullLocation,
      locationIcon,
      mainInformationList,
      additionalInformationList,
      roomsIcon,
      livingAreaIcon,
      internetIcon,
      floorIcon,
      depositIcon,
      buildingIcon,
      formatPrice,
    };
  },
});
</script>

<style lang="scss" src="./PageOfferDetails.scss" />
