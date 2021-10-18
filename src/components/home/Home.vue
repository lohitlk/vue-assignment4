<template>
  <div class="home--main" @scroll="scrollFunc">
    <div class="btn1">
      <div style="text-align: right">
        <button class="fav--btn" style="cursor:pointer" @click="this.$router.push({ name: 'Favourite' })">
          My Favourite
        </button>
      </div>
    </div>
    <div v-if="errMsg">{{ errMsg }}</div>
    <div v-else>
      <h1>Season Listing</h1>
      <div class="container-main">
        <div
          class="container-section"
          v-for="(seasonData, index) in groupbySeason"
          :key="index"
        > 
        <h2>Season {{seasonData[index].season}}</h2>
          <EpisodeDesc :episodeLists="seasonData"> </EpisodeDesc>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
// import { useStore } from "vuex";
import EpisodeDesc from "./EpisodeDesc.vue";

export default {
  components: { EpisodeDesc },
  name: "home",
  data() {
    return {
      errMsg: "",
      episodeLists: [],
    };
  },
  computed: {
    // ...mapGetters(["getContentList"]),
    groupbySeason() {
      let episodeLists = this.$store.getters.getContentList;
    //   console.log("getters",this.$store.getters.getContentList)
      let list = {};

      episodeLists.forEach((ele) => {
        if (Object.keys(list).includes(ele.season.toString())) {
          list[ele.season] = [...list[ele.season], ele];
        } else {
          list[ele.season] = [ele];
        }
      });
      console.log("list", list);
      return list;
    },
  },
};
</script>
<style>
.home--main {
  height: 80vh;
  overflow: auto;
}

.fav--btn {
  padding: 15px;
  border-radius: 15px;
  border: 0;
  background: skyblue;
}
</style>