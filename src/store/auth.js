import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    login(user) {
      // 在这里进行用户身份验证，例如从后端验证用户是否存在
      // 如果验证通过，将用户信息保存到状态中
      this.isAuthenticated = true;
      this.user = user;
    },
    logout() {
      // 退出登录时重置状态
      this.isAuthenticated = false;
      this.user = null;
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
  },
});