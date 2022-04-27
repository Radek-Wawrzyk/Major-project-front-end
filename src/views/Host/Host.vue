<template>
  <div class="host-page" v-if="hostDetails">
    <div class="container">
      <header class="host-page__header">
        <el-button :icon="ArrowLeft" @click="redirectHome()">
          Back to offers
        </el-button>
      </header>

      <section class="host-page-details">
        <figure class="host-page-details__image">
          <app-avatar 
            :user="hostDetails" 
            :size="140"
            class="host-page-details__image-inner" 
          />
        </figure>

        <div class="host-page-details__content">
          <h1 class="host-page-details__content-name">
            {{ hostDetails.first_name }} {{ hostDetails.last_name }}
          </h1>

          <span class="host-page-details__content-joined">
            Joined at {{ joinedDate }}
          </span>

          <a 
            class="host-page-details__content-link"
            :href="`mailto:${hostDetails.email}`"
          >
            {{ hostDetails.email }}
          </a>

          <a 
            class="host-page-details__content-link"
            :href="`tel:${hostDetails.phone}`"
          >
            {{ hostDetails.phone }}
          </a>

          <p class="host-page-details__content-text"  v-html="hostDetails.bio" />
        </div>
      </section>

      <section class="host-page-offers">
        <ul class="host-page-offers__list" v-if="hostDetails.offers && hostDetails.offers.length">
          <page-offer-card 
            v-for="offer in hostDetails.offers" 
            :key="offer.id"
            :offer="offer"
            class="host-page-offers__list-card"
          />
        </ul>
        
        <p class="host-page-offers__no-offers" v-if="!hostDetails.offers || hostDetails.offers.length === 0 || error">
          Sorry you have not found any offer. Please reset filters
        </p>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { ElLoading } from 'element-plus';
import user from '@/api/services/user';
import AppAvatar from '@/components/Global/AppAvatar/AppAvatar.vue';
import PageOfferCard from '@/components/Page/PageOfferCard/PageOfferCard.vue';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'PageHost',
  components: { AppAvatar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const hostDetails = ref();
    const error = ref();
    const hostId = computed(() => route.params.id as string);
    const joinedDate = computed(() => dayjs(hostDetails.value.created_at).format('MMMM YYYY'));
    const redirectHome = (): void => {
      router.push('/');
    }

    onMounted(async () => {
      const loading = ElLoading.service({
        lock: true,
        background: "#ffffff",
      });

      try {
        const { data } = await user.getUserWithOffers(hostId.value);
        hostDetails.value = data;
      } catch (error) {
        if (error.response.data?.statusCode === 404) router.push("/page-not-found");
        error.value = error;
      } finally {
        loading.close()
      }
    });

    return {
      ArrowLeft,
      hostDetails,
      joinedDate,
      error,
      redirectHome,
    };
  },
});
</script>

<style lang="scss" src="./Host.scss" />
