<template>
  <li class="offer-card">
    <figure class="offer-card__image">
      <img
        v-if="hasImages && primaryImage"
        :alt="offer.name"
        :src="getImagePath(primaryImage.url)"
        class="offer-card__image-inner"
      />

      <img
        v-else
        :alt="offer.name"
        src="@/assets/images/placeholder-photo.jpeg"
        class="offer-card__image-inner"
      />

      <app-fav-button 
        :offer-id="offer.id" 
        class="offer-card__image-fav-button"
        mode="icon"
      />
    </figure>

    <div class="offer-card__details">
      <router-link 
        :to="`/offers/${offer.id}`"
        aria-label="Go to the offer page"
        title="Go to the offer page"
        class="offer-card__details-name"
      >
        {{ offer.name }}
      </router-link>

      <p class="offer-card__details-location">
        <span v-html="locationIcon" class="offer-card__details-location-icon" />
        {{ fullLocation }}
      </p>

      <h4 class="offer-card__details-price">
        {{ formatPrice(offer.price )}} 
        <span class="offer-card__details-price-text">
          / per month
        </span>
        
      </h4>

      <app-fav-button 
        :offer-id="offer.id" 
        class="offer-card__details-fav-button"
        mode="icon"
      />

      <ul class="offer-card-list">
        <li class="offer-card-list__item">
          <span class="offer-card-list__item-icon" v-html="roomsIcon" />
          <p class="offer-card-list__item-text">
            Rooms {{ offer.rooms_number }}
          </p>
        </li>

        <li class="offer-card-list__item">
          <span class="offer-card-list__item-icon" v-html="livingAreaIcon" />
          <p class="offer-card-list__item-text">
            Living area {{ offer.living_area }} (m2)
          </p>
        </li>

        <li class="offer-card-list__item">
          <span class="offer-card-list__item-icon" v-html="depositIcon" />
          <p class="offer-card-list__item-text">
            Deposit {{ formatPrice(offer.deposit) }}
          </p>
        </li>

        <li class="offer-card-list__item">
          <span class="offer-card-list__item-icon" v-html="internetIcon" />
          <p class="offer-card-list__item-text">
            Internet {{ offer.includes_internet ? 'Yes' : 'No' }}
          </p>
        </li>
      </ul>

      <router-link 
        :to="`/offers/${offer.id}`"
        aria-label="Go to the offer page"
        title="Go to the offer page"
        class="el-button el-button--primary el-button--large offer-card__details-mobile-link"
      >
        {{ offer.name }}
      </router-link>
    </div>
  </li>
</template>

<script lang="ts">
import { Offer } from '@/types/Offer';
import { formatPrice } from '@/helpers/price';
import { defineComponent, PropType, computed } from 'vue';
import AppFavButton from '@/components/Global/AppFavButton/AppFavButton.vue';
import { getImagePath } from '@/helpers/images';

// Icons
import locationIcon from '@/assets/icons/location.svg?raw';
import depositIcon from '@/assets/icons/deposit.svg?raw';
import roomsIcon from '@/assets/icons/rooms.svg?raw';
import livingAreaIcon from '@/assets/icons/living-area.svg?raw';
import internetIcon from '@/assets/icons/internet.svg?raw';

export default defineComponent({
  name: 'PageOfferCard',
  components: { AppFavButton },
  props: {
    offer: {
      type: Object as PropType<Offer>,
      required: true,
    },
  },
  setup(props) {
    const fullLocation = computed(() => {
      return `${props.offer.location_street}, ${props.offer.location_city}, ${props.offer.location_post_code}, ${props.offer.location_country}`
    });

    const primaryImage = computed(() => {
      if (!hasImages.value) return undefined;
      return props.offer.photos.find((photo) => photo.is_primary);
    });
  
    const hasImages = computed(() => props.offer.photos && props.offer.photos.length !== 0);

    return {
      fullLocation,
      locationIcon,
      internetIcon,
      depositIcon,
      roomsIcon,
      livingAreaIcon,
      hasImages,
      primaryImage,
      formatPrice,
      getImagePath,
    };
  },
});
</script>

<style lang="scss" src="./PageOfferCard.scss" />
