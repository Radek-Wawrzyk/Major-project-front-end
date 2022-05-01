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
          {{ formatPrice(offer.deposit) }}
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

        <p class="offer-details__list-value">{{ offer.living_area }} (m2)</p>
      </li>

      <li class="offer-details__list-item">
        <p class="offer-details__list-label">
          <span class="offer-details__list-icon" v-html="internetIcon" />
          Internet (WiFi)
        </p>

        <p class="offer-details__list-value">
          {{ offer.includes_internet ? 'Yes' : 'No' }}
        </p>
      </li>
    </ul>

    <div class="offer-details__row">
      <h3 class="offer-details__row-heading">Description</h3>

      <p class="offer-details__description" v-html="offer.description" />
    </div>

    <div class="offer-details__row">
      <h3 class="offer-details__row-heading">Additional information</h3>

      <ul class="offer-details__list offer-details__list--additional">
        <li class="offer-details__list-item">
          <p class="offer-details__list-label">Building Age</p>

          <p class="offer-details__list-value">
            {{ offer.building_age }}
          </p>
        </li>

        <li class="offer-details__list-item">
          <p class="offer-details__list-label">Parking Space</p>

          <p class="offer-details__list-value">
            {{ offer.includes_parking_space ? 'Yes' : 'No' }}
          </p>
        </li>

        <li class="offer-details__list-item">
          <p class="offer-details__list-label">Television</p>

          <p class="offer-details__list-value">
            {{ offer.includes_tv ? 'Yes' : 'No' }}
          </p>
        </li>

        <li class="offer-details__list-item">
          <p class="offer-details__list-label">Garage</p>

          <p class="offer-details__list-value">
            {{ offer.includes_garage ? 'Yes' : 'No' }}
          </p>
        </li>

        <li class="offer-details__list-item">
          <p class="offer-details__list-label">Parking Space</p>

          <p class="offer-details__list-value">
            {{ offer.includes_garage ? 'Yes' : 'No' }}
          </p>
        </li>

        <li class="offer-details__list-item">
          <p class="offer-details__list-label">Lift</p>

          <p class="offer-details__list-value">
            {{ offer.includes_lift ? 'Yes' : 'No' }}
          </p>
        </li>

        <li class="offer-details__list-item">
          <p class="offer-details__list-label">Air Conditioning</p>

          <p class="offer-details__list-value">
            {{ offer.includes_air_conditioning ? 'Yes' : 'No' }}
          </p>
        </li>

        <li class="offer-details__list-item">
          <p class="offer-details__list-label">House Phone</p>

          <p class="offer-details__list-value">
            {{ offer.includes_house_phone ? 'Yes' : 'No' }}
          </p>
        </li>

        <li class="offer-details__list-item">
          <p class="offer-details__list-label">Balcony</p>

          <p class="offer-details__list-value">
            {{ offer.includes_balcony ? 'Yes' : 'No' }}
          </p>
        </li>

        <li class="offer-details__list-item">
          <p class="offer-details__list-label">Basement</p>

          <p class="offer-details__list-value">
            {{ offer.includes_basement ? 'Yes' : 'No' }}
          </p>
        </li>

        <li class="offer-details__list-item">
          <p class="offer-details__list-label">Washing Machine</p>

          <p class="offer-details__list-value">
            {{ offer.includes_washing_machine ? 'Yes' : 'No' }}
          </p>
        </li>

        <li class="offer-details__list-item">
          <p class="offer-details__list-label">Smoke Detectors</p>

          <p class="offer-details__list-value">
            {{ offer.includes_smoke_detectors ? 'Yes' : 'No' }}
          </p>
        </li>

        <li class="offer-details__list-item">
          <p class="offer-details__list-label">No Smokers</p>

          <p class="offer-details__list-value">
            {{ offer.rule_no_smokers ? 'Yes' : 'No' }}
          </p>
        </li>

        <li class="offer-details__list-item">
          <p class="offer-details__list-label">No Animals</p>

          <p class="offer-details__list-value">
            {{ offer.rule_no_animals ? 'Yes' : 'No' }}
          </p>
        </li>
      </ul>
    </div>

    <div class="offer-details__row">
      <h3 class="offer-details__row-heading">Address</h3>

      <div class="offer-details__row-address">
        <span v-html="locationIcon" class="offer-details__row-address-icon" />
        {{ fullLocation }}
      </div>

      <page-offer-map :address="fullLocation" :options="{ zoom: 14 }" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref } from 'vue';
import { Offer } from '@/types/Offer';
import { formatPrice } from '@/helpers/price';

// Icons
import locationIcon from '@/assets/icons/location.svg?raw';
import buildingIcon from '@/assets/icons/building.svg?raw';
import depositIcon from '@/assets/icons/deposit.svg?raw';
import floorIcon from '@/assets/icons/floor.svg?raw';
import internetIcon from '@/assets/icons/internet.svg?raw';
import livingAreaIcon from '@/assets/icons/living-area.svg?raw';
import roomsIcon from '@/assets/icons/rooms.svg?raw';

// COmponents
import PageOfferMap from '@/components/Page/PageOfferMap/PageOfferMap.vue';

export default defineComponent({
  name: 'PageOfferDetails',
  components: {
    PageOfferMap,
  },
  props: {
    offer: {
      type: Object as PropType<Offer>,
      required: true,
    },
  },
  setup(props) {
    const fullLocation = computed(() => {
      return `${props.offer.location_street}, ${props.offer.location_city}, ${props.offer.location_post_code}, ${props.offer.location_country}`;
    });

    return {
      fullLocation,
      locationIcon,
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
