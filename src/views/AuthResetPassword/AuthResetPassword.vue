<template>
  <div class="auth-details">
    <header class="auth-details__header">
      <h2 class="auth-details__header-title">Reset Password</h2>

      <p class="auth-details__header-text">Please enter your new password!</p>

      <p class="auth-details__header-text">
        <router-link
          class="auth-page__header-link"
          to="/auth/login"
          title="Go to the login page"
          aria-label="Go to the login page"
        >
          Back to the login page
        </router-link>
      </p>
    </header>

    <el-form
      status-icon
      label-position="top"
      class="auth-details__form"
      @submit.prevent="onSubmit()"
    >
      <div class="auth-details__form-field">
        <el-form-item label="Password" :error="errors.password">
          <el-input
            v-model="resetPassword.password"
            type="password"
            autocomplete="off"
            placeholder="Str@ngPassW@r1"
            show-password
          />
        </el-form-item>
      </div>

      <div class="auth-details__form-field">
        <el-form-item
          label="Repeat password"
          :error="errors.passwordConfirmation"
        >
          <el-input
            v-model="resetPassword.passwordConfirmation"
            type="password"
            autocomplete="off"
            placeholder="Repeat Str@ngPassW@r1"
            show-password
          />
        </el-form-item>
      </div>

      <div class="auth-details__form-field">
        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            class="auth-details__form-submit-button"
            :loading="loading"
          >
            Reset password
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { string, object, ref as yupRef, StringSchema } from 'yup';
import { useForm, useField } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
import { ElNotification } from 'element-plus';

import AppLogo from '@/components/Global/AppLogo/AppLogo.vue';
import { AxiosError } from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { AuthResetPassword } from '@/types/Auth';

export default defineComponent({
  components: { AppLogo },
  name: 'PageAuthResetPassword',
  setup() {
    const loading = ref<boolean>(false);
    const router = useRouter();
    const route = useRoute();
    const token = computed(() => route.query.token);

    const {
      values: resetPassword,
      handleSubmit,
      errors,
    } = useForm({
      validationSchema: object({
        password: string()
          .required()
          .min(8)
          .label('Password') as StringSchema<string>,
        passwordConfirmation: string()
          .required()
          .min(8)
          .label('Repeat password')
          .oneOf([yupRef('password'), null], 'Passwords must match'),
      }),
      initialValues: {
        password: '',
        passwordConfirmation: '',
      },
    });

    useField('password');
    useField('passwordConfirmation');

    const authStore = useAuthStore();
    const redirectLogin = (): void => {
      router.push('/auth/login');
    };

    const onSubmit = handleSubmit(async ({ password }) => {
      loading.value = true;

      try {
        const response = await authStore.resetPassword({
          password,
          token: token.value,
        } as AuthResetPassword);
        if (response) {
          redirectLogin();
          ElNotification({
            title: 'Success',
            type: 'success',
            message: `You have successfuly changed your password!`,
          });
        }
      } catch (error: AxiosError | any) {
        ElNotification({
          title: `Error: ${
            error.response.data ? error.response.data.error : ''
          }`,
          type: 'error',
          message: `${
            error.response.data ? error.response.data.message : error
          }`,
        });
      } finally {
        loading.value = false;
      }
    });

    return {
      errors,
      onSubmit,
      resetPassword,
      loading,
      token,
    };
  },
});
</script>
