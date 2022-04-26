<template>
  <div class="offers-filters">
    <el-form
      status-icon
      label-position="top"
      class="offers-filters__form"
      @submit.prevent="onSubmit()"
    >
      <el-form-item 
        label="City" 
        class="offers-filters__form-item offers-filters__form-item--city"
      >
        <el-input
          v-model="filters.city"
          type="text"
          autocomplete="off"
          placeholder="Aberystwyth"
        />
      </el-form-item>

      <el-form-item label="Property type" class="offers-filters__form-item">
        <el-input
          v-model="filters.building_type"
          type="text"
          autocomplete="off"
          placeholder="Apartament"
        />
      </el-form-item>

      <el-form-item label="Rooms" class="offers-filters__form-item">
        <el-input
          v-model="filters.rooms_number"
          type="text"
          autocomplete="off"
          placeholder="Rooms"
        />
      </el-form-item>

      <el-button type="primary">
        Search
      </el-button>

      <el-form-item label="Min Price" class="offers-filters__form-item">
        <el-input
          v-model="filters.price_min"
          type="number"
          autocomplete="off"
          placeholder="£0"
        />
      </el-form-item>

      <el-form-item label="Max Price" class="offers-filters__form-item">
        <el-input
          v-model="filters.price_max"
          type="number"
          autocomplete="off"
          placeholder="£0"
        />
      </el-form-item>

      <el-form-item label="Min Living area" class="offers-filters__form-item">
        <el-input
          v-model="filters.living_area_min"
          type="number"
          autocomplete="off"
          placeholder="0"
        />

        <span class="offers-filters__form-decorator">
          m2
        </span>
      </el-form-item>

      <el-form-item label="Floor (lvl)" class="offers-filters__form-item">
        <el-input
          v-model="filters.building_level"
          type="number"
          autocomplete="off"
          placeholder="£0"
        />
      </el-form-item>

      <el-form-item label="Free Internet" class="offers-filters__form-item">
        <el-input
          v-model="filters.includes_internet"
          type="number"
          autocomplete="off"
          placeholder="Yes"
        />
      </el-form-item>

      <el-button 
        type="default" 
        :icon="operationIcon"
        class="offers-filters__form-filter-button"
      >
        More filters
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Offer } from '@/types/Offer';
import { defineComponent, PropType, reactive, ref } from 'vue';
import { Operation as operationIcon } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'PageOffersFilters',
  // props: {
  //   // props: {
  //   //   type: Object as PropType<Offer>,
  //   //   required: true,
  //   // },
  // },
  setup() {
    const filters = reactive({
      city: undefined,
      country: undefined,
      price_min: undefined,
      price_max: undefined,
      living_area_min: undefined,
      building_type: undefined,
      rooms_number: undefined,
      building_level: undefined,
      includes_internet: undefined,
    });
    const onSubmit = () => {

    };

    return {
      filters,
      onSubmit,
      operationIcon,
    };
  },
});
</script>

<style lang="scss" src="./PageOffersFilters.scss" />
