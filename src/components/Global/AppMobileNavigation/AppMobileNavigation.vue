<template>
  <nav class="app-mobile-navigation">
    <ul class="app-mobile-navigation__menu">
      <li
        v-for="menuItem in mobiledashboardMenu"
        :key="menuItem.url"
        class="app-mobile-navigation__menu-item"
      >
        <router-link
          class="app-mobile-navigation__menu-link"
          :to="menuItem.url"
          :aria-label="menuItem.label"
          :title="menuItem.label"
        >
          {{ menuItem.label }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mobiledashboardMenu } from '@/data/navigation';

export default defineComponent({
  name: 'AppMobileNavigation',
  setup() {
    return {
      mobiledashboardMenu,
    };
  },
});
</script>

<style lang="scss" src="./AppMobileNavigation.scss" />
