<template>
  <div class="auth-details">
    <header class="auth-details__header">
      <h2 class="auth-details__header-title">
        Sign up to the FindYourFlat
      </h2>

      <p class="auth-details__header-text">
        Please enter your details below.
      </p>
    </header>

    <el-form
      status-icon
      label-position="top"
      class="auth-details__form"
      @submit.prevent="onSubmit()"
    >
      <div class="auth-details__form-field">
        <el-form-item label="First name" :error="errors.firstName">
          <el-input
            v-model="register.firstName"
            type="text"
            autocomplete="off"
            placeholder="John"
          />
        </el-form-item>
      </div>

      <div class="auth-details__form-field">
        <el-form-item label="Last name" :error="errors.lastName">
          <el-input
            v-model="register.lastName"
            type="text"
            autocomplete="off"
            placeholder="Doe"
          />
        </el-form-item>
      </div>

      <div class="auth-details__form-field">
        <el-form-item label="Email" :error="errors.email">
          <el-input
            v-model="register.email"
            type="text"
            autocomplete="off"
            placeholder="johnDoe@example.com"
          />
        </el-form-item>
      </div>

      <div class="auth-details__form-field">
        <el-form-item label="Password" :error="errors.password">
          <el-input
            v-model="register.password"
            type="password"
            autocomplete="off"
            placeholder="Str@ngPassW@r1"
          />
        </el-form-item>
      </div>

      <div class="auth-details__form-field">
        <el-form-item label="Phone" :error="errors.phone">
          <el-input
            v-model="register.phone"
            type="number"
            autocomplete="off"
            placeholder="0704303204"
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
            Register
          </el-button>

          <p class="auth-details__form-register-info">
            By registering, I agree to
            <a href="#" class="auth-details__form-link">Minimal Terms</a>
            of Service and <a href="#" class="auth-details__form-link">Privacy Policy.</a>
          </p>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { string, object, number } from 'yup';
import { useForm, useField } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
import { ElNotification } from 'element-plus';
import { AuthRegister } from '@/types/Auth';

import AppLogo from '@/components/Global/AppLogo/AppLogo.vue';
import { AxiosError } from 'axios';
import { Router, useRouter } from 'vue-router';

export default defineComponent({
  components: { AppLogo },
  name: 'PageAuthRegister',
  setup() {
    const loading = ref<boolean>(false);
    const router: Router = useRouter();
  
    const { values: register, handleSubmit, errors } = useForm({
      validationSchema: object({
        firstName: string().required().label('First name'),
        lastName: string().required().label('Last name'),
        phone: number().required().label('Phone number'),
        email: string().required().email().label('Email'),
        password: string().required().min(8).label('Password'),
      }),
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: undefined,
      },
    });

    useField('firstName');
    useField('lastName');
    useField('email');
    useField('password');
    useField('phone');

    const authStore = useAuthStore();
    const redirectLogin = (): void => {
      router.push('/auth/login');
    }

    const onSubmit = handleSubmit(async (registerDetails) => {
      loading.value = true;

      try {
        const response: boolean = await authStore.signUp(registerDetails as AuthRegister);
        if (response) {
          redirectLogin();
          ElNotification({
            title: 'Success',
            type: 'success',
            message: `You have succesfully created your account!`,
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
      register,
      loading,
    };
  },
})
</script>
