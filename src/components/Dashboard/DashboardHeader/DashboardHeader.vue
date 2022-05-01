<template>
  <header class="dashboard-header">
    <h1 class="dashboard-header__title">
      {{ title }}
    </h1>

    <slot name="headerRight"></slot>
  </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'DashboardHeader',
  props: {
    title: {
      type: String as PropType<string>,
      required: false,
      default: () => '',
    },
  },
});
</script>

<style lang="scss" src="./DashboardHeader.scss" />
