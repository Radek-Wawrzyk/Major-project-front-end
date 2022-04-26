<template>
  <li class="offer-card">
    <router-link :to="`/offers/${offer.id}`">
      {{ offer.name }}
    </router-link>
  </li>
</template>

<script lang="ts">
import { Offer } from '@/types/Offer';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'PageOfferCard',
  props: {
    offer: {
      type: Object as PropType<Offer>,
      required: true,
    },
  },
  setup() {
    
    return {

    };
  },
});
</script>

<style lang="scss" src="./PageOfferCard.scss" />
