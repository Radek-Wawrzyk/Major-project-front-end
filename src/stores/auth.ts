import auth from '@/api/services/auth';
import { defineStore, acceptHMRUpdate } from 'pinia'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode';
import { AuthForgetPassword, AuthLogin, AuthRegister, AuthResetPassword, AuthTokenizedUser } from '@/types/Auth';
import router from '@/router';

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

    checkSession(): boolean {
      if (!this.token) return false;

      const decodedToken: AuthTokenizedUser = jwtDecode(this.token);
      const currentTimestamp: number = Math.floor(Date.now() / 1000);

      if (currentTimestamp >= decodedToken.exp) {
        this.logout();
        return false;
      }

      return true;
    },

    logout(): void {
      this.token = null;
      Cookies.remove('token');
      router.push('/');
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
