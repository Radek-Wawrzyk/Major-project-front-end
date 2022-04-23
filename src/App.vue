<template>
  <div class="app-page">
    <app-navigation />

    <main class="app-page__main">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import AppNavigation from '@/components/Global/AppNavigation/AppNavigation.vue';
import { useUserStore } from '@/stores/user';
import { ElNotification } from 'element-plus'

export default defineComponent({
  name: "App",
  components: { AppNavigation },
  setup() {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const loading = ref<boolean>(false);

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
  },
});

</script>
