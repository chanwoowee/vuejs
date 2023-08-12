<template>
  <a>[{{ received.id }}] {{ received.keyword }}</a><br>
  
</template>

<script>

export default {
    name: "ChatLine",
    data() {
      return {
        last: ''
      }
    },
    props: {
      key: {},
      idx: {},
      received: {}
    },
    computed: {
    },
    methods: {
    },
    watch: {
    },
    components: {
    },
    created() {
      // console.log('created()')
    },
    mounted() {
      // console.log('mounted()')
    },
    beforeUnmount() {
      // console.log('beforeUnmount()')
    }
}
</script>