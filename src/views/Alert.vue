<template>
  <div>
    <AlertMq />
  </div>
  </template>
  
  <script>
    import AlertMq from '@/components/AlertMq.vue'
  
    export default {
      name: 'Alert',
      components: {
        AlertMq
      }
    }
  </script>
  
  <style scoped>
    .home {
      text-align: center;
      overflow: auto;
    }
  </style>