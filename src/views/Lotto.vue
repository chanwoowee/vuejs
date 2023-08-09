<template>
  <div class="boardBack">
    <LottoSearch />
  </div>
</template>

<script>
  import LottoSearch from '@/components/LottoSearch.vue'

  export default {
    name: 'Lotto',
    components: {
      LottoSearch
    }
  }
</script>

<style scoped>
.boardBack {
  position: absolute;
  /* border: 10px solid black; */
  background-color: white;
  left: 0px;
  top: 0px;
  width: calc(100vw - 16px - 6px);
  height: calc(100vh - 16px - 70px - 55px - 6px - 60px);
  z-index: 1;
}

@media screen and (min-width: 480px) {
  .boardBack {
    position: absolute;
    /* border: 10px solid black; */
    background-color: white;
    left: 0px;
    top: 0px;
    width: calc(100vw - 16px - 150px - 6px);
    height: calc(100vh - 16px - 70px - 55px - 6px);
    z-index: 1;
    max-width: 450px;
  }
}
</style>