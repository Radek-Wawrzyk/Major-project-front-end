<template>
  <div class="page-not-found">
    <div class="page-not-found__container container">
      <img class="page-not-found__image" alt="" src="@/assets/images/404.svg" />

      <el-button
        type="primary"
        @click="goHome()"
        class="page-not-found__button"
      >
        Back to home
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PageNotFound',
  setup() {
    const router = useRouter();

    const goHome = (): void => {
      router.push('/');
    };

    return {
      goHome,
    };
  },
});
</script>

<style lang="scss" src="./NotFound.scss" />
