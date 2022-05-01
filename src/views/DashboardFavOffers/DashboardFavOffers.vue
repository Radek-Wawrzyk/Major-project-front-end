<template>
  <div class="dashboard-fav-offers">
    <div class="container">
      <dashboard-header title="Favorite offers" />

      <el-card class="no-mobile-padding">
        <el-table :data="offersList" v-loading="loading" table-layout="auto">
          <el-table-column label="Image" width="60px">
            <template #default="scope">
              <figure class="dashboard-fav-offers__image">
                <img 
                  class="dashboard-fav-offers__image-inner"
                  alt=""
                  :src="getImagePath(getMainImage(scope.row.offer.photos))"
                  v-if="hasImages(scope.row.offer.photos)"
                />

                <img 
                  class="dashboard-fav-offers__image-inner"
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
                :to="`/offers/${scope.row.offer.id}`"
                title="Offer link"
                aria-label="Offer link"
                class="dashboard-fav-offers__link"
              >
                {{ scope.row.offer.name }}
              </router-link>
            </template>
          </el-table-column>

          <el-table-column label="Price" width="120px">
            <template #default="scope">
              <p class="dashboard-fav-offers__price">
                {{ formatPrice(scope.row.offer.price) }}
              </p>
            </template>
          </el-table-column>

          <el-table-column label="Location" width="200px">
            <template #default="scope">
              <p class="dashboard-fav-offers__location">
                {{ getFullLocation(scope.row.offer)}}
              </p>
            </template>
          </el-table-column>

          <el-table-column label="Actions" width="120px">
            <template #default="scope">
              <el-button 
                type="danger" 
                :icon="DeleteIcon" 
                circle 
                @click="tryToDeleteOffer(scope.row.id)"
                title="Delete offer from favorites list"
                aria-label="Delete offer from favorites list"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <div class="dashboard-fav-offers__pagination" v-if="offersList.length">
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
import { defineComponent, onMounted, ref } from 'vue';
import { ElNotification, ElMessageBox } from 'element-plus';
import { Delete as DeleteIcon } from '@element-plus/icons-vue';
import { prepareParamsQuery } from '@/helpers/filters';
import { FullFavOffer, Offer, OfferGallery } from '@/types/Offer';
import { formatPrice } from '@/helpers/price';
import { getImagePath } from '@/helpers/images';

import favQuestion from '@/api/services/favQuestion';

// Components
import DashboardHeader from '@/components/Dashboard/DashboardHeader/DashboardHeader.vue';
import { useUserStore } from '@/stores/user';

export default defineComponent({
  name: 'DashboardFavOffers',
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

    const searchFavOffers = async (page: number = 1) => {
      const queryParams = prepareParamsQuery({ page });
      loading.value = true;

      try {
        const { data } = await favQuestion.getAllFavQuestions(queryParams);
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
      searchFavOffers(page);
    }

    const tryToDeleteOffer = async (questionId: number) => {
      try {
        await ElMessageBox.confirm(
          'You will remove this offer from your favorite list! Continue?',
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
        await favQuestion.removeFavQuestion(offerId);
        searchFavOffers(activePage.value)
        userStore.removeFavoriteOffer(offerId);

        ElNotification({
          title: `Success`,
          type: 'success',
          message: `Your offer has beed removed from favorites list!`,
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
     return `${offer.location_street}, ${offer.location_city}, ${offer.location_post_code}, ${offer.location_country}`
    };

    onMounted(() => {
      searchFavOffers();
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
      DeleteIcon,
    };
  },
});

</script>

<style lang="scss" src="./DashboardFavOffers.scss" />
