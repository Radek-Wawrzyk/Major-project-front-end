<template>
  <div class="auth-details">
    <header class="auth-details__header">
      <h2 class="auth-details__header-title">Sign in to the FindYourFlat</h2>

      <p class="auth-details__header-text">
        Welcome back! Enter your details below.
      </p>

      <p class="auth-details__header-text">
        Don't have an account?

        <router-link
          class="auth-page__header-link"
          to="/auth/register"
          title="Go to the register page"
          aria-label="Go to the register page"
        >
          Get started
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
        <el-form-item label="Email" :error="errors.email">
          <el-input
            v-model="login.email"
            type="text"
            autocomplete="off"
            placeholder="johnDoe@example.com"
          />
        </el-form-item>
      </div>

      <div class="auth-details__form-field">
        <el-form-item label="Password" :error="errors.password">
          <el-input
            v-model="login.password"
            type="password"
            autocomplete="off"
            placeholder="Str@ngPassW@r1"
          />
        </el-form-item>
      </div>

      <div class="auth-details__form-field">
        <el-form-item class="auth-details__form-remember-me">
          <el-checkbox
            label="Remember me"
            name="type"
            v-model="login.rememberMe"
          />

          <router-link
            to="/auth/forgot-password"
            class="auth-details__form-link"
          >
            Forgot assword?
          </router-link>
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
            Login
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { string, object, boolean } from 'yup';
import { useForm, useField } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
import { ElNotification } from 'element-plus';
import type { AuthLogin } from '@/types/Auth';
import { Router, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

import AppLogo from '@/components/Global/AppLogo/AppLogo.vue';

export default defineComponent({
  components: { AppLogo },
  name: 'PageAuthLogin',
  setup() {
    const loading = ref<boolean>(false);
    const router: Router = useRouter();

    const {
      values: login,
      handleSubmit,
      errors,
    } = useForm({
      validationSchema: object({
        email: string().required().email().label('Email'),
        password: string().required().min(8).label('Password'),
        rememberMe: boolean(),
      }),
      initialValues: {
        email: '',
        password: '',
        rememberMe: false,
      },
    });

    useField('email');
    useField('password');

    const authStore = useAuthStore();
    const userStore = useUserStore();
    const redirectHome = (): void => {
      router.push('/dashboard');
    };

    const onSubmit = handleSubmit(async ({ email, password, rememberMe }) => {
      loading.value = true;

      try {
        const response: boolean = await authStore.signIn({
          email,
          password,
          rememberMe,
        } as AuthLogin);
        if (response) {
          await userStore.getMe();
          redirectHome();
        }
      } catch (error) {
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
      login,
      loading,
    };
  },
});
</script>
