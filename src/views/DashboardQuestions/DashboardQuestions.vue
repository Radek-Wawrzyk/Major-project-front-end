<template>
  <div class="dashboard-questions">
    <div class="container">
      <dashboard-header title="Questions" />

      <el-card class="no-mobile-padding">
        <el-table :data="questionList" v-loading="loading" table-layout="auto">
          <el-table-column label="Full name">
            <template #default="scope">
              <p class="dashboard-questions__text">
                {{ scope.row.full_name }}
              </p>
            </template>
          </el-table-column>

          <el-table-column label="Email">
            <template #default="scope">
              <a 
                :href="`mailto:${scope.row.email}`"
                title="Email"
                aria-label="Email"
                class="dashboard-questions__link"
              >
                {{ scope.row.email }}
              </a>
            </template>
          </el-table-column>

          <el-table-column label="Phone" width="160px">
            <template #default="scope">
              <a 
                :href="`tel:${scope.row.phone}`"
                title="Phone"
                aria-label="Phone"
                class="dashboard-questions__link"
              >
                {{ scope.row.phone }}
              </a>
            </template>
          </el-table-column>

          <el-table-column label="Asked date" width="160px">
            <template #default="scope">
              <p class="dashboard-questions__text">
                {{ getDate(scope.row.created_at) }}
              </p>
            </template>
          </el-table-column>

          <el-table-column label="Actions" width="160px">
            <template #default="scope">
              <el-button 
                type="primary" 
                :icon="PointerIcon" 
                circle 
                @click="setDialog(scope.row, true)"
                title="See full question"
                aria-label="See full question"
              />
        
              <el-button 
                type="danger" 
                :icon="DeleteIcon" 
                circle 
                @click="tryToDeleteQuestion(scope.row.id)"
                title="Delete question"
                aria-label="Delete question"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <div class="dashboard-questions__pagination" v-if="questionList.length">
        <el-pagination 
          layout="prev, pager, next" 
          :total="totalCount"
          :page-count="totalPages"
          @current-change="setPage($event)"
        />
      </div>
    </div>
    
    <teleport to="body">
      <el-dialog 
        v-model="dialogVisible" 
        title="Question details"

      >
        <ul class="dashboard-questions-details">
          <li class="dashboard-questions-details__item">
            <p class="dashboard-questions-details__item-label">
              Related offer:
            </p>

            <p class="dashboard-questions-details__item-value">
              {{ activeQuestion?.offer.name }}
            </p>
          </li>

          <li class="dashboard-questions-details__item">
            <p class="dashboard-questions-details__item-label">
              Full name:
            </p>

            <p class="dashboard-questions-details__item-value">
              {{ activeQuestion?.full_name }}
            </p>
          </li>

          <li class="dashboard-questions-details__item">
            <p class="dashboard-questions-details__item-label">
              Email:
            </p>

            <a 
              :href="`mailto:${activeQuestion?.email}`"
              title="Email"
              aria-label="Email"
              class="dashboard-questions-details__item-link"
            >
              {{ activeQuestion?.email }}
            </a>
          </li>

          <li class="dashboard-questions-details__item">
            <p class="dashboard-questions-details__item-label">
              Phone:
            </p>

             <a 
              :href="`tel:${activeQuestion?.phone}`"
              title="Phone"
              aria-label="Phone"
              class="dashboard-questions-details__item-link"
            >
              {{ activeQuestion?.phone }}
            </a>
          </li>

          <li class="dashboard-questions-details__item">
            <p class="dashboard-questions-details__item-label">
              Asked:
            </p>

            <p class="dashboard-questions-details__item-value">
              {{ getDate(activeQuestion?.created_at) }}
            </p>
          </li>

          <li class="dashboard-questions-details__item">
            <p class="dashboard-questions-details__item-label">
              Question
            </p>

            <p class="dashboard-questions-details__item-value">
              {{ activeQuestion?.question }}
            </p>
          </li>
        </ul>

        <template #footer>
          <span class="dashboard-questions-actions">
            <el-button 
              type="primary"
              @click="setDialog(null!, false)"
              class="dashboard-questions-actions__button"
            >
              Close
            </el-button>
          </span>
        </template>
      </el-dialog>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Question } from '@/types/Question';
import { ElNotification, ElMessageBox } from 'element-plus';
import { Delete as DeleteIcon, Pointer as PointerIcon } from '@element-plus/icons-vue';

import dayjs from 'dayjs';
import question from '@/api/services/question';

// Components
import DashboardHeader from '@/components/Dashboard/DashboardHeader/DashboardHeader.vue';
import { prepareParamsQuery } from '@/helpers/filters';

export default defineComponent({
  name: 'DashboardQuestions',
  components: {
    DashboardHeader,
  },
  setup() {
    const questionList = ref<Question[]>([]);
    const totalPages = ref(0);
    const perPage = ref(0);
    const totalCount = ref(0);
    const loading = ref(true);
    const dialogVisible = ref(false);
    const activeQuestion = ref<null | Question>(null);
    const activePage = ref(1);

    const setDialog = (question: Question, toggleStatus = !dialogVisible.value): void => {
      dialogVisible.value = toggleStatus;

      if (!!question.id) activeQuestion.value = null;
      activeQuestion.value = question;
    };

    const searchQuestions = async (page: number = 1) => {
      const queryParams = prepareParamsQuery({ page });
      loading.value = true;

      try {
        const { data } = await question.getAllQuestions(queryParams);
        questionList.value = data.data;
        perPage.value = data.limit;
        totalCount.value = data.totalCount;
        totalPages.value = data.totalPages;
        activePage.value = page;
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      } finally {
        // loading.close()
        loading.value = false;
      }
    }

    const setPage = (page: number): void => {
      searchQuestions(page);
    }

    const tryToDeleteQuestion = async (questionId: number) => {
      try {
        await ElMessageBox.confirm(
          'You will permanently delete this question! Continue?',
          'Delete Question',
          {
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
        );

        deleteQuestion(questionId);
      } catch (error) {
        return;
      }
    };

    const deleteQuestion = async (questionId: number) => {
      try {
        await question.removeQuestion(questionId);
        searchQuestions(activePage.value)

        ElNotification({
          title: `Success`,
          type: 'success',
          message: `You have deleted that question!`,
        });
      } catch (error) {
        ElNotification({
          title: `Error: ${error.response.data ? error.response.data.error : ''}`,
          type: 'error',
          message: `${error.response.data ? error.response.data.message : error}`,
        });
      }
    };

    const getDate = (rawDate: Date) => {
      return dayjs(rawDate).format('MMMM DD, YYYY')
    };

    onMounted(() => {
      searchQuestions();
    });

    return {
      questionList,
      totalPages,
      perPage,
      totalCount,
      loading,
      dialogVisible,
      activeQuestion,
      getDate,
      deleteQuestion,
      tryToDeleteQuestion,
      setPage,
      setDialog,
      DeleteIcon,
      PointerIcon,
    };
  },
});

</script>

<style lang="scss" src="./DashboardQuestions.scss" />
