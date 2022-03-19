<template>
  <div>

    <HelloWorld></HelloWorld>
    <Mysql></Mysql>
    <div class="infoTab">
      
    </div>
    
  </div>
</template>
<script>
import HelloWorld from '../components/HelloWorld.vue';
import Mysql from '../components/Mysql.vue';
export default {
  data() {
      return{
          activeName: 'second'
      }
    },
    methods:{
         handleClick(tab, event) {
            console.log(tab, event);
          }
    },
  name: 'Register',
 components: { HelloWorld, Mysql }
}
</script>
<style>
    .registerForm{
        position:absolute;
        left: 400px;
        right: 500px;
        top:150px;
    }

</style>