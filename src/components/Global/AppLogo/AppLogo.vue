<template>
  <router-link
    to="/"
    title="FindYourFlat"
    aria-label="Go home"
    class="app-logo"
  >
    Find<span class="app-logo__strong">Your</span>Flat
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppLogo',
});
</script>

<style lang="scss" src="./AppLogo.scss" />
