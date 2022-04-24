<template>
  <section class="offer-gallery">
    <ul class="offer-gallery__list" v-if="hasPhotos">
      <li 
        class="offer-gallery__list-item"
        v-for="(photo, index) in photos"
        :key="photo.id"
        @click="openLightbox(index)"
      >
        <img 
          class="offer-gallery__list-image" 
          :alt="photo.name" 
          :src="imagePath(photo.url)"
        />
      </li>
    </ul>

    <img
      v-else
      class="offer-gallery__placeholder-photo" 
      alt="Placeholder photo" 
      src="@/assets/images/placeholder-photo.jpeg" 
    />

    <el-button
      v-if="hasPhotos"
      @click="goPrev()"
      type="" 
      :icon="ArrowLeft" 
      circle
      class="offer-gallery__button offer-gallery__button--prev"
    />

    <el-button
      v-if="hasPhotos"
      @click="goNext()"
      type="" 
      :icon="ArrowRight" 
      circle
      class="offer-gallery__button offer-gallery__button--next"
    />

    <teleport to="body">
      <vue-easy-lightbox
        v-if="hasPhotos"
        scrollDisabled
        moveDisabled
        :visible="lightboxIsActive"
        :imgs="converedPhotos"
        :index="lightboxActiveIndex"
        @hide="closeLightbox()"
      />
    </teleport>
  </section>
</template>

<script lang="ts">
import { OfferGallery } from '@/types/Offer';
import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import { getImagePath } from '@/helpers/images';
import Siema from 'siema';
import VueEasyLightbox from 'vue-easy-lightbox';
import {
  ArrowLeft,
  ArrowRight,
} from '@element-plus/icons-vue';

export default defineComponent({
  name: 'PageOfferGallery',
  components: {
    VueEasyLightbox,
  },
  props: {
    photos: {
      type: Array as PropType<OfferGallery[]>,
      required: false,
      default: () => [],
    },
  },
  setup(props) {
    const sliderRef = ref();
    const lightboxActiveIndex = ref(0);
    const lightboxIsActive = ref(false);

    const hasPhotos = computed(() => props.photos && props.photos.length !== 0);
    const converedPhotos = computed(() => {
      if (!hasPhotos) return [];

      return props.photos.map((photo: OfferGallery) => ({
        title: photo.name,
        src: imagePath(photo.url),
      }));
    });

    const imagePath = (imagePath: string) => getImagePath(imagePath);
    const openLightbox = (index: number) => {
      lightboxIsActive.value = true;
      lightboxActiveIndex.value = index;
    };
    const closeLightbox = () => {
      lightboxIsActive.value = false;
      lightboxActiveIndex.value = 0;
    }
    const goNext = () => {
      if (hasPhotos.value) sliderRef.value.next();
      
    }
    const goPrev = () => {
      if (hasPhotos.value) sliderRef.value.prev();
    }

    onMounted(() => {
      if (!hasPhotos.value) return false;

      sliderRef.value = new Siema({
        selector: '.offer-gallery__list',
        duration: 400,
        easing: 'ease-out',
        perPage: 1,
        loop: false,
      });
    });

    return {
      sliderRef,
      hasPhotos,
      lightboxIsActive,
      lightboxActiveIndex,
      converedPhotos,
      imagePath,
      openLightbox,
      closeLightbox,
      goNext,
      goPrev,
      ArrowLeft,
      ArrowRight,
    };
  },
});
</script>

<style lang="scss" src="./PageOfferGallery.scss" />
