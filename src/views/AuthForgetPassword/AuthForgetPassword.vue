<template>
  <div class="auth-details">
    <header class="auth-details__header">
      <h2 class="auth-details__header-title">
        Forget Password
      </h2>

      <p class="auth-details__header-text">
        Now you can change your password.
      </p>
    </header>

    <el-form
      status-icon
      label-position="top"
      class="auth-details__form"
      @submit.prevent="onSubmit()"
    >
      <div class="auth-details__form-field">
        <el-form-item label="Email" :error="errors.email">
          <el-input
            v-model="login.email"
            type="text"
            autocomplete="off"
            placeholder="john@doe.com"
          />
        </el-form-item>
      </div>

      <div class="auth-details__form-field">
        <el-form-item label="Repeat password" :error="errors.password">
          <el-input
            v-model="login.password"
            type="password"
            autocomplete="off"
            placeholder="Str@ngPassW@r1"
            show-password
          />
        </el-form-item>
      </div>

      <div class="auth-details__form-field">
        <el-form-item label="Password" :error="errors.passwordConfirmation">
          <el-input
            v-model="login.passwordConfirmation"
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
import { defineComponent, ref } from 'vue'
import { string, object, ref as yupRef, StringSchema } from 'yup';
import { useForm, useField } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
import { ElNotification } from 'element-plus';

import AppLogo from '@/components/Global/AppLogo/AppLogo.vue';
import { AxiosError } from 'axios';
import { Router, useRouter } from 'vue-router';
import { AuthForgetPassword } from '@/types/Auth';

export default defineComponent({
  components: { AppLogo },
  name: 'PageAuthForgetPassword',
  setup() {
    const loading = ref<boolean>(false);
    const router: Router = useRouter();
  
    const { values: login, handleSubmit, errors } = useForm({
      validationSchema: object({
        password: string().required().min(8).label('Password') as StringSchema<string>,
        email: string().required().email().label('Email') as StringSchema<string>,
        passwordConfirmation: string().required().min(8).label('Repeat password').oneOf([yupRef('password'), null], 'Passwords must match'),
      }),
      initialValues: {
        password: '',
        passwordConfirmation: '',
        email: '',
      },
    });

    useField('password');
    useField('passwordConfirmation');
    useField('email');

    const authStore = useAuthStore();
    const redirectLogin = (): void => {
      router.push('/auth/login');
    }

    const onSubmit = handleSubmit(async ({ password, email }) => {
      loading.value = true;

      try {
        const response = await authStore.forgetPassword({ password, email } as AuthForgetPassword);
        if (response) {
          redirectLogin();
          ElNotification({
            title: 'Success',
            type: 'success',
            message: `Check your mailbox, there should be a reset password link!`,
          });
        }
      } catch (error: AxiosError | any) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
        
      } finally {
        loading.value = false;
      }
    });

    return {
      errors,
      onSubmit,
      login,
      loading,
    };
  },
})
</script>
