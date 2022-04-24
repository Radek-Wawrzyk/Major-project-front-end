<template>
  <div class="page page-home">
    <header>
      filters would be here!
    </header>

    <ul class="page-home-offers">
      <li v-for="offer in offers" :key="offer.id">
        <router-link :to="`/offers/${offer.id}`">
          {{ offer.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import offer from '@/api/services/offer';
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PageHome',
  setup() {
    const loading = ref(false);
    const offers = ref([]);
    const error = ref(null);

    const fetchOffers = async (): Promise<void> => {
      loading.value = true;
      try {
        const { data } = await offer.getAllOffers();
        offers.value = data.data;
      } catch (error) {
        error.value = error;
      } finally {
        loading.value = false;
      }
    }

    fetchOffers();

    return {
      offers,
      error,
    }
  },
})
</script>
