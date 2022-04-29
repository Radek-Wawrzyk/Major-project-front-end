<template>
  <div class="dashboard-create-offer">
    <div class="container">
      <dashboard-offer-form />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DashboardOfferForm from '@/components/Dashboard/DashboardOfferForm/DashboardOfferForm.vue';

export default defineComponent({
  name: 'DashboardCreateOffer',
  components: {
    DashboardOfferForm,
  },
});
</script>
