<template>
  <div class="offers-all-filters">
    <div class="offers-all-filters__inner">
      <el-form
        status-icon
        label-position="top"
        class="offers-all-filters__form"
        @submit.prevent="onSubmit()"
      >
        <div class="offers-all-filters__section">
          <h3 class="offers-all-filters__section-heading">General</h3>

          <div class="offers-all-filters__section-grid">
            <el-form-item
              label="City"
              class="offers-all-filters__form-item offers-all-filters__form-item--city"
            >
              <el-input
                v-model="filters.location_city"
                type="text"
                autocomplete="off"
                placeholder="Aberystwyth"
                clearable
              />
            </el-form-item>

            <el-form-item
              label="Property type"
              class="offers-all-filters__form-item"
            >
              <el-select
                v-model="filters.building_type"
                placeholder="New"
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

            <el-form-item
              label="Property Age"
              class="offers-all-filters__form-item"
            >
              <el-select
                v-model="filters.building_age"
                placeholder="Apartment"
                clearable
              >
                <el-option
                  v-for="item in buildingAges"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item
              label="Min Rooms"
              class="offers-all-filters__form-item"
            >
              <el-select
                v-model="filters.rooms_number"
                placeholder="3"
                clearable
              >
                <el-option
                  v-for="item in rooms"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item
              label="Min Price"
              class="offers-all-filters__form-item"
            >
              <el-input
                v-model="filters.price_min"
                type="number"
                autocomplete="off"
                placeholder="£0"
                clearable
              />
            </el-form-item>

            <el-form-item
              label="Max Price"
              class="offers-all-filters__form-item"
            >
              <el-input
                v-model="filters.price_max"
                type="number"
                autocomplete="off"
                placeholder="£0"
                clearable
              />
            </el-form-item>

            <el-form-item
              label="Min Living area"
              class="offers-all-filters__form-item"
            >
              <el-input
                v-model="filters.living_area_min"
                type="number"
                autocomplete="off"
                placeholder="0"
                clearable
              />

              <span class="offers-all-filters__form-decorator"> m2 </span>
            </el-form-item>

            <el-form-item
              label="Floor (lvl)"
              class="offers-all-filters__form-item"
            >
              <el-select
                v-model="filters.building_level"
                placeholder="2"
                clearable
              >
                <el-option
                  v-for="item in floors"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div class="offers-all-filters__section">
          <h3 class="offers-all-filters__section-heading">Additional</h3>

          <div class="offers-all-filters__section-grid">
            <el-form-item
              label="Air Conditioning"
              class="offers-all-filters__form-item"
            >
              <el-select
                v-model="filters.includes_air_conditioning"
                placeholder="Yes"
                clearable
              >
                <el-option
                  v-for="item in [true, false]"
                  :key="item"
                  :label="item ? 'Yes' : 'No'"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="Balcony" class="offers-all-filters__form-item">
              <el-select
                v-model="filters.includes_balcony"
                placeholder="Yes"
                clearable
              >
                <el-option
                  v-for="item in [true, false]"
                  :key="item"
                  :label="item ? 'Yes' : 'No'"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item
              label="Basement"
              class="offers-all-filters__form-item"
            >
              <el-select
                v-model="filters.includes_basement"
                placeholder="Yes"
                clearable
              >
                <el-option
                  v-for="item in [true, false]"
                  :key="item"
                  :label="item ? 'Yes' : 'No'"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="Garage" class="offers-all-filters__form-item">
              <el-select
                v-model="filters.includes_garage"
                placeholder="Yes"
                clearable
              >
                <el-option
                  v-for="item in [true, false]"
                  :key="item"
                  :label="item ? 'Yes' : 'No'"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="Garden" class="offers-all-filters__form-item">
              <el-select
                v-model="filters.includes_garden"
                placeholder="Yes"
                clearable
              >
                <el-option
                  v-for="item in [true, false]"
                  :key="item"
                  :label="item ? 'Yes' : 'No'"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item
              label="House Phone"
              class="offers-all-filters__form-item"
            >
              <el-select
                v-model="filters.includes_house_phone"
                placeholder="Yes"
                clearable
              >
                <el-option
                  v-for="item in [true, false]"
                  :key="item"
                  :label="item ? 'Yes' : 'No'"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item
              label="Internet"
              class="offers-all-filters__form-item"
            >
              <el-select
                v-model="filters.includes_internet"
                placeholder="Yes"
                clearable
              >
                <el-option
                  v-for="item in [true, false]"
                  :key="item"
                  :label="item ? 'Yes' : 'No'"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="Lift" class="offers-all-filters__form-item">
              <el-select
                v-model="filters.includes_lift"
                placeholder="Yes"
                clearable
              >
                <el-option
                  v-for="item in [true, false]"
                  :key="item"
                  :label="item ? 'Yes' : 'No'"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item
              label="Parking Space"
              class="offers-all-filters__form-item"
            >
              <el-select
                v-model="filters.includes_parking_space"
                placeholder="Yes"
                clearable
              >
                <el-option
                  v-for="item in [true, false]"
                  :key="item"
                  :label="item ? 'Yes' : 'No'"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item
              label="Smoke detectors"
              class="offers-all-filters__form-item"
            >
              <el-select
                v-model="filters.includes_smoke_detectors"
                placeholder="Yes"
                clearable
              >
                <el-option
                  v-for="item in [true, false]"
                  :key="item"
                  :label="item ? 'Yes' : 'No'"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="TV" class="offers-all-filters__form-item">
              <el-select
                v-model="filters.includes_tv"
                placeholder="Yes"
                clearable
              >
                <el-option
                  v-for="item in [true, false]"
                  :key="item"
                  :label="item ? 'Yes' : 'No'"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item
              label="Washing Machine"
              class="offers-all-filters__form-item"
            >
              <el-select
                v-model="filters.includes_washing_machine"
                placeholder="Yes"
                clearable
              >
                <el-option
                  v-for="item in [true, false]"
                  :key="item"
                  :label="item ? 'Yes' : 'No'"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div class="offers-all-filters__section">
          <h3 class="offers-all-filters__section-heading">Rules</h3>

          <div class="offers-all-filters__section-grid">
            <el-form-item
              label="No Smokers"
              class="offers-all-filters__form-item"
            >
              <el-select
                v-model="filters.rule_no_smokers"
                placeholder="Yes"
                clearable
              >
                <el-option
                  v-for="item in [true, false]"
                  :key="item"
                  :label="item ? 'Yes' : 'No'"
                  :value="item"
                />
              </el-select>
            </el-form-item>

            <el-form-item
              label="No Animals"
              class="offers-all-filters__form-item"
            >
              <el-select
                v-model="filters.rule_no_animals"
                placeholder="Yes"
                clearable
              >
                <el-option
                  v-for="item in [true, false]"
                  :key="item"
                  :label="item ? 'Yes' : 'No'"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>

  <div class="offers-all-filters__actions">
    <el-button native-type="submit" @click="onClose()"> Cancel </el-button>

    <el-button native-type="submit" type="primary" @click="onSubmit()">
      Accept Filters
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, watch, onMounted } from 'vue';
import { AllOfferFilters } from '@/types/Filters';
import { buildingTypes, buildingAges, rooms, floors } from '@/data/filters';

