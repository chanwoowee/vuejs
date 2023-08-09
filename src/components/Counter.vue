<template>
  <div>Count: {{ count }}</div>
  <!-- <youtube :video-id="videoId" ref="youtube" @playing="playing"></youtube> -->
  <!-- <button @click="playVideo">play</button> -->
</template>

<script>
// import { mapState, mapMutations } from "vuex";

export default {
  name: "Counter",
  data() {
    return {
      count: 0,
      random: 0,
      timer: '',
    };
  },
  computed: {
    // ...mapState("home", [
    //   "counter",
    // ]),
  },
  methods: {
    // ...mapMutations("home", ['addcounter'])
  },
  mounted() {
    this.timer = setInterval(() => {
      this.count++
      console.log('this.count: ' + this.count)
      this.random = parseInt(Math.random() * (10000 - 999) + 999)
      if (this.count % 15 == 0) {
        if (this.random == 777) {
          alert("Random number is " + this.random + ". Congratulations!" +
            "\nlastpeople777@gmail.com")
        } else {
          alert("Random number is " + this.random + ". Bump! next time." + 
            "\nGet lucky number 7777!\n")
        }
        // return false
      } else {
        // return true
      }
    }, 1000);
  },
  unmounted() {
    clearInterval(this.timer);
    console.log('unmounted, clearInternal')
  },
}
</script>