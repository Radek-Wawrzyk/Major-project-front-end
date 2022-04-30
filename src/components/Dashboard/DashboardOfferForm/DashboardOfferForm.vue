<template>
  <div class="dashboard-offer-form">
    <el-steps :active="activeStep" align-center class="dashboard-offer-form__steps">
      <el-step title="Step 1" description="Offer details" />
      <el-step title="Step 2" description="Offer photos" />
      <el-step title="Step 3" description="Status" />
    </el-steps>

    <div class="dashboard-offer-form__content" v-if="managementMode === 'edit' && Object.keys(offerInfo).length > 0">
      <transition name="page-fade" mode="out-in">
        <el-card v-if="activeStep === 0" key="details">
          <dashboard-offer-details 
            @submit-form="saveOfferDetails($event)"
            @go-next="nextStep()"
            :offer="offerInfo" 
            :mode="managementMode"
          />
        </el-card>

        <el-card v-else-if="activeStep === 1" key="photos">
          <dashboard-offer-photos 
            @go-finish="finishEditing()" 
            @go-prev="prevStep()"
            :offer="offerInfo"
            :mode="managementMode"
          />
        </el-card>

        <el-card v-else-if="activeStep === 3" key="finish">
          <div class="dashboard-offer-form__notification">
            <img 
              class="dashboard-offer-form__notification-icon"
              alt=""
              src="@/assets/icons/success.svg"
            />

            <p class="dashboard-offer-form__notification-text">
              Your offer has been successfully saved!

              <router-link 
                to="/my-offers" 
                class="dashboard-offer-form__notification-link"
                title="Back to my offers"
                arial-label="Back to my offers"
              >
                Back to my offers
              </router-link>
            </p>
          </div>
        </el-card>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import offer from '@/api/services/offer';
import { CreateOffer } from '@/types/Offer';
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import { ElLoading, ElNotification } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';

import DashboardOfferDetails from '@/components/Dashboard/DashboardOfferDetails/DashboardOfferDetails.vue';
import DashboardOfferPhotos from '@/components/Dashboard/DashboardOfferPhotos/DashboardOfferPhotos.vue';

export default defineComponent({
  name: 'DashboardOfferForm',
  components: {
    DashboardOfferDetails,
    DashboardOfferPhotos,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const managementMode = ref('create');
    const activeStep = ref(0);
    const offerInfo = reactive<CreateOffer>({} as CreateOffer);
    const offerId = computed(() => route.params.id);

    const nextStep = () => {
      if (activeStep.value !== 1) {
        activeStep.value = activeStep.value + 1;
      }
    };

    const prevStep = () => {
      if (activeStep.value !== 0) {
        activeStep.value = activeStep.value - 1;
      }
    };

    const setFormMode = (mode: 'edit' | 'create') => {
      managementMode.value = mode;
    };

    const finishEditing = () => {
      activeStep.value = 3;
    }

    const saveOfferDetails = (offerDetails: CreateOffer) => {
      if (managementMode.value === 'create') createOffer(offerDetails);
      else editOffer(offerDetails);
    }

    const createOffer = async (offerDetails: CreateOffer) => {
      const loading = ElLoading.service({
        lock: true,
        background: "#ffffff",
      });

      try {
        const { data } = await offer.create(offerDetails);
        Object.assign(offerInfo, data);

        setFormMode('edit');
        nextStep();

        ElNotification({
          title: `Success`,
          type: 'success',
          message: `You have successfully saved your offer details!`,
        });
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      } finally {
        setTimeout(() => {
          loading.close();
        }, 250);
      }
    };

    const editOffer = async (offerDetails: CreateOffer) => {
      const loading = ElLoading.service({
        lock: true,
        background: "#ffffff",
      });

      try {
        const { data } = await offer.edit(offerDetails);
        Object.assign(offerInfo, data);

        nextStep();

        ElNotification({
          title: `Success`,
          type: 'success',
          message: `You have successfully edited your offer details!`,
        });
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      } finally {
        setTimeout(() => {
          loading.close();
        }, 250);
      }
    }

    const getOffer = async (offerId: string) => {
      const loading = ElLoading.service({
        lock: true,
        background: "#ffffff",
      });

      try {
        const { data } = await offer.getPlainOffer(offerId);
        Object.assign(offerInfo, data);
      } catch (error) {
        if (error.response.data?.statusCode === 404) router.push("/page-not-found");

        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      } finally {
        setTimeout(() => {
          loading.close();
        }, 250);
      }
    }

    onMounted(() => {
      if (route.name !== 'editOffer') setFormMode('create');
      else {
        setFormMode('edit');
        getOffer(offerId.value as string);
      }
    });

    return {
      activeStep,
      offerInfo,
      managementMode,
      offerId,
      nextStep,
      prevStep,
      saveOfferDetails,
      finishEditing,
    };
  },
});
</script>

<style lang="scss" src="./DashboardOfferForm.scss" />
