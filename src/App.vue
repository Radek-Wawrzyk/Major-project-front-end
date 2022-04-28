<template>
  <div class="app-page">
    <app-navigation />

    <main 
      class="app-page__main"
      :class="[
        isDashboardView ? 'app-page__main--is-dashboard' : false,
      ]"
    >
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <app-footer />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import AppNavigation from '@/components/Global/AppNavigation/AppNavigation.vue';
import AppFooter from '@/components/Global/AppFooter/AppFooter.vue';
import { useUserStore } from '@/stores/user';
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router';

export default defineComponent({
  name: "App",
  components: { AppNavigation, AppFooter },
  setup() {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const loading = ref<boolean>(false);
    const route = useRoute();
    const isDashboardView = computed(() => route.meta.requiresAuth);

    const getUserDetails = async (): Promise<void> => {
      loading.value = true;

      try {
        await userStore.getMe();
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      } finally {
        loading.value = false;
      }
    }

    if (authStore.isAuthenticated) {
      // Check JWT exp session, if valid getUser
      if (authStore.checkSession()) {
        getUserDetails();
      } 
    }

    return {
      isDashboardView,
    };
  },
});

</script>
