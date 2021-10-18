<template>
  <div class="container">
    <div v-if="loading" class="loader--container">
      <div class="loader">
        <img src="@/assets/loader.gif" style="width: 30%" />
      </div>
    </div>
    <div v-else class="main">
      <router-view></router-view>
      <!-- <Home/> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      checkedData: [],
    };
  },
  computed: {
    ...mapGetters(["getLoading"]),
    loading() {
      return this.getLoading;
    },
    
  },
  created() {
    this.actInfo()
      .then((res) => {
        this.setContentList(res._embedded.episodes);
      })
      .catch((err) => {
        this.errMsg = err;
      });
  },
  methods: {
    // ...mapActions('content',['actInfo']),
    ...mapActions( ["actInfo"]),
    ...mapMutations(["setContentList"]),
  },
};
</script>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loader--container {
  background: rgb(128, 128, 128, 0.8);
  position: fixed;
  width: 100%;
  height: 100%;
}
.main {
  margin: 20px;
}
</style>
