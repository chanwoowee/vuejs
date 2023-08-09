<template>
  <div class="home">
    <SampleComponent />
  </div>
</template>

<script>
  import SampleComponent from '@/components/SampleComponent.vue'

  export default {
    name: 'SampleView',
    components: {
      SampleComponent
    }
  }
</script>