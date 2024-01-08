<template>
  <div>
    <v-container
        id="container"
        class="d-md-block d-none"
        :class="isSignInPanelActive ? 'container right-panel-active' : 'container'"
    >
      <SignUpForm v-if="currentSignUpStep == 1" />
      <SignUpContinuationForm v-if="currentSignUpStep == 2" />
      <SignInForm />
      <div class="overlay-container">
        <div class="overlay">
          <OverlaySignUp />
          <OverlaySignIn />
        </div>
      </div>
    </v-container>
    <div class="d-md-none d-block" v-if="!registrPage">
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
      <h5 class="mt-3">Нет аккаунта? <span class="text-decoration-underline" style="cursor: pointer" @click="registrPage = !registrPage">Регистрация</span></h5>
    </div>
    <div class="d-md-none d-block" v-else>
      <v-form
          action="#"
          :class="{
        'px-2': $vuetify.breakpoint.smAndDown,
        'px-8': $vuetify.breakpoint.mdAndUp,
      }"
      >
        <h1 :class="{
        'pb-4 pt-10 sm-title': $vuetify.breakpoint.smAndDown,
        'pb-4 pt-10': $vuetify.breakpoint.mdAndUp,
      }">Детали регистрации</h1>
        <v-text-field
            placeholder="Имя"
            filled
            v-model="formData.firstName"
            prepend-inner-icon="mdi-account"
        ></v-text-field>
        <v-text-field
            placeholder="Фамилия"
            prepend-inner-icon="mdi-account"
            filled
            v-model="formData.lastName"
        ></v-text-field>
        <v-text-field
            placeholder="Email"
            prepend-inner-icon="mdi-email"
            filled
            v-model="formData.email"
        ></v-text-field>
        <v-text-field
            placeholder="Телефон"
            filled
            prepend-inner-icon="mdi-phone"
            v-model="formData.phoneNumber"
        ></v-text-field>

        <v-row>
          <v-col cols="12" md="6">
            <v-btn
                color="secondary"
                outlined
                tile
                block
                class="pa-6 font-weight-bold"
                elevation="0"
                @click="registrPage = !registrPage"
            >Назад</v-btn
            >
          </v-col>
          <v-col cols="12" md="6"
          ><v-btn
              color="info"
              dark
              tile
              block
              class="pa-6 font-weight-bold"
              elevation="0"
              @click="saveFormData()"
          >Регистрация</v-btn
          ></v-col
          >
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import SignInForm from "../components/auth-page/sign-in-form.vue";
import SignUpForm from "../components/auth-page/sign-up-form.vue";
import SignUpContinuationForm from "../components/auth-page/sign-up-continuation-form.vue";
import OverlaySignUp from "../components/auth-page/overlay-sign-up.vue";
import OverlaySignIn from "../components/auth-page/overlay-sign-in.vue";
export default {
  components: {
    SignInForm,
    SignUpForm,
    OverlaySignUp,
    OverlaySignIn,
    SignUpContinuationForm,
  },
  data() {
    return {
      registrPage: false,
    };
  },
  computed: {
    isSignInPanelActive: {
      get: function () {
        return this.$store.getters["authPageModule/getIsSignInPanelActive"];
      },
      set: function (newVal) {
        this.$store.commit("authPageModule/setIsSignInPanelActive", newVal);
      },
    },
    formData: {
      get: function () {
        return this.$store.getters["authPageModule/getFormData"];
      },
      set: function () {
        this.$store.commit("authPageModule/setFormData", this.formData);
      },
    },
    currentSignUpStep: {
      get: function () {
        return this.$store.getters["authPageModule/getCurrentSignUpStep"];
      },
      set: function (newVal) {
        this.$store.commit("authPageModule/setCurrentSignUpStep", newVal);
      },
    },
  },
  methods: {
    saveFormData() {
      this.$store.commit("authPageModule/setFormData", this.formData);
      this.$router.push("/cards");
    },
  }
};
</script>


<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

form {
  background-color: #ffffff;
  height: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  max-width: 100%;
  min-height: 680px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #ff416c;
  background: url("../assets/logo.jpeg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: right;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  background: url("../assets/logo.jpeg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: right;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: column;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
/* font sizes */
.sm-title {
  font-size: 18px;
}
.md-title {
  font-size: 44px;
}
.sm-description {
  font-size: 12px;
}
.md-description {
  font-size: 16px;
}
</style>