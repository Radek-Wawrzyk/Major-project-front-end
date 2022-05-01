<template>
  <section class="dashboard-settings-password">
    <el-form
      status-icon
      label-position="top"
      class="dashboard-settings-password__form"
      @submit.prevent="onSubmit()"
    >
      <div class="dashboard-settings-password__form-field">
        <el-form-item label="New password" :error="errors.password">
          <el-input
            v-model="form.password"
            type="password"
            autocomplete="off"
            placeholder="***********"
            show-password
          />
        </el-form-item>
      </div>

      <div class="dashboard-settings-password__form-field">
        <el-form-item
          label="Repeat password"
          :error="errors.passwordConfirmation"
        >
          <el-input
            v-model="form.passwordConfirmation"
            type="password"
            autocomplete="off"
            placeholder="***********"
            show-password
          />
        </el-form-item>
      </div>

      <div class="dashboard-settings-password__form-field">
        <el-button
          type="primary"
          native-type="submit"
          class="dashboard-settings-password__form-submit-button"
          :loading="loading"
        >
          Change password
        </el-button>
      </div>
    </el-form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { string, object, ref as yupRef, StringSchema } from 'yup';
import { useForm, useField } from 'vee-validate';
import { ElNotification } from 'element-plus';
import user from '@/api/services/user';

export default defineComponent({
  name: 'DashboardSettingsPassword',
  setup() {
    const loading = ref<boolean>(false);
    const {
      values: form,
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

    const onSubmit = handleSubmit(async ({ password }) => {
      loading.value = true;

      try {
        await user.changePassword(password);
        ElNotification({
          title: `Success`,
          type: 'success',
          message: `You have changed your password`,
        });
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
      form,
      errors,
      loading,
      onSubmit,
    };
  },
});
</script>

<style lang="scss" src="./DashboardSettingsPassword.scss" />
