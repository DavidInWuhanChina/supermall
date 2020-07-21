<template>
  <Roller class="roller" text="David" :transition="transition" :isStatic="isStatic" defaultChar="David">
  </Roller>
</template>

<script>
  import Roller from 'vue-roller'
    export default {
        name: "OpenAnimations",
      components:{
        Roller,
      },
      data: function () {
        return {
          transition: parseInt(2),
          isStatic:Boolean(true)
        }
      }
    }
</script>

<style scoped>

</style>
