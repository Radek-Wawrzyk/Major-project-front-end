<template>
  <footer 
    class="app-footer"
    :class="[
      isDashboardPage ? 'app-footer--dashboard' : false,
    ]"
  >
    <div class="container">
      <p class="app-footer__copyright-text">
        2022 All Rights Reserved
      </p>

      <p class="app-footer__made-by">
        FindYourFlat made by 
        <a 
          href="https://github.com/Radek-Wawrzyk"
          title="Radosław Wawrzyk - Front-End Developer"
          aria-label="Radosław Wawrzyk - Front-End Developer"
          class="app-footer__link"
        >
          Radoslaw Wawrzyk (raw32)
        </a>   
        with 
        <span class="app-footer__icon">♥</span>
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'AppFooter',
  setup() {
    const route = useRoute();
    const isDashboardPage = computed(() => route.meta.requiresAuth);

    return {
      isDashboardPage,
    };
  },
});
</script>

<style lang="scss" src="./AppFooter.scss" />
