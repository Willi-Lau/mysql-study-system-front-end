<template>
  <div class="MySQLJuniorDelete">
    <!-- 公共部分 -->
      <div class="homeTitle2">
          
      </div>
      <div class="homeBottom1">
        <div class="text">
            Legal Policies | Your Privacy Rights | Terms of Use | Trademark Policy | Contributor Agreement | Cookie 喜好设置
        </div>
        
      </div>
      <HelloWorld></HelloWorld>
      <Mysql></Mysql>
    <!-- over -->
    <div class="mysql-change-1">
      <div>
        
      </div>
      <div class="d1">
          <h1>
           MySQL 正则表达式
          </h1>
         在前面的章节我们已经了解到MySQL可以通过 LIKE ...% 来进行模糊匹配。<br>

        MySQL 同样也支持其他正则表达式的匹配， MySQL中使用 REGEXP 操作符来进行正则表达式匹配。<br>

        如果您了解PHP或Perl，那么操作起来就非常简单，因为MySQL的正则表达式匹配与这些脚本的类似。<br>

        下表中的正则模式可应用于 REGEXP 操作符中。<br>
          <h3>语法 </h3>
          以下是 SQL DELETE 语句从 MySQL 数据表中删除数据的通用语法：<br>
           <div class="info">
             SELECT 字段 FROM table WHERE 字段 REGEXP 正则表达式;
               <br>
               
               </div><br><br>
            <h3>正则表达式规则</h3>
              <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                prop="pattern"
                label="模式"
                width="180">
                </el-table-column>
                <el-table-column
                prop="describe"
                label="描述"
                width="580">
                </el-table-column>
            </el-table>

            
           <h3>表达式分组：</h3> 
            1、重复一个字符串时     <br>
            2、使用（）进行分组，使用(?word\w+)指定组名，其中word为组名 <br>
            3、从左向右，以分组的左括号为标志，第一个出现的分组的组号为1，第二个为2，以此类推。 <br>
               表达式(A)(B(C)) <br>
               0 (A)(B(C)) <br>
               1 (A) <br>
               2 (B(C)) <br>
               3 (C) <br> <br>
            1、使用()对匹配的内容分组 <br>
            例如：(\d{1,3}\.){3}\d{1,3} <br>
                    如IP地址：192.168.60.14 （分析\d是数字，然后1-3个，然后转义字符.，然后3组，然后\d是数字，然后1-3个） <br> <br>
            2、使用\1、\2反向引用 *****引用的不是表达式而是匹配到的内容***** <br>
            例如：He loves her lover. <br>
                    He likes her liker. <br>
                    表达式为：He (l..e)s her \1r. <br>
                    loves、lover、likes、liker共同的部分为l..e，..表示任意字符，\1r引用 <br>
                    He (?namel..e)s her \knamer. <br>
                    给分组去一个名字，然后去引用这个名字，用\k名字。 <br>
      </div>       
    </div>
  </div>
</template>
<script>
import HelloWorld from '../components/HelloWorld.vue';
import Mysql from '../components/Mysql.vue';

export default {
  data() {
      return{
          token:this.$route.query.token,
         tableData: [
             {
                pattern: 'literal',
                describe: ' 匹配文本字符串的字面值literal '
             }, 
              {
                pattern: ' re1 |re2 ',
                describe: ' 匹配表达式re1或re2   '
             }, 
              {
                pattern: '.',
                describe: '   匹配任何字符(长度为1)（除了\n） '
             }, 
              {
                pattern: '^ ',
                describe: ' 匹配字符串起始部分 '
             }, 
              {
                pattern: '$',
                describe: ' 匹配字符串终止部分  '
             }, 
              {
                pattern: '*',
                describe: ' 匹配0-多次 出现的表达式  '
             }, 
              {
                pattern: '+ ',
                describe: ' 匹配1-多次 出现的表达式 '
             }, 
              {
                pattern: ' ? ',
                describe: ' 匹配0或1次 出现的表达式 '
             }, 
              {
                pattern: '{n} ',
                describe: ' 匹配n次 *连续*出现的表达式    '
             }, 
              {
                pattern: ' {m,n} ',
                describe: '  匹配最少m次且最多n次 出现的表达式 *最大次数优先匹配* '
             }, 
              {
                pattern: ' [...]',
                describe: ' 匹配来自字符串的任意单一字符   '
             }, 
              {
                pattern: '[..x-y..] ',
                describe: ' 匹配x-y范围的任意单一字符 '
             }, 
              {
                pattern: '[^..] ',
                describe: ' 匹配词字符串出现的任何一个字符 '
             }, 
              {
                pattern: '(*|+|?|{}) ',
                describe: ' 用于匹配上面频繁出现的符号的非贪婪版本 '
             }, 
              {
                pattern: '(..) ',
                describe: '  匹配为封闭的表达式，然后另存为子组 '
             }, 
              {
                pattern: '\\d ',
                describe: '  匹配任何十进制数字 与[0,9]一致（\\D与\\d相反  ，不匹配任何非数值型数字） '
             }, 
              {
                pattern: '\\w',
                describe: ' 匹配任何字母数字字符，与[A-Za-z0-9]相同（\\W相反） '
             }, 
              {
                pattern: ' \\s',
                describe: ' 匹配任何空格字符，与[\n\t\r\v\f]相同（\\S相反 '
             }, 
              {
                pattern: '\\b',
                describe: '  匹配任何单词边界（\\B相反） '
             }, 
              {
                pattern: '\\N ',
                describe: '  匹配已保留的子组（参见上面的（...）） '
             }, 
             {
                pattern: '\\c',
                describe: ' 逐字匹配任何特殊字符c '
             }, 
              {
                pattern: ' \\A(\\Z) ',
                describe: ' 匹配字符串的起始（结束） '
             }
        ]
      }
    },
    methods:{

    },
  name: 'Register',
 components: { HelloWorld,Mysql }
}
</script>
<style>
/* 公共部分 */
      .MySQLJuniorDelete .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 2500px;
            bottom:0px;
            z-index: 1;
      }
      .MySQLJuniorDelete .homeBottom1{
            position: relative;
            top: 2550px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQLJuniorDelete .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLJuniorDelete .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLJuniorDelete .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>