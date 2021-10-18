<template>
  <div class="content--main">
          <button class="btn" @click="this.$router.back()">back</button>

    <div class="secion--one">
      <div class="image--main">
        <img
          :src="
            getContentDetails &&
            getContentDetails.image &&
            getContentDetails.image.medium
          "
          :alt="getContentDetails.name"
          style="width: 90%; height: auto;border-radius:15px"
        />
      </div>
      <div class="details">
      <h1>
        Name:<span>{{ getContentDetails.name }}</span>
      </h1>
      <h3>
        Season:<span>{{ getContentDetails.season }}</span>
      </h3>
      <h3>
        Episode:<span>{{ getContentDetails.number }}</span>
      </h3>
      <h4>
        Runtime:<span>{{ getContentDetails.runtime }} minutes</span>
      </h4>
      </div>
    </div>
    <div class="section-two">
        <p v-html="getContentDetails.summary"></p>
    </div>
  </div>
</template>

<script>
export default {
  name:'detailpage',
  data() {
    return {
    };
  },
  computed:{
    getContentDetails(){
      let data = this.$store.getters['getContentListById'](this.$route.params.id)
      console.log("Data||",data)
      return data
    }
  },
}
</script>

<style  scoped>
/* @import '../../style/style.css'; */

.secion--one{
    display: grid;
    grid-template-columns: 65% 35%;
    align-items: center;
}
.btn{
  padding: 15px;
  border-radius: 15px;
  border: 0;
  background: skyblue;
  cursor:pointer;
  margin:5px;
}

</style>