export default defineComponent({
  name: 'PageOffersAllFilters',
  emits: ['filter', 'close'],
  props: {
    filters: {
      type: Object as PropType<AllOfferFilters>,
      required: true,
    },
    isVisible: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: () => true,
    },
  },
  setup(props, { emit }) {
    const filters = <AllOfferFilters>reactive({
      building_age: undefined,
      building_type: undefined,
      building_level: undefined,
      includes_air_conditioning: undefined,
      includes_balcony: undefined,
      includes_basement: undefined,
      includes_garage: undefined,
      includes_garden: undefined,
      includes_house_phone: undefined,
      includes_internet: undefined,
      includes_lift: undefined,
      includes_parking_space: undefined,
      includes_smoke_detectors: undefined,
      includes_tv: undefined,
      includes_washing_machine: undefined,
      living_area_min: undefined,
      location_city: undefined,
      price_min: undefined,
      price_max: undefined,
      rooms_number: undefined,
      rule_no_animals: undefined,
      rule_no_smokers: undefined,
    });

    watch(props.filters, () => {
      Object.assign(filters, props.filters);
    }, { deep: true });

    watch(() => props.isVisible, () => {
      if (!props.isVisible) {
        onClose();
      }
    });

    const onSubmit = () => {
      emit('filter', filters);
      onClose();
    };

    const onClose = () => {
      emit('close', {
        syncFilters: true,
        filters,
      });
    };

    onMounted(() => {
      Object.assign(filters, props.filters);
    });

    return {
      filters,
      onSubmit,
      onClose,
      buildingTypes,
      buildingAges,
      rooms,
      floors,
    };
  },
});
</script>

<style lang="scss" src="./PageOffersAllFilters.scss" />
