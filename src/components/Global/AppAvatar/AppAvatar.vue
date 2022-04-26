<template>
  <div class="app-avatar">
    <span class="app-avatar__check" v-if="isChecked" v-html="checkIcon" />
    <el-avatar :size="45" v-if="user.avatar_url" :src="imagePath(user.avatar_url)" />
    <el-avatar :size="45" v-else>
      {{ getDefaultInitials(user.first_name, user.last_name) }}
    </el-avatar>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { User } from '@/types/User';
import { getInitials } from '@/helpers/initials';
import { getImagePath } from '@/helpers/images';
import checkIcon from '@/assets/icons/check-mark.svg?raw';

export default defineComponent({
  name: 'AppAvatar',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
    isChecked: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: () => false,
    },
  },
  setup() {
    const getDefaultInitials = (firstName: string, lastName: string) => getInitials(firstName, lastName);
    const imagePath = (imagePath: string) => getImagePath(imagePath);

    return {
      getDefaultInitials,
      imagePath,
      checkIcon,
    };
  },
});
</script>

<style lang="scss" src="./AppAvatar.scss" />
