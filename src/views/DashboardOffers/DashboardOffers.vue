<template>
  <div class="dashboard-offers">
    <div class="container">
      <dashboard-header title="My offers">
        <template v-slot:headerRight>
          <el-button @click="redirectToNewOffer()" type="primary" plain>
            Create new offer
          </el-button>
        </template>
      </dashboard-header>

      <el-card class="no-mobile-padding">
        <el-table :data="offersList" v-loading="loading" table-layout="auto">
          <el-table-column label="Image" width="60px">
            <template #default="scope">
              <figure class="dashboard-offers__image">
                <img 
                  class="dashboard-offers__image-inner"
                  alt=""
                  :src="getImagePath(getMainImage(scope.row.photos))"
                  v-if="hasImages(scope.row.photos)"
                />

                <img 
                  class="dashboard-offers__image-inner"
                  alt=""
                  src="@/assets/images/placeholder-photo.jpeg"
                  v-else
                />
              </figure>
            </template>
          </el-table-column>

          <el-table-column label="Name">
            <template #default="scope">
              <router-link
                :to="`/my-offers/${scope.row.id}`"
                title="Offer link"
                aria-label="Offer link"
                class="dashboard-offers__link"
              >
                {{ scope.row.name }}
              </router-link>
            </template>
          </el-table-column>

          <el-table-column label="Published" width="80px">
            <template #default="scope">
              <p class="dashboard-offers__status">
                {{ scope.row.status ? 'Yes' : 'No (Draft)' }}
              </p>
            </template>
          </el-table-column>

          <el-table-column label="Price" width="120px">
            <template #default="scope">
              <p class="dashboard-offers__price">
                {{ formatPrice(scope.row.price) }}
              </p>
            </template>
          </el-table-column>

          <el-table-column label="Location" width="200px">
            <template #default="scope">
              <p class="dashboard-offers__location" v-html="getFullLocation(scope.row)" />
            </template>
          </el-table-column>

          <el-table-column label="Actions" width="140px">
            <template #default="scope">
              <div class="dashboard-offers__actions">
                <el-button
                  type="primary" 
                  :icon="EditIcon" 
                  circle 
                  @click="editOffer(scope.row.id)"
                  title="Edit offer from favorites list"
                  aria-label="Edit offer from favorites list"
                />
                <el-button 
                  type="danger" 
                  :icon="DeleteIcon" 
                  circle 
                  @click="tryToDeleteOffer(scope.row.id)"
                  title="Delete offer from favorites list"
                  aria-label="Delete offer from favorites list"
                />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <div class="dashboard-offers__pagination" v-if="offersList.length">
        <el-pagination 
          layout="prev, pager, next" 
          :total="totalCount"
          :page-count="totalPages"
          @current-change="setPage($event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { ElNotification, ElMessageBox } from 'element-plus';
import { Delete as DeleteIcon, EditPen as EditIcon } from '@element-plus/icons-vue';
import { prepareParamsQuery } from '@/helpers/filters';
import { FullFavOffer, Offer, OfferGallery } from '@/types/Offer';
import { formatPrice } from '@/helpers/price';
import { getImagePath } from '@/helpers/images';
import { useRouter } from 'vue-router';

import offer from '@/api/services/offer';

// Components
import DashboardHeader from '@/components/Dashboard/DashboardHeader/DashboardHeader.vue';
import { useUserStore } from '@/stores/user';

export default defineComponent({
  name: 'DashboardOffers',
  components: {
    DashboardHeader,
  },
  setup() {
    const offersList = ref<FullFavOffer[]>([]);
    const totalPages = ref(0);
    const perPage = ref(0);
    const totalCount = ref(0);
    const loading = ref(true);
    const dialogVisible = ref(false);
    const activePage = ref(1);
    const userStore = useUserStore();
    const router = useRouter();
    const userId = computed(() => userStore.user?.id);

    const searchOffers = async (page: number = 1) => {
      const queryParams = prepareParamsQuery({ page, userId: userId.value });
      loading.value = true;

      try {
        const { data } = await offer.getUserOffers(queryParams);
        offersList.value = data.data;
        perPage.value = data.limit;
        totalCount.value = data.totalCount;
        totalPages.value = data.totalPages;
        activePage.value = page;
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      } finally {
        loading.value = false;
      }
    }

    const setPage = (page: number): void => {
      searchOffers(page);
    }

    const tryToDeleteOffer = async (questionId: number) => {
      try {
        await ElMessageBox.confirm(
          'You will permanently delete this offer! Continue?',
          'Delete Question',
          {
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
        );

        deleteOffer(questionId);
      } catch (error) {
        return;
      }
    };

    const deleteOffer = async (offerId: number) => {
      try {
        await offer.removeOffer(offerId);
        searchOffers(activePage.value)

        ElNotification({
          title: `Success`,
          type: 'success',
          message: `Your offer has beed deleted!`,
        });
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      }
    };

    const hasImages = (photos: OfferGallery[]) => {
      return photos && photos.length > 0;
    };

    const getMainImage = (photos: OfferGallery[]) => {
      return photos.find((photo: OfferGallery) => photo.is_primary)?.url;
    };

    const getFullLocation = (offer: Offer) => {
     return `${offer.location_street}, ${offer.location_city}, <br/> ${offer.location_post_code}, ${offer.location_country}`
    };

    const redirectToNewOffer = () => {
      router.push('/create-offer');
    }

    const editOffer = (offerId: number) => {
      router.push(`/my-offers/${offerId}`);
    }

    onMounted(() => {
      searchOffers();
    });

    return {
      offersList,
      totalPages,
      perPage,
      totalCount,
      loading,
      dialogVisible,
      hasImages,
      deleteOffer,
      tryToDeleteOffer,
      setPage,
      formatPrice,
      getImagePath,
      getMainImage,
      getFullLocation,
      redirectToNewOffer,
      editOffer,
      DeleteIcon,
      EditIcon,
    };
  },
});

</script>

<style lang="scss" src="./DashboardOffers.scss" />
