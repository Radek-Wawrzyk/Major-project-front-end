<template>
  <div class="dashboard-offer-details">
    <el-form
      status-icon
      label-position="top"
      class="dashboard-offer-details__form"
      @submit.prevent="onSubmit()"
    >

      <section class="dashboard-offer-details__section">
        <h3 class="dashboard-offer-details__section-heading">
          General information
        </h3>

        <div class="dashboard-offer-details__section-content">
          <el-form-item 
            label="Name" 
            class="dashboard-offer-details__form-item"
            :error="errors.name"
          >
            <el-input
              v-model="form.name"
              type="text"
              autocomplete="off"
              placeholder="Great offer"
            />
          </el-form-item>

          <el-form-item 
            label="City" 
            class="dashboard-offer-details__form-item"
            :error="errors.location_city"
          >
            <el-input
              v-model="form.location_city"
              type="text"
              autocomplete="off"
              placeholder="Aberystwyth"
            />
          </el-form-item>

          <el-form-item 
            label="Country" 
            class="dashboard-offer-details__form-item"
            :error="errors.location_country"
          >
            <el-input
              v-model="form.location_country"
              type="text"
              autocomplete="off"
              placeholder="United Kingdom"
            />
          </el-form-item>

          <el-form-item 
            label="Post Code" 
            class="dashboard-offer-details__form-item"
            :error="errors.location_post_code"
          >
            <el-input
              v-model="form.location_post_code"
              type="text"
              autocomplete="off"
              placeholder="SY23 2NF"
            />
          </el-form-item>

          <el-form-item 
            label="Street" 
            class="dashboard-offer-details__form-item"
            :error="errors.location_street"
          >
            <el-input
              v-model="form.location_street"
              type="text"
              autocomplete="off"
              placeholder="North Gate 3y"
            />
          </el-form-item>

          <el-form-item 
            label="Price" 
            class="dashboard-offer-details__form-item"
            :error="errors.price"
          >
            <el-input
              v-model="form.price"
              type="number"
              autocomplete="off"
              placeholder="£0"
            />
          </el-form-item>

          <el-form-item 
            label="Deposit" 
            class="dashboard-offer-details__form-item"
            :error="errors.deposit"
          >
            <el-input
              v-model="form.deposit"
              type="number"
              autocomplete="off"
              placeholder="£0"
            />
          </el-form-item>

          <el-form-item 
            label="Property type" 
            class="dashboard-offer-details__form-item"
            :error="errors.building_type"
          >
            <el-select 
              v-model="form.building_type" 
              placeholder="New" 
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
            class="dashboard-offer-details__form-item"
            :error="errors.building_age"
          >
            <el-select 
              v-model="form.building_age" 
              placeholder="Apartment" 
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
            label="Number Of Rooms" 
            class="dashboard-offer-details__form-item"
            :error="errors.rooms_number"
          >
            <el-select v-model="form.rooms_number" placehol>
              <el-option
                v-for="item in rooms"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item 
            label="Living Area" 
            class="dashboard-offer-details__form-item"
            :error="errors.living_area"
          >
            <el-input
              v-model="form.living_area"
              type="number"
              autocomplete="off"
              placeholder="0"
            />

            <span class="dashboard-offer-details__form-decorator">
              m2
            </span>
          </el-form-item>

          <el-form-item 
            label="Property Floor (level)" 
            class="dashboard-offer-details__form-item"
            :error="errors.building_level"
          >
            <el-select v-model="form.building_level" placehol>
              <el-option
                v-for="item in floors"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </div>
      </section>

      <section class="dashboard-offer-details__section">
        <h3 class="dashboard-offer-details__section-heading">
          Description
        </h3>

        <div 
          class="dashboard-offer-details__editor"
          :class="[
            errors.description ? 'dashboard-offer-details__editor--error' : false,
          ]"
        >
          <quill-editor 
            theme="snow" 
            v-model:content="form.description"
            contentType="html"
            ref="descriptionEditor"
          />

          <transition name="el-zoom-in-top" mode="out-in">
            <p class="dashboard-offer-details__editor-error" v-if="errors.description">
              {{ errors.description }}
            </p>
          </transition>
        </div>
       

      </section>

      <section class="dashboard-offer-details__section">
        <h3 class="dashboard-offer-details__section-heading">
          Additional Information
        </h3>

        <div class="dashboard-offer-details__section-content">
          <el-form-item label="Air Conditioning" class="dashboard-offer-details__form-item" :error="errors.includes_air_conditioning">
            <el-select 
              v-model="form.includes_air_conditioning" 
              placeholder="Yes" 
            >
              <el-option
                v-for="item in [true, false]"
                :key="item"
                :label="item ? 'Yes' : 'No'"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="Balcony" class="dashboard-offer-details__form-item" :error="errors.includes_balcony">
            <el-select 
              v-model="form.includes_balcony" 
              placeholder="Yes" 
            >
              <el-option
                v-for="item in [true, false]"
                :key="item"
                :label="item ? 'Yes' : 'No'"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="Basement" class="dashboard-offer-details__form-item" :error="errors.includes_basement">
            <el-select 
              v-model="form.includes_basement" 
              placeholder="Yes" 
            >
              <el-option
                v-for="item in [true, false]"
                :key="item"
                :label="item ? 'Yes' : 'No'"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="Garage" class="dashboard-offer-details__form-item" :error="errors.includes_garage">
            <el-select 
              v-model="form.includes_garage" 
              placeholder="Yes" 
            >
              <el-option
                v-for="item in [true, false]"
                :key="item"
                :label="item ? 'Yes' : 'No'"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="Garden" class="dashboard-offer-details__form-item" :error="errors.includes_garden">
            <el-select 
              v-model="form.includes_garden" 
              placeholder="Yes" 
            >
              <el-option
                v-for="item in [true, false]"
                :key="item"
                :label="item ? 'Yes' : 'No'"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="House Phone" class="dashboard-offer-details__form-item" :error="errors.includes_house_phone">
            <el-select 
              v-model="form.includes_house_phone" 
              placeholder="Yes" 
            >
              <el-option
                v-for="item in [true, false]"
                :key="item"
                :label="item ? 'Yes' : 'No'"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="Internet" class="dashboard-offer-details__form-item" :error="errors.includes_internet">
            <el-select
              v-model="form.includes_internet" 
              placeholder="Yes" 
            >
              <el-option
                v-for="item in [true, false]"
                :key="item"
                :label="item ? 'Yes' : 'No'"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="Lift" class="dashboard-offer-details__form-item" :error="errors.includes_lift">
            <el-select 
              v-model="form.includes_lift" 
              placeholder="Yes" 
            >
              <el-option
                v-for="item in [true, false]"
                :key="item"
                :label="item ? 'Yes' : 'No'"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="Parking Space" class="dashboard-offer-details__form-item" :error="errors.includes_parking_space">
            <el-select 
              v-model="form.includes_parking_space" 
              placeholder="Yes" 
            >
              <el-option
                v-for="item in [true, false]"
                :key="item"
                :label="item ? 'Yes' : 'No'"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="Smoke detectors" class="dashboard-offer-details__form-item" :error="errors.includes_smoke_detectors">
            <el-select 
              v-model="form.includes_smoke_detectors" 
              placeholder="Yes" 
            >
              <el-option
                v-for="item in [true, false]"
                :key="item"
                :label="item ? 'Yes' : 'No'"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="TV" class="dashboard-offer-details__form-item" :error="errors.includes_tv">
            <el-select 
              v-model="form.includes_tv" 
              placeholder="Yes" 
            >
              <el-option
                v-for="item in [true, false]"
                :key="item"
                :label="item ? 'Yes' : 'No'"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="Washing Machine" class="dashboard-offer-details__form-item" :error="errors.includes_washing_machine">
            <el-select 
              v-model="form.includes_washing_machine" 
              placeholder="Yes" 
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
      </section>

      <section class="dashboard-offer-details__section">
        <h3 class="dashboard-offer-details__section-heading">
          Rules information
        </h3>

        <div class="dashboard-offer-details__section-content">
          <el-form-item label="No Smokers" class="dashboard-offer-details__form-item" :error="errors.rule_no_smokers">
            <el-select 
              v-model="form.rule_no_smokers" 
              placeholder="Yes" 
            >
              <el-option
                v-for="item in [true, false]"
                :key="item"
                :label="item ? 'Yes' : 'No'"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="No Animals" class="dashboard-offer-details__form-item"  :error="errors.rule_no_animals">
            <el-select 
              v-model="form.rule_no_animals" 
              placeholder="Yes" 
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
      </section>

      <section class="dashboard-offer-details__section dashboard-offer-details__section--actions">
        <el-button
          type="primary"
          native-type="submit"
          class="dashboard-offer-details__submit-button"
        >
          Save offer details
        </el-button>

        <el-button
          type="default"
          native-type="button"
          class="dashboard-offer-details__next-button"
          v-if="mode === 'edit'"
          @click="goNext()"
        >
          Go Next
        </el-button>
      </section>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { string, object, boolean, BooleanSchema, StringSchema, number, NumberSchema } from 'yup';
