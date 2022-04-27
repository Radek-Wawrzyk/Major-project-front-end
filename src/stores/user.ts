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
    addFavoriteOffer(favoriteOffer: any) {
      this.user?.favOffers.push(favoriteOffer);
    },
    removeFavoriteOffer(favoriteOfferId: number) {
      const favOffers = this.user?.favOffers;
      const newFavOffers = favOffers?.filter((offer) => offer.id !== favoriteOfferId);

      if (this.user?.favOffers && this.user?.favOffers.length) {
        this.user.favOffers = newFavOffers;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
