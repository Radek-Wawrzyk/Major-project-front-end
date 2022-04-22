<template>
  <div class="auth-page">
    <header class="auth-page__header">
      <app-logo class="auth-page__header-logo" />

      <p class="auth-page__header-text" v-if="currentPage === 'login'">
        Don't have an account?

        <router-link
          class="auth-page__header-link"
          to="/auth/register"
          title="Go to the register page"
          aria-label="Go to the register page"
        >
          Get started
        </router-link>
      </p>

      <p class="auth-page__header-text" v-else-if="currentPage === 'register'">
        Already have an account?

        <router-link
          class="auth-page__header-link"
          to="/auth/login"
          title="Go to the login page"
          aria-label="Go to the login page"
        >
          Login
        </router-link>
      </p>

      <p class="auth-page__header-text" v-else>
        <router-link
          class="auth-page__header-link"
          to="/auth/login"
          title="Go to the login page"
          aria-label="Go to the login page"
        >
          Back to the login page
        </router-link>
      </p>
    </header>

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
import AppLogo from '../../components/Global/AppLogo/AppLogo.vue';

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
