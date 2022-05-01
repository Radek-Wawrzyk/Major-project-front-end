<template>
  <div class="dashboard-settings" v-if="user">
    <div class="container">
      <dashboard-header title="My Account">
        <template v-slot:headerRight>
          <el-button @click="deleteAccount()" type="danger" plain>
            Delete account
          </el-button>
        </template>
      </dashboard-header>

      <el-card class="dashboard-settings__card">
        <template v-slot:header>
          <h2 class="dashboard-settings__card-heading">Basic information</h2>
        </template>

        <dashboard-settings-account :user="user" />
      </el-card>

      <el-card class="dashboard-settings__card">
        <template v-slot:header>
          <h2 class="dashboard-settings__card-heading">Change password</h2>
        </template>

        <dashboard-settings-password />
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { ElMessageBox } from 'element-plus';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

// Components
import DashboardHeader from '@/components/Dashboard/DashboardHeader/DashboardHeader.vue';
import DashboardSettingsPassword from '@/components/Dashboard/DashboardSettingsPassword/DashboardSettingsPassword.vue';
import DashboardSettingsAccount from '@/components/Dashboard/DashboardSettingsAccount/DashboardSettingsAccount.vue';
import { default as userService } from '@/api/services/user';

export default defineComponent({
  name: 'DashboardSettings',
  components: {
    DashboardHeader,
    DashboardSettingsPassword,
    DashboardSettingsAccount,
  },
  setup() {
    const userStore = useUserStore();
    const authStore = useAuthStore();
    const { user } = storeToRefs(userStore);

    const deleteAccount = async () => {
      try {
        await ElMessageBox.confirm(
          'You will permanently delete your account! Continue?',
          'Delete Account',
          {
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            type: 'warning',
          },
        );

        await userService.deleteAccount();
        authStore.logout();
      } catch (err) {
        return;
      }
    };

    return {
      deleteAccount,
      user,
    };
  },
});
</script>

<style lang="scss" src="./DashboardSettings.scss" />
