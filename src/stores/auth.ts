import auth from '@/api/services/auth';
import { defineStore, acceptHMRUpdate } from 'pinia'
import Cookies from 'js-cookie'
import { AuthForgetPassword, AuthLogin, AuthRegister, AuthResetPassword } from '@/types/Auth';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: Cookies.get('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => {
      return !!state.token
    },
  },
  actions: {
    async signIn({ email, password, rememberMe } : AuthLogin): Promise<boolean> {
      try {
        const response = await auth.login({
          email,
          password,
        });
        
        console.log(rememberMe)
        // Set JWT cookie for authorization & save token to the state
        if (rememberMe) Cookies.set('token', response.data.access_token);
        this.token = response.data.access_token;

        return true;
      } catch (error) {
        throw (error);
      }
    },
    async signUp(registerDetails : AuthRegister): Promise<boolean> {
      try {
        await auth.register(registerDetails);

        return true;
      } catch (error) {
        throw (error);
      }
    },
    async forgetPassword(forgetPasswordDetails: AuthForgetPassword): Promise<boolean> {
      try {
        await auth.forgotPassword(forgetPasswordDetails);
        return true;
      } catch (error) {
        throw (error);
      }
    },
    async resetPassword(resetPasswordDetails: AuthResetPassword): Promise<boolean> {
      try {
        await auth.resetPassword(resetPasswordDetails);
        return true;
      } catch (error) {
        throw (error);
      }
    },
    logout() {
      this.token = null;
      Cookies.remove('token');
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
