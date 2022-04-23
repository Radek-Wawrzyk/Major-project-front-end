<template>
  <div class="auth-page">
    <div class="auth-page-content">
      <aside class="auth-page-content__sidebar">
        <img
          class="auth-page-content__sidebar-img"
          alt=""
          src="@/assets/images/auth-back.jpeg"
        />
      </aside>

      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router';
import AppLogo from '@/components/Global/AppLogo/AppLogo.vue';

export default defineComponent({
  components: { AppLogo },
  name: 'PageAuth',
  setup() {
    const route = useRoute();
    const currentPage = computed(() => route.name);

    return {
      route,
      currentPage,
    }
  },
})
</script>

<style lang="scss" src="./Auth.scss" />
