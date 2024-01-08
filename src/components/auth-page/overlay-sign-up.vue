<template>
  <div class="overlay-panel overlay-left">

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
.overlay-left {
  transform: translateX(-20%);
}
</style>