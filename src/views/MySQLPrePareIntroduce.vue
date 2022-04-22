<template>
  <div class="jieshao">
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
    <div class="mysql-change">
      <div>
        
      </div>
      <div class="img">
          <img src="../assets/Mysql-logo.png" width="150px">
      </div>
      <div class="d1">
          <h1>
            MySQL介绍
          </h1>
          MySQL 是最流行的关系型数据库管理系统，在 WEB 应用方面 MySQL 是最好的 RDBMS 
          (Relational Database Management System：关系数据库管理系统)应用软件之一.
          在本教程中，会让大家快速掌握 MySQL 的基本知识，并轻松使用 MySQL 数据库
      </div>
      <div class="d2">
        <h1>
          什么是数据库？
        </h1>

        <div>
          数据库（Database）是按照数据结构来组织、存储和管理数据的仓库。 <br>

          每个数据库都有一个或多个不同的 API 用于创建，访问，管理，搜索和复制所保存的数据。  <br>

          我们也可以将数据存储在文件中，但是在文件中读写数据速度相对较慢。  <br>

          所以，现在我们使用关系型数据库管理系统（RDBMS）来存储和管理大数据量。所谓的关系型数据库，是建立在关系模型基础上的数据库，借助于集合代数等数学概念和方法来处理数据库中的数据。 <br>

          RDBMS 即关系数据库管理系统(Relational Database Management System)的特点： <br> <br>

          1.数据以表格的形式出现 <br><br>
          2.每行为各种记录名称 <br><br>
          3.每列为记录名称所对应的数据域 <br><br>
          4.许多的行和列组成一张表单 <br><br>
          5.若干的表单组成database <br><br>
        </div>
      </div>

      <div class="d3">
            <h1>
              RDBMS 术语
            </h1>
            <div>
              在我们开始学习MySQL 数据库前，让我们先了解下RDBMS的一些术语：

                数据库: 数据库是一些关联表的集合。 <br><br>
                数据表: 表是数据的矩阵。在一个数据库中的表看起来像一个简单的电子表格。 <br><br>
                列: 一列(数据元素) 包含了相同类型的数据, 例如邮政编码的数据。 <br><br>
                行：一行（=元组，或记录）是一组相关的数据，例如一条用户订阅的数据。<br><br>
                冗余：存储两倍数据，冗余降低了性能，但提高了数据的安全性。<br><br>
                主键：主键是唯一的。一个数据表中只能包含一个主键。你可以使用主键来查询数据。<br><br>
                外键：外键用于关联两个表。<br><br>
                复合键：复合键（组合键）将多个列作为一个索引键，一般用于复合索引。<br><br>
                索引：使用索引可快速访问数据库表中的特定信息。索引是对数据库表中一列或多列的值进行排序的一种结构。类似于书籍的目录。<br><br>
                参照完整性: 参照的完整性要求关系中不允许引用不存在的实体。与实体完整性是关系模型必须满足的完整性约束条件，目的是保证数据的一致性。<br><br>
            </div>
      </div>

      <div class="d4">
            <h1>
              MySQL数据库
            </h1>
            <div>
              MySQL 是一个关系型数据库管理系统，由瑞典 MySQL AB 公司开发，目前属于 Oracle 公司。MySQL 是一种关联数据库管理系统，关联数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。

                MySQL 是开源的，目前隶属于 Oracle 旗下产品。<br><br>
                MySQL 支持大型的数据库。可以处理拥有上千万条记录的大型数据库。<br><br>
                MySQL 使用标准的 SQL 数据语言形式。<br><br>
                MySQL 可以运行于多个系统上，并且支持多种语言。这些编程语言包括 C、C++、Python、Java、Perl、PHP、Eiffel、Ruby 和 Tcl 等。<br><br>
                MySQL 对PHP有很好的支持，PHP 是目前最流行的 Web 开发语言。<br><br>
                MySQL 支持大型数据库，支持 5000 万条记录的数据仓库，32 位系统表文件最大可支持 4GB，64 位系统支持最大的表文件为8TB。<br><br>
                MySQL 是可以定制的，采用了 GPL 协议，你可以修改源码来开发自己的 MySQL 系统。<br><br>
             </div>
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
          token:this.$route.query.token
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
            OnError(){}
    },
  name: 'Register',
 components: { HelloWorld,Mysql }
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
/* 公共部分 */
     .jieshao .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 1800px;
            bottom:0px;
            z-index: 1;
      }
     .jieshao .homeBottom1{
            position: relative;
            top: 1850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
       .jieshao .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
      .jieshao .d4{
          float: left;
          text-align: left;
          position: relative;
          left:180px;
          right:50px;
          height: 450px;

          border-bottom: solid 1px #484a50;
        }
    .jieshao .d3{
          float: left;
          text-align: left;
          position: relative;
          left:180px;
          right:50px;
          height: 550px;

          border-bottom: solid 1px #484a50;
        }
    .jieshao .d2{
      float: left;
      text-align: left;
      position: relative;
      left:180px;
      right:50px;
      height: 450px;

      border-bottom: solid 1px #484a50;
    }
       .jieshao .img{
        position: absolute;
        left: 0px;
        top:10px;
    }
      .jieshao  .d1{
      float: left;
      text-align: left;
      position: relative;
      left:180px;
      right:50px;
      height: 170px;

      border-bottom: solid 1px #484a50;
    }
      .jieshao  .mysql-change{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
    }
      .jieshao  .registerForm{
        position:absolute;
        left: 400px;
        right: 500px;
        top:150px;
        
    }

</style>