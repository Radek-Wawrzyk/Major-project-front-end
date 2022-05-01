<template>
  <section class="dashboard-settings-account">
    <div class="dashboard-settings-account__avatar">
      <el-upload
        class="dashboard-settings-account__avatar-input"
        :http-request="uploadAvatar"
        :show-file-list="false"
        :auto-upload="true"
        action=""
      >
        <img 
          class="dashboard-settings-account__avatar-image" 
          alt="" 
          :src="getImagePath(user.avatar_url)"
          v-if="!uploadSuccess && !newImageUrl && user.avatar_url"
        />

        <img 
          class="dashboard-settings-account__avatar-image" 
          alt="" 
          :src="getImagePath(newImageUrl)"
          v-else-if="uploadSuccess && newImageUrl"
        />

        <el-icon v-else  class="dashboard-settings-account__avatar-icon">
          <plus-icon width="40px" />
        </el-icon>
      </el-upload>

      <el-button 
        @click="deleteAvatar()" 
        plain 
        type="danger"
        class="dashboard-settings-account__avatar-button"
        v-if="user.avatar_url !== null"
      >
        Delete avatar
      </el-button>
    </div>

    <el-form
      status-icon
      label-position="top"
      class="dashboard-settings-account__form"
      @submit.prevent="onSubmit()"
    >
      <div class="dashboard-settings-account__form-field">
        <el-form-item label="First name" :error="errors.first_name">
          <el-input
            v-model="form.first_name"
            type="text"
            autocomplete="off"
            placeholder="John"
          />
        </el-form-item>
      </div>

      <div class="dashboard-settings-account__form-field">
        <el-form-item label="Last name" :error="errors.last_name">
          <el-input
            v-model="form.last_name"
            type="text"
            autocomplete="off"
            placeholder="Doe"
          />
        </el-form-item>
      </div>

      <div class="dashboard-settings-account__form-field">
        <el-form-item label="Email" :error="errors.email">
          <el-input
            v-model="form.email"
            type="mail"
            autocomplete="off"
            placeholder="John@Doe.com"
          />
        </el-form-item>
      </div>

      <div class="dashboard-settings-account__form-field">
        <el-form-item label="Phone" :error="errors.phone">
          <el-input
            v-model="form.phone"
            type="number"
            autocomplete="off"
            placeholder="07403047743"
          />
        </el-form-item>
      </div>

      <div class="dashboard-settings-account__form-field">
        <el-form-item label="Bio/Description" :error="errors.bio">
          <el-input
            v-model="form.bio"
            type="textarea"
            autocomplete="off"
            placeholder="Hey I my name is John..."
            maxlength="500"
            rows="6"
            size="large"
            show-word-limit
          />
        </el-form-item>
      </div>

      <div class="dashboard-settings-account__form-field">
        <el-button
          type="primary"
          native-type="submit"
          class="dashboard-settings-account__form-submit-button"
          :loading="loading"
        >
          Update details
        </el-button>
      </div>
    </el-form> 
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { UpdateUser, User } from '@/types/User';
import { string, object, ref as yupRef, StringSchema } from 'yup';
import { useForm, useField } from 'vee-validate';
import { ElNotification } from 'element-plus';
import { Plus as PlusIcon } from '@element-plus/icons-vue';
import { getImagePath } from '@/helpers/images';

export default defineComponent({
  name: 'DashboardSettingsAccount',
  components: {
    PlusIcon,
  },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  setup(props) {
    const userStore = useUserStore();
    const loading = ref(false);
    const { values: form, handleSubmit, errors } = useForm({
      validationSchema: object({
        first_name: string().required().label('First name') as StringSchema<string>,
        last_name: string().required().label('Last name') as StringSchema<string>,
        phone: string().required().label('Phone number') as StringSchema<string>,
        email: string().required().email().label('Email') as StringSchema<string>,
        bio: string().label('Bio/Description') as StringSchema<string | null>,
      }),
      initialValues: {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        bio: '',
      },
    });
    const uploadSuccess = ref(false);
    const newImageUrl = ref(undefined);

    useField('first_name');
    useField('last_name');
    useField('phone');
    useField('email');
    useField('bio');

    const onSubmit = handleSubmit(async (userDetails: UpdateUser) => {
      loading.value = true;

      try {
        await userStore.updateUser(userDetails);

        ElNotification({
          title: `Success`,
          type: 'success',
          message: `You have changed your user details!`,
        });
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      } finally {
        loading.value = false;
      }
    });

    const uploadAvatar = async (uploadDetails: any) => {
      try {
        let updatedUser = null;
        if (props.user.avatar_url) updatedUser = await userStore.updateAvatar(uploadDetails.file);
        else updatedUser = await userStore.uploadAvatar(uploadDetails.file);
        
        newImageUrl.value = updatedUser.avatar_url;
        uploadSuccess.value = true;
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      }
    }

    const deleteAvatar = async () => {
      try {
        await userStore.deleteAvatar();
        ElNotification({
          title: `Success`,
          type: 'success',
          message: `You have deleted your current avatar!`,
        });
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      }
    }

    onMounted(() => {
      Object.assign(form, props.user)
    });

    return {
      form,
      errors,
      loading,
      uploadSuccess,
      newImageUrl,
      onSubmit,
      uploadAvatar,
      getImagePath,
      deleteAvatar,
    };
  },
});
</script>

<style lang="scss" src="./DashboardSettingsAccount.scss" />
