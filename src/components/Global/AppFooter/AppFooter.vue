<template>
  <footer class="app-footer">
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppFooter',
});
</script>

<style lang="scss" src="./AppFooter.scss" />
