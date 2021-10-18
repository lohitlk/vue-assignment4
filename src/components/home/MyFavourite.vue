
<template>
  <div class="fav--list">
    <button class="btn" @click="this.$router.back()">back</button>

    <h1>Favourites</h1>
    <div class="list--items">
      <div
        class="content--info"
        v-for="(episode, index) in favourite"
        :key="index"
      >
      <div class="card">
        <div class="star--svg" @click="addToFavourite(episode)">
          <Star :added="checkAdded(episode)" />
        </div>
        <div class="content--info">
          <img :src="episodeImage(episode)" alt="images" style="width: 100%" />
          <p class="info" style="font-weight: 700">
            Episode {{ episode.number }}
          </p>
          <p class="info" style="font-weight: 500">{{ episode.name }}</p>
          <div class="desc info" v-html="episode.summary"></div>
        </div>
      </div>
      </div>
    </div>
     <teleport to="body">
    <Modal v-if="showModal" @add-fav="checkAddFav" />
    </teleport>
  </div>
</template>

<script>

import Star from "../../svg/Star.vue";
import { mapGetters,mapMutations  } from 'vuex';
import Modal from "../common/Modal1.vue";

export default {
  name: "Favourite",
  data(){
    return{
      showModal: false,
    }
  },
  components:{Star, Modal},
  computed: {
    ...mapGetters('content',['getFavList']),
    favourite() {
      return this.getFavList
    },
  },
  methods: {
     ...mapMutations("content", ["setFavList"]),
    episodeImage(episode) {
      return episode && episode.image && episode.image.medium;
    },
    addToFavourite(episode) {
      this.showModal = true;
      this.episodeDetail = episode;
    },
    checkAdded(currEpisode) {
      let status = this.getFavList.some((ele) => ele.id === currEpisode.id);
      return status;
    },
     checkAddFav(value) {
      if (value) {
        let finalArr = [];
        if (this.checkAdded(this.episodeDetail)) {
          finalArr = this.getFavList.filter((ele) => {
            if (ele.id != this.episodeDetail.id) {
              return ele;
            }
          });
        } else {
          finalArr = [...this.getFavList, this.episodeDetail];
        }

        this.setFavList(finalArr);
        this.showModal = false
      }
      else{
        this.showModal = false
      }
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