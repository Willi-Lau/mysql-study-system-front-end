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
      // socket
            OnMessage(event){
                // alert(event.data)
                 this.$notify({
                    title: '提示',
                    message: event.data,
                    duration: 0,
                    type: 'success'
                    
                    });
            },
            OnOpen(){},
            OnError(){},
         handleClick(tab, event) {
            console.log(tab, event);
          }
    },
  name: 'Register',
 components: { HelloWorld, Mysql }
  ,
  created(){
   var source = new EventSource("http://127.0.0.1:9999/subscribe");
        source.onopen = this.OnOpen;
        source.onmessage = this.OnMessage;
        source.onerror = this.OnError;
 }
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