<template>
  <div class="dashboard-offer-photos">
    <header class="dashboard-offer-photos__header">
      <h1 class="dashboard-offer-photos__header-title">
        Manage your offer photos
      </h1>

      <p class="dashboard-offer-photos__header-text">
        The max limit of the photos is: <span>5</span>
      </p>

      <el-upload
        class="dashboard-offer-photos__upload"
        :http-request="uploadPhoto"
        :show-file-list="false"
        :auto-upload="true"
        action=""
        drag
      >
        <div class="dashboard-offer-photos__upload-content">
          <el-icon class="dashboard-offer-photos__upload-icon">
            <upload-filled-icon />
          </el-icon>

          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
        </div>
      </el-upload>
    </header>

    <ul class="dashboard-offer-photos__list">
      <li 
        class="dashboard-offer-photos__list-item"
        v-for="photo in state.photos"
        :key="photo.id"
      >
        <el-upload
          class="dashboard-offer-photos__list-upload"
          :http-request="($event: any) => updatePhoto($event, photo.id)"
          :show-file-list="false"
          :auto-upload="true"
          action=""
        >
          <img 
            class="dashboard-offer-photos__list-image" 
            :alt="photo.name" 
            :src="getImagePath(photo.url)"
          />
        </el-upload>

        <div class="dashboard-offer-photos__list-actions">
          <el-radio 
            :label="photo.id"
            v-model="state.mainImageId"
            size="large"
            name="main-image"
            @change="setAsPrimary"
          >
            Main Image
          </el-radio>

          <el-button 
            class="dashboard-offer-photos__list-remove" 
            @click="deleteImage(photo.id)"
            type="text"
          >
            Delete
          </el-button>
        </div>
      </li>
    </ul>

    <div class="dashboard-offer-photos__actions">
      <el-button
        type="default"
        class="ddashboard-offer-photos__prev-button"
        @click="goPrev()"
      >
        Go prev
      </el-button>

      <el-button
        type="primary"
        native-type="button"
        class="dashboard-offer-photos__finish-button"
        @click="goFinish()"
      >
        Finish
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import photo from '@/api/services/photo';
import { CreateOffer } from '@/types/Offer';
import { ElLoading, ElNotification } from 'element-plus';
import { defineComponent, onMounted, PropType, reactive } from 'vue';
import { UploadFilled as UploadFilledIcon } from '@element-plus/icons-vue';
import { getImagePath } from '@/helpers/images';
import { Photo } from '@/types/Photo';

export default defineComponent({
  name: 'DashboardOfferPhotos',
  emits: ['go-prev', 'go-finish'],
  components: {
    UploadFilledIcon,
  },
  props: {
    offer: {
      type: Object as PropType<CreateOffer>,
      required: true,
    },
    mode: {
      type: String as PropType<'edit' | 'create'>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      photos: <Photo[]>[],
      mainImageId: <number>0, 
    });

    const goFinish = () => {
      emit('go-finish');
    };
    
    const goPrev = () => {
      emit('go-prev');
    };

    const uploadPhoto = async (uploadDetails: any) => {
      try {
        const formData = new FormData();
        formData.append('image', uploadDetails.file);
        const { data } = await photo.upload(formData, props.offer.id  as number);

        if (state.photos.length === 0) {
          state.mainImageId = data.id;
        }

        state.photos.push(data);  
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      }
    }

    const updatePhoto = async (uploadDetails: any, photoId: number) => {
      try {
        const formData = new FormData();
        formData.append('image', uploadDetails.file);

        const { data } = await photo.update(formData, photoId);
        getAllPhotos(false);
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      }
    }

    const setAsPrimary = async (photoId: number) => {
      try {
        const { data } = await photo.setAsPrimary(props.offer.id as number, photoId);
        Object.assign(state.photos, data);
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      }
    }

    const deleteImage = async (photoId: number) => {
      console.log(photoId)
      try {
        await photo.delete(photoId);
        getAllPhotos(false);
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      }
    }

    const getAllPhotos = async (preloader: boolean = true) => {
      let loading: any;

      if (preloader) {
        loading = ElLoading.service({
          lock: true,
          background: "#ffffff",
        });
      }
      
      try {
        const { data } = await photo.getAll(props.offer.id as number);
        state.photos = data;

        state.mainImageId = data.find((photo: Photo) => photo.is_primary).id;
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      } finally {
        if (preloader) {
          setTimeout(() => {
            loading.close();
          }, 250);
        }
      }
    }

    onMounted(() => {
      if (props.mode === 'edit') {
        getAllPhotos();
      }
    });

    return {
      goFinish,
      goPrev,
      setAsPrimary,
      uploadPhoto,
      updatePhoto,
      getImagePath,
      deleteImage,
      state,
    };
  },
});
</script>

<style lang="scss" src="./DashboardOfferPhotos.scss" />
