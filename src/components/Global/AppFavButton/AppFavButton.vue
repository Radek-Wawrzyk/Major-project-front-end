<template>
  <el-button @click="addToFavorites()">
    Add to favorites
  </el-button>
</template>

<script lang="ts">
import favQuestion from '@/api/services/favQuestion';
import { useAuthStore } from '@/stores/auth';
import { defineComponent, PropType, ref } from 'vue';
import { ElNotification } from 'element-plus';

export default defineComponent({
  name: 'AppFavButton',
  props: {
    offerId: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  setup(props) {
    const authStore = useAuthStore();
    const loading = ref<boolean>(false);

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
        await favQuestion.saveFavQuestion(props.offerId);
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
      loading,
    };
  },
});
</script>

<!-- <style lang="scss" src="./test.scss" /> -->
