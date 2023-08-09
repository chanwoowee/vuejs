<template>
  <table class="mytable" align="center" >
    <tbody>
      <tr>
        <td style="width:90%" align="right" >
          <input
            align="right"
            style="width:100%"
            v-model.trim="url"
            placeholder="intput the youtube url"
            ref="focusMe"
          />
        </td>
        <td style="width:10%" align="left">
          <button @click="clear">clear</button>
        </td>
      </tr>
      <!-- <tr>
        {{ url }}
      </tr>
      <tr>
        {{ new_url }}
      </tr> -->
    </tbody>
  </table>
  <div class="embed-container">
    <iframe
      :src=new_url
      frameborder="12"
      allowfullscreen
    ></iframe>
  </div>
</template>
<!-- 타이거우즈-아이언 "https://www.youtube.com/embed/0N1Mnf4r_YM" -->
<!-- 로리맥길로우-드라이버 "https://www.youtube.com/embed/FaUizymqUoA" -->
<!-- https://youtu.be/FaUizymqUoA -->

<script>
// import videojs from "video.js";
export default {
  name: "Var",
  data() {
    return {
      url : "https://www.youtube.com/embed/0N1Mnf4r_YM",
      splits: [],
      new_url : "",
    };
  },
  mounted() {
    console.log("mounted() in KdasSearch.vue");
    this.$nextTick(() => this.$refs.focusMe.focus())
    this.make_new_url()
  },
  methods: {
    make_new_url() {
      this.splits = this.url.split("/")
      this.new_url = "https://www.youtube.com/embed/" + this.splits[this.splits.length-1]
    },
    clear() {
      this.url = ""
      // this.new_url = ""
      this.make_new_url()
    }
  },
  watch: {
    url() {
      this.make_new_url()
    },
  }
};

</script>

<style>
.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}
.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>