<template>
  <div class="app-navigation-avatar">
    <el-avatar
      :size="45"
      v-if="user.avatar_url"
      :src="imagePath(user.avatar_url)"
    />
    <el-avatar :size="45" v-else>
      {{ getDefaultInitials(user.first_name, user.last_name) }}
    </el-avatar>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { User } from '@/types/User';
import { getInitials } from '@/helpers/initials';
import { getImagePath } from '@/helpers/images';

export default defineComponent({
  name: 'AppNavigationAvatar',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  setup() {
    const getDefaultInitials = (firstName: string, lastName: string) =>
      getInitials(firstName, lastName);
    const imagePath = (imagePath: string) => getImagePath(imagePath);

    return {
      getDefaultInitials,
      imagePath,
    };
  },
});
</script>
