import user from '@/api/services/user';
import { UserStoreState } from '@/types/User';
import { defineStore, acceptHMRUpdate } from 'pinia'


export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: undefined,
  } as UserStoreState),
  actions: {
    async getMe() {
      try {
        const { data } = await user.getUser();

        this.user = data;
        return true;
      } catch (error) {
        throw (error);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
