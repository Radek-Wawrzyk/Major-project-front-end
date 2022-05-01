<template>
  <nav class="app-navigation">
    <div class="app-navigation__main">
      <div class="app-navigation__container container">
        <app-logo class="app-navigation__logo" />

        <div class="app-navigation__content" v-if="!isAuthenticated">
          <el-button @click="redirectToPage('login')">Sign in</el-button>
          <el-button @click="redirectToPage('register')" type="primary">Sign up</el-button>
        </div>

        <div class="app-navigation__content" v-else>
          <el-dropdown 
            class="app-navigation__dropdown" 
            trigger="click" 
            v-if="user"
            popper-class="app-navigation__dropdown-popper"
          >
            <span class="el-dropdown-link app-navigation__dropdown-link">
              <app-navigation-avatar :user="user"  />
              <span class="app-navigation__dropdown-name">
                {{ user.first_name }}
              </span>

              <el-icon class="app-navigation__dropdown-icon">
                <arrow-down />
              </el-icon>
            </span>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item 
                  v-for="menuItem in dropdownMenu" 
                  :key="menuItem.value"
                  @click="redirectToPage(menuItem.value)"
                >
                  {{ menuItem.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
   
    <div class="app-navigation-dashboard" v-if="isDashboardPage && user">
      <transition name="page-fade" mode="out-in">
        <div class="app-navigation-dashboard__container container">
          <ul class="app-navigation-dashboard__menu">
            <li
              v-for="menuItem in dashboardMenu" 
              :key="menuItem.url"
              class="app-navigation-dashboard__menu-item"
            >
              <router-link
                class="app-navigation-dashboard__menu-link"
                :to="menuItem.url"
                :aria-label="menuItem.label"
                :title="menuItem.label"
              >
                {{ menuItem.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';
import { Search as searchIcon, ArrowDown }  from '@element-plus/icons-vue';
import { Tools as toolsIcon }  from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/user';
import { dropdownMenu, dashboardMenu } from '@/data/navigation';

import AppLogo from '@/components/Global/AppLogo/AppLogo.vue';
import AppNavigationAvatar from '@/components/Global/AppNavigationAvatar/AppNavigationAvatar.vue';

export default defineComponent({
  name: 'AppNavigation',
  components: {
    AppLogo,
    AppNavigationAvatar,
    ArrowDown,
  },
  setup() {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const router = useRouter();
    const route = useRoute();
    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const user = computed(() => userStore.user);
    const isDashboardPage = computed(() => route.meta.requiresAuth);

    const redirectToPage = (page: string): void => {
      switch (page) {
        case 'login': {
          router.push('/auth/login');
          break;
        }
        case 'register': {
          router.push('/auth/register');
          break;
        }
        case 'create': {
          router.push('/create-offer');
          break;
        }
        case 'offers': {
          router.push('/my-offers');
          break;
        }
        case 'settings': {
          router.push('/my-account');
          break;
        }
        case 'logout': {
          authStore.logout();
          break;
        }
        case 'dashboard': {
          router.push('/dashboard');
          break;
        }
        case 'fav': {
          router.push('/favorite-offers');
          break;
        }
        case 'questions': {
          router.push('/questions');
          break;
        }
        default: {
          break;
        }
      }
    }

    return {
      redirectToPage,
      isAuthenticated,
      dropdownMenu,
      dashboardMenu,
      user,
      isDashboardPage,
      searchIcon,
      toolsIcon,
    }
  },
});
</script>

<style lang="scss" src="./AppNavigation.scss" />
