<template>
  <div class="page page-home">
    <div class="container">
      <header class="page-home__filters">
        <page-offers-filters @search="searchOffers($event)" />
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
          <page-offer-card 
            v-for="offer in offers" 
            :key="offer.id"
            :offer="offer"
            class="page-home__inner-card"
          />
        </ul>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import offer from '@/api/services/offer';
import { defineComponent, onMounted, ref } from 'vue'
import { ElLoading } from 'element-plus';

// Components
import PageOffersFilters from '@/components/Page/PageOffersFilters/PageOffersFilters.vue';
import PageOfferCard from '@/components/Page/PageOfferCard/PageOfferCard.vue';
import { Offer } from '@/types/Offer';

export default defineComponent({
  name: 'PageHome',
  components: {
    PageOfferCard,
    PageOffersFilters,
  },
  setup() {
    const offers = ref();
    const error = ref(null);

    const searchOffers = async (queryParams: string = ''): Promise<void> => {
      const loading = ElLoading.service({
        lock: true,
        background: "#ffffff",
      });

      try {
        const { data } = await offer.getAllOffers(queryParams);
        offers.value = data.data;
      } catch (err) {
        error.value = err;
      } finally {
        loading.close();
      }
    };

    onMounted(async () => {
      searchOffers();
    });

    return {
      offers,
      error,
      searchOffers,
    }
  },
})
</script>

<style lang="scss" src="./Home.scss" />