import { useForm, useField } from 'vee-validate';
import { BuildingAge, BuildingType, BuildingLevel } from '@/types/Filters';
import { CreateOffer } from '@/types/Offer';
import { buildingTypes, buildingAges, rooms, floors } from '@/data/filters';

export default defineComponent({
  name: 'DashboardOfferDetails',
  emits: ['submit-form', 'go-next'],
  props: {
    offer: {
      type: Object as PropType<CreateOffer>,
      required: false,
    },
    mode: {
      type: String as PropType<'edit' | 'create'>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const descriptionEditor = ref();
    const { values: form, handleSubmit, errors, setValues } = useForm({
      validationSchema: object({
        building_age: string().required().label('Building Age') as StringSchema<BuildingAge>,
        building_level: number().required().label('Building Level') as NumberSchema<BuildingLevel>,
        building_type: string().required().label('Building Type') as StringSchema<BuildingType>,
        living_area: number().required().label('Living Area') as NumberSchema<number>,
        location_city: string().required().label('Location City') as StringSchema<string>,
        location_country: string().required().label('Location Country') as StringSchema<string>,
        location_street: string().required().label('Location Street') as StringSchema<string>,
        location_post_code: string().required().label('Location Post Code') as StringSchema<string>,
        description: string().required().label('Offer Description') as StringSchema<string>,
        name: string().required().label('Offer Name') as StringSchema<string>,
        price: number().required().label('Offer Price') as NumberSchema<number>,
        deposit: number().required().label('Offer Deposit') as NumberSchema<number>,
        rooms_number: number().required().label('Rooms Number') as NumberSchema<number>,
        rule_no_animals: boolean().required().label('Rule No Animals') as BooleanSchema<boolean>,
        rule_no_smokers: boolean().required().label('Rule No Smokers') as BooleanSchema<boolean>,
        includes_air_conditioning: boolean().required().label('Air Conditioning') as BooleanSchema<boolean>,
        includes_balcony: boolean().required().label('Balcony') as BooleanSchema<boolean>,
        includes_basement: boolean().required().label('Basement') as BooleanSchema<boolean>,
        includes_garage: boolean().required().label('Garage') as BooleanSchema<boolean>,
        includes_garden: boolean().required().label('Garden') as BooleanSchema<boolean>,
        includes_house_phone: boolean().required().label('House Phone') as BooleanSchema<boolean>,
        includes_internet: boolean().required().label('Internet') as BooleanSchema<boolean>,
        includes_lift: boolean().required().label('Lift') as BooleanSchema<boolean>,
        includes_parking_space: boolean().required().label('Parking Space') as BooleanSchema<boolean>,
        includes_smoke_detectors: boolean().required().label('Smoke Detectors') as BooleanSchema<boolean>,
        includes_tv: boolean().required().label('TV') as BooleanSchema<boolean>,
        includes_washing_machine: boolean().required().label('Washing Machine') as BooleanSchema<boolean>,
      }),
      initialValues: {
        building_age: 'New',
        building_level: 1,
        building_type: 'Apartment',
        living_area: 0,
        location_city: '',
        location_country: '',
        location_street: '',
        location_post_code: '',
        description: '',
        name: '',
        price: 0,
        deposit: 0,
        rooms_number: 1,
        rule_no_animals: false,
        rule_no_smokers: false,
        includes_air_conditioning: false,
        includes_balcony: false,
        includes_basement: false,
        includes_garage: false,
        includes_garden: false,
        includes_house_phone: false,
        includes_internet: false,
        includes_lift: false,
        includes_parking_space: false,
        includes_smoke_detectors: false,
        includes_tv: false,
        includes_washing_machine: false,
      },
    });

    useField('building_age');
    useField('building_level');
    useField('building_type');
    useField('living_area');
    useField('location_city');
    useField('location_country');
    useField('location_street');
    useField('location_post_code');
    useField('description');
    useField('name');
    useField('price');
    useField('deposit');
    useField('rooms_number');
    useField('rule_no_animals');
    useField('rule_no_smokers');
    useField('includes_air_conditioning');
    useField('includes_balcony');
    useField('includes_basement');
    useField('includes_garage');
    useField('includes_garden');
    useField('includes_house_phone');
    useField('includes_internet');
    useField('includes_lift');
    useField('includes_parking_space');
    useField('includes_smoke_detectors');
    useField('includes_tv');
    useField('includes_washing_machine');

    const onSubmit = handleSubmit(async (offerDetails: CreateOffer) => {
      emit('submit-form', offerDetails);
    });

    const goNext = () => {
      emit('go-next');
    }

    onMounted(() => {
      if (props.offer && Object.keys(props.offer).length > 0) {
        setValues({ ...props.offer });

        setTimeout(() => {
          descriptionEditor.value.reinit()
        }, 0);
      }
    });

    return {
      errors,
      form,
      rooms,
      floors,
      buildingTypes,
      buildingAges,
      descriptionEditor,
      onSubmit,
      goNext,
    };
  },
});
</script>

<style lang="scss" src="./DashboardOfferDetails.scss" />
