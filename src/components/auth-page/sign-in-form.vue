<template>
  <div class="form-container sign-in-container mt-12">
    <v-form
      action="#"
      :class="{
        'px-2': $vuetify.breakpoint.smAndDown,
        'px-8': $vuetify.breakpoint.mdAndUp,
      }"
    >
      <h1 class="pb-8 font-weight-bold">Войти</h1>
      <v-text-field
        prepend-inner-icon="mdi-account"
        placeholder="Логин"
        filled
      ></v-text-field>
      <v-text-field
        prepend-inner-icon="mdi-lock"
        placeholder="Пароль"
        type="password"
        filled
      ></v-text-field>
      <v-btn
        color="info"
        block
        dark
        tile
        class="pa-6 font-weight-bold"
        elevation="0"
        @click="login()"
        >Войти</v-btn
      >
<!--      <v-row class="justify-center py-10">-->
<!--        <span-->
<!--          :class="{-->
<!--            'text-secondary forgot-password-sm': $vuetify.breakpoint.smAndDown,-->
<!--            'text-secondary forgot-password-md': $vuetify.breakpoint.mdAndUp,-->
<!--          }"-->
<!--          >Forgot your password?</span-->
<!--        >-->
<!--      </v-row>-->
    </v-form>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    login() {
      this.$store.dispatch("authPageModule/loginAndSaveToken", {
        username: this.username,
        asswor: this.password,
      });
    },
  },
};
</script>
<style scoped>
.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
  top: 20%;
}
.team-img {
  width: 50%;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}
.forgot-password-sm {
  font-size: 12px;
}
.forgot-password-md {
  font-size: 15px;
}
</style>