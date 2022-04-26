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
          v-model="filters.location_city"
          type="text"
          autocomplete="off"
          placeholder="Aberystwyth"
          clearable
        />
      </el-form-item>

      <el-form-item label="Property type" class="offers-filters__form-item">
        <el-select 
          v-model="filters.building_type" 
          placeholder="Apartment" 
          clearable
        >
          <el-option
            v-for="item in buildingTypes"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Min Rooms" class="offers-filters__form-item">
        <el-select v-model="filters.rooms_number" placeholder="3" clearable>
          <el-option
            v-for="item in rooms"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-button type="primary" native-type="submit">
        Search
      </el-button>

      <el-form-item label="Min Price" class="offers-filters__form-item">
        <el-input
          v-model="filters.price_min"
          type="number"
          autocomplete="off"
          placeholder="£0"
          clearable
        />
      </el-form-item>

      <el-form-item label="Max Price" class="offers-filters__form-item">
        <el-input
          v-model="filters.price_max"
          type="number"
          autocomplete="off"
          placeholder="£0"
          clearable
        />
      </el-form-item>

      <el-form-item label="Min Living area" class="offers-filters__form-item">
        <el-input
          v-model="filters.living_area_min"
          type="number"
          autocomplete="off"
          placeholder="0"
          clearable
        />

        <span class="offers-filters__form-decorator">
          m2
        </span>
      </el-form-item>

      <el-form-item label="Floor (lvl)" class="offers-filters__form-item">
        <el-select v-model="filters.building_level" placeholder="2" clearable>
          <el-option
            v-for="item in floors"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        
      </el-form-item>

      <el-form-item label="Free Internet" class="offers-filters__form-item">
        <el-select v-model="filters.includes_internet" placeholder="Yes" clearable>
          <el-option
            v-for="item in [true, false]"
            :key="item"
            :label="item ? 'Yes' : 'No'"
            :value="item"
          />
        </el-select>
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
import { MainOfferFilters } from '@/types/Filters';
import { defineComponent, PropType, reactive, ref } from 'vue';
import { Operation as operationIcon } from '@element-plus/icons-vue';
import { prepareParamsQuery } from '@/helpers/filters';

// Data
import { buildingTypes, buildingAges, rooms, floors } from '@/data/filters';

export default defineComponent({
  name: 'PageOffersFilters',
  emits: ['search'],
  // props: {
  //   // props: {
  //   //   type: Object as PropType<Offer>,
  //   //   required: true,
  //   // },
  // },
  setup(_, { emit }) {
    const filters = <MainOfferFilters>reactive({
      location_city: undefined,
      price_min: undefined,
      price_max: undefined,
      living_area_min: undefined,
      building_type: undefined,
      rooms_number: undefined,
      building_level: undefined,
      includes_internet: undefined,
    });

    const onSubmit = () => {
      emit('search', prepareParamsQuery(filters));
    };

    return {
      onSubmit,
      operationIcon,
      filters,
      buildingTypes,
      buildingAges,
      rooms, 
      floors,
    };
  },
});
</script>

<style lang="scss" src="./PageOffersFilters.scss" />
