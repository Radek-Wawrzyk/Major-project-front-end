<template>
  <li class="page-offer">
    
  </li>
</template>

<script lang="ts">
import { Offer } from '@/types/Offer';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'PageOfferCard',
  props: {
    props: {
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
