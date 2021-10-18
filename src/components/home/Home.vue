
<template>
  <div class="home--main">
    <div style="text-align: right">
      <button class="fav--btn" @click="this.$router.push({ name: 'myfav' })">
        My Favourite
      </button>
    </div>
    <div v-if="errMsg">{{ errMsg }}</div>
    <div v-else>
      <div class="search--main">
        <div v-for="(seasonData, head, index) in groupbySeason"
      :key="index" class="data"
    >
      <h2 class="head">Season: {{ head }}</h2>
      <EpisodeDesc :episodeLists="seasonData" />
    </div>
    </div>
  </div>
  </div>
</template>

<script>
/* eslint-disable */ 
import { useStore } from "vuex";
import EpisodeDesc from "./EpisodeDesc.vue";
import { computed, provide } from "vue";

export default {
  components: { EpisodeDesc },
  name: "home",
  data() {
    return {
      errMsg: "",
    };
  },

  setup() {
    // const searchInput = ref("");
    // const searchFilter = computed(() => {
    //   let episodeList = store.getters["content/getContentList"];
    //   let finalData = episodeList.filter((ele) => {
    //     if (
    //       ele.name.toLowerCase().startsWith(searchInput.value.toLowerCase())
    //     ) {
    //       return true;
    //     }
    //   });
    //   return finalData;
    // });
    provide("contentDataList", { name: "xzy" });

    const store = useStore();
    const groupbySeason = computed(() => {
      let episodeList = store.getters["content/getContentList"];
      let list = {};
      episodeList.forEach((ele) => {
        if (Object.keys(list).includes(ele.season.toString())) {
          list[ele.season] = [...list[ele.season], ele];
        } else {
          list[ele.season] = [ele];
        }
      });
      return list;
    });

    return { groupbySeason };
  },

  // computed: {
  //   ...mapGetters("content", ["getContentList"]),

  //   groupbySeason() {
  //     let episodeList = this.getContentList;
  //     let list = {};
  //     episodeList.forEach((ele) => {
  //       if (Object.keys(list).includes(ele.season.toString())) {
  //         list[ele.season] = [...list[ele.season], ele];
  //       } else {
  //         list[ele.season] = [ele];
  //       }
  //     });
  //     console.log({ list });
  //     return list;
  //   },
  // },

  methods: {
    mainFunc(name) {
      alert(name);
    },
    receiveEvent(name) {
      alert(name);
    },
  },
};
</script>

<style scoped>
.home--main {
  height: 80vh;
  overflow: auto;
}
.fav--btn {
  border: 0;
  background: lightskyblue;
  padding: 25px;
  widows: 25%;
  border-radius: 15px;
}
.search--input {
  padding: 10px;
  width: 50%;
}
.search--main {
  margin: 20px;
}
.head {
  font-weight: bold;
  padding-bottom: 20px;
  padding-top: 50px;
}
.data{
  border-bottom: 2px solid black;
  padding-bottom: 20px;
}
</style>