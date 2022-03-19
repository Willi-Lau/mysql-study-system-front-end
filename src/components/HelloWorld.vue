<template>
    <div>
        <div class="homeTitle">
              <div>
                  <i class="el-icon-s-home"></i>
                  <i class="el-icon-user"></i>
                  <i class="el-icon-s-custom"></i>
                  <i class="el-icon-phone"></i>
                  <i class="el-icon-loading"></i>
              </div>
        </div>
    </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 .homeTitle{
      background-color:rgb(62,110,147);
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100px;
      right: 0px;
  }
   .homeTitle i{
     color: white;
     font-size: 40px;
   }
</style>
