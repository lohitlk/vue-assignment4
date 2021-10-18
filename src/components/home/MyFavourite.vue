<template>
  <div class="fav--list">
    <button class="btn" style="cursor: pointer" @click="this.$router.back()">
      back
    </button>

    <h1>Favourites</h1>
    <div class="list--items">
      <div
        class="content--info"
        v-for="(episode, index) in favourite"
        :key="index"
      >
        <div class="card">
          <div
            class="star--svg"
            style="cursor: pointer"
            @click="addToFavourite(episode)"
          >
            <Star :added="checkAdded(episode)" />
          </div>
          <div
            class="content--info"
            style="cursor: pointer"
            @click="getContent(episode)"
          >
            <img
              :src="episodeImage(episode)"
              alt="images"
              style="width: 100%"
            />
            <p class="info" style="font-weight: 700">
              Episode {{ episode.number }}
            </p>
            <p class="info" style="font-weight: 500">{{ episode.name }}</p>
            <div class="desc info" v-html="episode.summary"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- <teleport to="body">
    <Modal v-if="showModal" @add-fav="checkAddFav" />
    </teleport> -->
  </div>
</template>

<script>
import Star from "../../svg/Star.vue";
import { mapGetters, mapMutations } from "vuex";
// import Modal from "../common/Modal1.vue";

export default {
  name: "Favourite",
  data() {
    return {
      // showModal: false,
    };
  },
  components: { Star },
  computed: {
    ...mapGetters(["getFavList"]),
    favourite() {
      return this.getFavList;
    },
  },
  methods: {
    ...mapMutations(["setFavList"]),
    episodeImage(episode) {
      return episode && episode.image && episode.image.medium;
    },
    addToFavourite(episode) {
      this.episodeDetail = episode;
      let finalArr = [];
        // console.log("true")
        if (this.checkAdded(episode)) {
          finalArr = this.getFavList.filter((ele) => {
            if (ele.id != this.episodeDetail.id) {
              return ele;
            }
          });
        } else {
          finalArr = [...this.getFavList, this.episodeDetail];
        }
        this.setFavList(finalArr);
      } ,
    checkAdded(currEpisode) {
      let status = this.getFavList.some((ele) => ele.id === currEpisode.id);
      return status;
    },
    getContent(episode) {
      console.log("episode||", episode);
      this.$router.push({
        name: "detailpage",
        params: { id: episode.id },
      });
    },
  },
};
</script>

<style scoped>
/* @import '../../style/style.css'; */
.list--items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.section {
  margin-bottom: 40px;
}
.card {
  height: 275px;
  width: 275px;
  border: 2px solid black;
  text-align: center;
}
.info {
  margin: 2px;
  font-size: 14px;
}
p {
  margin: 0px;
}
.desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 12px;
}
.content--info {
  margin: 20px;
}
.star--svg {
  text-align: end;
}
.btn {
  border: 0;
  background: lightskyblue;
  padding: 25px;
  widows: 25%;
  border-radius: 15px;
}
</style>