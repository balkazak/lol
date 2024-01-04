<template>
  <div  class="overlay-panel overlay-right">
    <v-btn
      color="info"
      dark
      rounded
       :class="{
        'pa-4 my-10 font-weight-bold': $vuetify.breakpoint.smAndDown,
        'pa-6 my-10 font-weight-bold': $vuetify.breakpoint.mdAndUp,
      }"
      elevation="0"
      @click="isSignInPanelActive = true"
    >
      Регистрация
    </v-btn>
  </div>
</template>



<script>
export default {
  computed: {
    isSignInPanelActive: {
      get: function () {
        return this.$store.getters["authPageModule/getIsSignInPanelActive"];
      },
      set: function (newVal) {
        this.$store.commit("authPageModule/setIsSignInPanelActive", newVal);
      },
    },
  },
};
</script>


<style scoped>
.overlay-right {
  right: 0;
  transform: translateX(0);
}
.overlay {
  background: red;
}

</style>