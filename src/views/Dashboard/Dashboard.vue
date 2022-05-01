<template>
  <div class="dashboard-page">
    <div class="container">
      <dashboard-header :title="dashboardTitle" />

      <div class="dashboard-page__content" v-if="dashboardDetails">
        <el-card class="dashboard-page__card">
          <template #header>
            <h2 class="dashboard-page__card-title">
              Number of offer views in the last month
            </h2>
          </template>

          <span class="dashboard-page__card-number">
            {{ dashboardDetails.monthlyNumberOfViews }}
          </span>
        </el-card>

        <el-card class="dashboard-page__card">
          <template #header>
            <h2 class="dashboard-page__card-title">
              Number of offer views in the last year
            </h2>
          </template>

          <span class="dashboard-page__card-number">
            {{ dashboardDetails.yearlyNumberOfViews }}
          </span>
        </el-card>

        <el-card class="dashboard-page__card">
          <template #header>
            <h2 class="dashboard-page__card-title">
              Percentage of question asked based on all views
            </h2>
          </template>

          <span class="dashboard-page__card-number">
            {{
              Math.round(dashboardDetails.percentageOfAllAppliedQuestionsEver)
            }}%
          </span>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import stats from '@/api/services/stats';
import { ElNotification } from 'element-plus';
import { DashboardStats } from '@/types/Stats';

export default defineComponent({
  name: 'PageDashboard',
  setup() {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    const dashboardTitle = computed(() => `Hey ${user?.value?.first_name}`);
    const dashboardDetails = ref<DashboardStats>();

    onMounted(async () => {
      try {
        const { data } = await stats.get();
        dashboardDetails.value = data;
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
      }
    });

    return {
      dashboardTitle,
      dashboardDetails,
    };
  },
});
</script>

<style lang="scss" src="./Dashboard.scss" />
