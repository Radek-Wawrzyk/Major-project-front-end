<template>
  <nav class="offer-mobile-bar">
    <div class="offer-mobile-bar__container container">
      <div class="offer-mobile-bar__details">
        <h4 class="offer-mobile-bar__details-name">
          {{ offer.name }}
        </h4>

        <span class="offer-mobile-bar__details-price">
          {{ formatPrice(offer.price) }} (per month)
        </span>
      </div>

      <div class="offer-mobile-bar__actions">
        <el-button 
          type="primary" 
          class="offer-mobile-bar__actions-button"
          @click="setAskDialog(true)"
        >
          Ask question
        </el-button>
        <app-fav-button :offer-id="offer.id" class="offer-mobile-bar__actions-button" />
      </div>
    </div>

    <!-- Modal for form -->
    <teleport to="body">
      <el-dialog 
        v-model="dialogVisible" 
        title="Ask question"
        width="96%"
      >
        <page-offer-form  
          class="offer-mobile-bar__ask-form"
          :offer-id="offer.id"
          :user-id="offer.authorId"
          :offer-author="offer.author"
          :is-plain="true"
          @on-submit="setAskDialog(false)"
        />
      </el-dialog>
    </teleport>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { formatPrice } from '@/helpers/price';
import { Offer } from '@/types/Offer';

// Components
import AppFavButton from '@/components/Global/AppFavButton/AppFavButton.vue';
import PageOfferForm from '@/components/Page/PageOfferForm/PageOfferForm.vue';

export default defineComponent({
  name: 'PageOfferMobileBar',
  components: {
    AppFavButton,
    PageOfferForm,
  },
  props: {
    offer: {
      type: Object as PropType<Offer>,
      required: true,
    },
  },
  setup() {
    const dialogVisible = ref(false);
    const setAskDialog = (toggleStatus = !dialogVisible.value): void => {
      dialogVisible.value = toggleStatus;
    };

    return {
      formatPrice,
      dialogVisible,
      setAskDialog,
    };
  },
});
</script>

<style lang="scss" src="./PageOfferMobileBar.scss" />
