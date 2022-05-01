<template>
  <div class="offer-page" v-if="loadedOffer">
    <header class="offer-page__header container">
      <el-button :icon="ArrowLeft" @click="redirectHome()">
        Back to offers
      </el-button>
    </header>

    <div class="container offer-page__inner">
      <div class="offer-page__inner-content">
        <page-offer-gallery
          class="offer-page__inner-gallery"
          :photos="offerDetails.photos"
        />

        <page-offer-details
          :offer="offerDetails"
          class="offer-page__inner-details"
        />
      </div>

      <page-offer-form
        class="offer-page__inner-form"
        :offer-id="offerDetails.id"
        :user-id="offerDetails.authorId"
        :offer-author="offerDetails.author"
      />
    </div>

    <page-offer-mobile-bar :offer="offerDetails" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElLoading } from 'element-plus';
import { ArrowLeft } from '@element-plus/icons-vue';
import offer from '@/api/services/offer';

// Components
import PageOfferForm from '@/components/Page/PageOfferForm/PageOfferForm.vue';
import PageOfferGallery from '@/components/Page/PageOfferGallery/PageOfferGallery.vue';
import PageOfferDetails from '@/components/Page/PageOfferDetails/PageOfferDetails.vue';
import PageOfferMobileBar from '@/components/Page/PageOfferMobileBar/PageOfferMobileBar.vue';

export default defineComponent({
  name: 'PageOffer',
  components: {
    PageOfferForm,
    PageOfferGallery,
    PageOfferDetails,
    PageOfferMobileBar,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const offerDetails = ref();
    const offerId = computed(() => route.params.id as string);

    const redirectHome = (): void => {
      router.push('/');
    };

    const loadedOffer = computed(
      () =>
        typeof offerDetails.value === 'object' &&
        Object.keys(offerDetails.value) &&
        Object.keys(offerDetails.value).length !== 0,
    );

    onMounted(async () => {
      const loading = ElLoading.service({
        lock: true,
        background: '#ffffff',
      });

      try {
        const { data } = await offer.getFullOffer(offerId.value);
        offerDetails.value = data;
      } catch (error) {
        if (error.response.data?.statusCode === 404)
          router.push('/page-not-found');
      } finally {
        loading.close();
      }
    });

    return {
      offerDetails,
      offerId,
      loadedOffer,
      redirectHome,
      ArrowLeft,
    };
  },
});
</script>

<style lang="scss" src="./Offer.scss" />
