<template>
  <section 
    class="offer-form" 
    :class="[ 
      isPlain ? 'offer-form--is-plain' : false,
    ]"
  >
    <header class="offer-form__header">
      <app-avatar :user="offerAuthor" :is-checked="true" class="offer-form__header-avatar"/>
      
      <div class="offer-form__header-info">
        <router-link 
          class="offer-form__header-name"
          :to="`/host/${offerAuthor.id}`"
          aria-label="Go to the host page"
          title="Go to the host page"
        >
          {{ offerAuthor.first_name }} {{ offerAuthor.last_name }}
        </router-link>

        <span class="offer-form__header-tel">
          Tel: 
          <a :href="`tel:${offerAuthor.phone}`" class="offer-form__header-tel-link">
            {{ offerAuthor.phone }}
          </a>
        </span>
      </div>
    </header>

    <el-form
      status-icon
      label-position="top"
      class="offer-form__inner"
      @submit.prevent="onSubmit()"
    >
      <div class="offer-form__inner-field">
        <el-form-item label="Full name" :error="errors.full_name">
          <el-input
            v-model="questionForm.full_name"
            type="text"
            autocomplete="off"
            placeholder="John Doe"
          />
        </el-form-item>
      </div>

      <div class="offer-form__inner-field">
        <el-form-item label="Email" :error="errors.email">
          <el-input
            v-model="questionForm.email"
            type="text"
            autocomplete="off"
            placeholder="johnDoe@example.com"
          />
        </el-form-item>
      </div>

      <div class="offer-form__inner-field">
        <el-form-item label="Phone" :error="errors.phone">
          <el-input
            v-model="questionForm.phone"
            type="number"
            autocomplete="off"
            placeholder="09675656565"
          />
        </el-form-item>
      </div>

      <div class="offer-form__inner-field">
        <el-form-item label="Question" :error="errors.message">
          <el-input
            v-model="questionForm.message"
            type="textarea"
            autocomplete="off"
            placeholder="Hey I have a question..."
            maxlength="250"
            rows="6"
            size="large"
            show-word-limit
          />
        </el-form-item>
      </div>

      <div class="offer-form__inner-field">
        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            class="offer-form__inner-submit-button"
            :loading="loading"
            width="100%"
          >
            Ask question
          </el-button>
        </el-form-item>
      </div>

      <div class="offer-form__inner-field">
        <app-fav-button :offer-id="offerId" class="offer-form__inner-fav-button" />
      </div>
    </el-form>
  </section>
</template>

<script lang="ts">
import { useField, useForm } from 'vee-validate';
import { defineComponent, PropType, ref } from 'vue';
import { string, object, StringSchema } from 'yup';
import { ElNotification } from 'element-plus';
import question from '@/api/services/question';
import AppFavButton from '@/components/Global/AppFavButton/AppFavButton.vue'
import AppAvatar from '@/components/Global/AppAvatar/AppAvatar.vue'
import { User } from '@/types/User';

export default defineComponent({
  name: 'PageOfferForm',
  emits: ['on-submit'],
  components: {
    AppFavButton,
    AppAvatar,
  },
  props: {
    offerId: {
      type: Number as PropType<number>,
      required: true,
    },
    userId: {
      type: Number as PropType<number>,
      required: true,
    },
    offerAuthor: {
      type: Object as PropType<User>,
      required: true,
    },
    isPlain: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: () => false,
    },
  },
  setup(props, { emit }) {
    const loading = ref<boolean>(false);

    const { values: questionForm, handleSubmit, errors } = useForm({
      validationSchema: object({
        email: string().required().email().label('Email') as StringSchema<string>,
        phone: string().required().label('Phone number') as StringSchema<string>,
        full_name: string().required().label('Full name') as StringSchema<string>,
        message: string().required().label('Question') as StringSchema<string>,
      }),
      initialValues: {
        email: '',
        phone: '',
        full_name: '',
        message: '',
      },
    });

    useField('full_name');
    useField('email');
    useField('phone');
    useField('message');

    const onSubmit = handleSubmit(async ({ message, email, full_name, phone }) => {
      loading.value = true;

      emit('on-submit');

      try {

         await question.askQuestion({
          question: message,
          email,
          full_name,
          phone,
          offerId: props.offerId,
          userId: props.userId,
        });

        ElNotification({
          title: `Sucess`,
          type: 'success',
          message: `Your question has been sent to the author of this offer!`,
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

    return {
      loading,
      questionForm,
      errors,
      onSubmit,
    };
  },
});
</script>

<style lang="scss" src="./PageOfferForm.scss" />
