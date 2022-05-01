<template>
  <div class="page page-home">
    <div class="container">
      <header class="page-home__filters">
        <page-offers-filters @search="searchOffers($event)" />
      </header>

      <section class="page-home__inner">
        <header class="page-home__inner-header">
          <h1 class="page-home__inner-name">
            Offers list ({{ offersNumber }})
          </h1>

          <el-select
            v-model="sortingValue"
            placeholder="Sorting"
            clearable
            class="page-home__inner-sorting"
          >
            <el-option
              v-for="(item, index) in sortingList"
              :key="index"
              :label="item.label"
              :value="item"
            />
          </el-select>
        </header>

        <ul class="page-home__inner-content" v-if="offers && offers.length">
          <page-offer-card
            v-for="offer in offers"
            :key="offer.id"
            :offer="offer"
            class="page-home__inner-card"
          />
        </ul>

        <div class="page-home__inner-pagination" v-if="offers && offers.length">
          <el-pagination
            layout="prev, pager, next"
            :total="offersNumber"
            :page-count="totalPages"
            @current-change="setPage($event)"
          />
        </div>

        <p
          class="page-home__inner-no-offers"
          v-if="!offers || offers.length === 0 || error"
        >
          Sorry you have not found any offer. Please reset filters
        </p>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import offer from '@/api/services/offer';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { ElLoading } from 'element-plus';
import { sortingList } from '@/data/filters';
import { prepareParamsQuery } from '@/helpers/filters';
import { FiltrationDetails } from '@/types/Filters';

// Components
import PageOffersFilters from '@/components/Page/PageOffersFilters/PageOffersFilters.vue';
import PageOfferCard from '@/components/Page/PageOfferCard/PageOfferCard.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PageHome',
  components: {
    PageOfferCard,
    PageOffersFilters,
  },
  setup() {
    const router = useRouter();
    const offers = ref();
    const offersNumber = ref(0);
    const error = ref(null);
    const sortingValue = ref();
    const sortingParams = ref();
    const totalPages = ref(0);
    const perPage = ref(0);
    const finalDetailsQuery = ref();

    watch(
      () => sortingValue.value,
      (value) => {
        const { order, field }: { order: string; field: string } = value;

        sortingParams.value = {
          sortingOrder: order,
          sortingField: field,
        };
      },
    );

    const setPage = (page: number): void => {
      searchOffers({ page });
    };
    const setParamsToLink = (params: FiltrationDetails): void => {
      router.push({
        path: '',
        query: {
          ...params,
        },
      });
    };

    const searchOffers = async (details: FiltrationDetails): Promise<void> => {
      finalDetailsQuery.value = { ...finalDetailsQuery.value, ...details };

      const loading = ElLoading.service({
        lock: true,
        background: '#ffffff',
      });

      const queryParams: string = prepareParamsQuery({
        ...finalDetailsQuery.value,
        ...sortingParams.value,
      });

      try {
        const { data } = await offer.getAllOffers(queryParams);
        offers.value = data.data;
        offersNumber.value = data.totalCount;
        totalPages.value = data.totalPages;
        perPage.value = data.limit;

        setParamsToLink({
          ...finalDetailsQuery.value,
          ...sortingParams.value,
        });
      } catch (err) {
        error.value = err;
        offers.value = [];
        offersNumber.value = 0;
      } finally {
        loading.close();
      }
    };

    onMounted(async () => {
      searchOffers({});
    });

    return {
      offers,
      error,
      offersNumber,
      sortingValue,
      sortingList,
      totalPages,
      finalDetailsQuery,
      perPage,
      searchOffers,
      setPage,
    };
  },
});
</script>

<style lang="scss" src="./Home.scss" />
