<template>
  <div class="offer-page" v-if="offerDetails">
    <div class="container offer-page__inner">
      <div class="offer-page__inner-content">
        content
      </div>

      <page-offer-form  
        class="offer-page__inner-form"
        :offer-id="offerDetails.id"
        :user-id="offerDetails.authorId"
        :offer-author="offerDetails.author"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElLoading } from 'element-plus';

import offer from '@/api/services/offer';
import PageOfferForm from '@/components/Page/PageOfferForm/PageOfferForm.vue';

export default defineComponent({
  name: "PageOffer",
  components: { PageOfferForm },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const offerDetails = ref(null);
    const offerId = computed(() => route.params.id as string);

    onBeforeMount(async () => {
      const loading = ElLoading.service({
        lock: true,
        background: "#ffffff",
      });

      try {
        const { data } = await offer.getSingleOffer(offerId.value);
        offerDetails.value = data;
      }
      catch (error) {
        if (error.response.data?.statusCode === 404) router.push("/page-not-found");
      }
      finally {
        loading.close();
      }
    });

    return {
      offerDetails,
      offerId,
    };
  },
});
</script>

<style lang="scss" src="./Offer.scss" />
