<template>
  <div class="page page-home">
    <div class="container">
      <header class="page-home__filters">
        <page-offers-filters @search-offers="searchOffers($event)" />
      </header>

      <section class="page-home__inner">
        <header class="page-home__inner-header">
          <h1 class="page-home__inner-name">
            Offers list
          </h1>

          <span class="page-home__inner-sorting">
            sorting
          </span>
        </header>

        <ul class="page-home__inner-content" v-if="offers && offers.length">
          <li v-for="offer in offers" :key="offer.id">
            <router-link :to="`/offers/${offer.id}`">
              {{ offer.name }}
            </router-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import offer from '@/api/services/offer';
import { defineComponent, ref } from 'vue'

// Components
import PageOffersFilters from '@/components/Page/PageOffersFilters/PageOffersFilters.vue';
import PageOfferCard from '@/components/Page/PageOfferCard/PageOfferCard.vue';

export default defineComponent({
  name: 'PageHome',
  components: {
    PageOfferCard,
    PageOffersFilters,
  },
  setup() {
    const loading = ref(false);
    const offers = ref([]);
    const error = ref(null);

    const searchOffers = (payload: any) => {

    };

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
      searchOffers,
    }
  },
})
</script>

<style lang="scss" src="./Home.scss" />
