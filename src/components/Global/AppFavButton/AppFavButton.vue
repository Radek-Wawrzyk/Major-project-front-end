<template>
  <el-button 
    @click="handleRequest()" 
    :round="mode !== 'button'"
    :icon="mode !== 'button' ? (isIncluded(offerId) ? starIconFilled : starIcon) : null"
    :class="[
      mode !== 'button' ? 'app-fav-button--icon' : null,
      isIncluded(offerId) ? 'app-fav-button--active' : null,
    ]"
    :type="(isIncluded(offerId) && mode === 'button') ? 'danger' : 'default'"
    class="app-fav-button"
  >
    <template v-if="mode === 'button'">
      {{ isIncluded(offerId) ? 'Delete from favorites' : 'Add to favorites' }}
    </template>
  </el-button>
</template>

<script lang="ts">
import favQuestion from '@/api/services/favQuestion';
import { useAuthStore } from '@/stores/auth';
import { computed, defineComponent, PropType, ref } from 'vue';
import { ElNotification } from 'element-plus';
import { Star as starIcon, StarFilled as starIconFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user';

export default defineComponent({
  name: 'AppFavButton',
  props: {
    offerId: {
      type: Number as PropType<number>,
      required: true,
    },
    mode: {
      type: String as PropType<string>,
      required: false,
      default: () => 'button',
    },
  },
  setup(props) {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const loading = ref<boolean>(false);

    const addedFavOffer = computed(() => {
      const targetFavOffer = userStore.user?.favOffers.find((favOffer) => {
        return favOffer.userId === userStore.user?.id && favOffer.offerId === props.offerId;
      });

      return targetFavOffer;
    });

    const isIncluded = (offerId: number) => {
      return userStore.user?.favOffers.some((offer) => offer.offerId === offerId);
    }
    const handleRequest = () => {
      if (isIncluded(props.offerId)) removeFromFavorites();
      else addToFavorites();
    }

    const addToFavorites = async (): Promise<void> => {
      if (!authStore.isAuthenticated) {
        ElNotification({
          title: `Error`,
          type: 'error',
          message: `You have to be logged to add offers`,
        });

        return;
      }

      loading.value = true;

      try {
        const { data } = await favQuestion.saveFavQuestion(props.offerId);
        userStore.addFavoriteOffer(data);

        ElNotification({
          title: `Success`,
          type: 'success',
          message: `Your offer has beed added to favorites list!`,
        });
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      } finally {
        loading.value = false;
      }
    };

    const removeFromFavorites = async (): Promise<void> => {
      if (!authStore.isAuthenticated) {
        ElNotification({
          title: `Error`,
          type: 'error',
          message: `You have to be logged to add offers`,
        });

        return;
      }

      loading.value = true;

      try {
        await favQuestion.removeFavQuestion(addedFavOffer.value.id);
        userStore.removeFavoriteOffer(addedFavOffer.value.id);

        ElNotification({
          title: `Success`,
          type: 'success',
          message: `Your offer has beed removed from favorites list!`,
        });
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      } finally {
        loading.value = false;
      }
    };

    return {
      addToFavorites,
      isIncluded,
      handleRequest,
      loading,
      addedFavOffer,
      starIcon,
      starIconFilled,
    };
  },
});
</script>

<style lang="scss" src="./AppFavButton.scss" />
