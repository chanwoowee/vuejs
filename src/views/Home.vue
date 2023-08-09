<template>
  <div>
    <img id="logo" alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="message" />
    <!-- <h2>=================</h2>
    <a>{{ count }}</a><br />
    <button @click="minusCount"> - </button>
    <button @click="addCount"> + </button>
    <button @click="reset">reset</button> <br>
    <button @click="checkCounter">check</button> <br> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
// import KdasCounter from '@/components/KdasCounter.vue'
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
    };
  },
  computed: {
    ...mapState("home", [
    "count", 
    "counter", 
    "message"
    ]),
    ...mapGetters("home", ["getMessage"])
  },
  methods: {
    ...mapActions('home', {
      resetCount: "resetCount",
    }),
    // ...mapActions("home/", ["setMessage"]),
    addCount() {
      this.$store.commit('home/increment');
    },
    minusCount() {
      this.$store.commit('home/decrement');
    },
    checkCounter() {
      alert('무궁화 꽃이 피었습니다! \n no.' + this.counter)
    },
    reset() {
      console.log('before')
      this.resetCount('test');
      console.log('after')
    },
  },
  components: {
    HelloWorld
  },
};
</script>

<style>
#nav {
  position: fixed;
  top: 0;
  /* width: 100% */
  left: 0;
  right: 0;
  padding: 30px;
}
</style>