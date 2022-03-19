<template>
  <div class="anzhaung">
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
      <div class="d21">
          <h1>
            Linux/UNIX 上安装 MySQL 
          </h1>
          <a href="https://dev.mysql.com/downloads/mysql/">MySQL下载地址 https://dev.mysql.com/downloads/mysql/</a> <br><br><br>

            安装前，我们可以检测系统是否自带安装 MySQL: <br><br>
            <div class="info">rpm -qa | grep mysql</div><br><br>
            如果你系统有安装，那可以选择进行卸载: <br><br>
            <div class="info">rpm -e mysql　　// 普通删除模式<br>rpm -e --nodeps mysql　　// 强力删除模式，如果使用上面命令删除时，提示有依赖的其它文件，则用该命令可以对其进行强力删除</div><br><br>
            接下来我们在 Centos7 系统下使用 yum 命令安装 MySQL，需要注意的是 CentOS 7 版本中 MySQL数据库已从默认的程序列表中移除，所以在安装前我们需要先去官网下载 Yum 资源包<br><br>
            <div class="info">wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm<br>
                              rpm -ivh mysql-community-release-el7-5.noarch.rpm<br>
                              yum update <br>
                              yum install mysql-server<br>
            </div><br><br>
            权限设置：<br><br>
            <div class="info">chown -R mysql:mysql /var/lib/mysql/</div><br><br>
            初始化 MySQL：<br><br>
            <div class="info">mysqld --initialize</div><br><br>
            启动 MySQL：<br><br>
            <div class="info">systemctl start mysqld</div><br><br>
      </div>  

      <div class="d22">
          <h1>
            Alibaba Cloud ECS 上安装MySQL  
          </h1>
          1.  执行以下命令，下载并安装MySQL官方的Yum Repository。<br><br>
            <div class="info">wget http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm<br>
                              yum -y install mysql57-community-release-el7-10.noarch.rpm<br>
                              yum -y install mysql-community-server
            </div><br><br>
            <img src="../assets/alibabacloud-buid-mysql-1.png"><br><br>
           2.  执行以下命令，启动 MySQL 数据库<br><br>
            <div class="info">systemctl start mysqld.service</div><br><br>
           3.  执行以下命令，查看MySQL初始密码。<br><br>
            <div class="info">grep "password" /var/log/mysqld.log</div><br><br>
            4.  执行以下命令，登录数据库。<br><br>
            <div class="info">mysql -uroot -p</div><br><br>
            5.  执行以下命令，修改MySQL默认密码。<br><br>
            <div class="info">ALTER USER 'root'@'localhost' IDENTIFIED BY '12345678';</div><br><br>
            6.  执行以下命令，授予root用户远程管理权限。<br><br>
            <div class="info">GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '12345678';</div><br><br>
            
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

    },
  name: 'Register',
 components: { HelloWorld,Mysql }
}
</script>
<style>
/* 公共部分 */
      .anzhaung .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 2200px;
            bottom:0px;
      }
      .anzhaung .homeBottom1{
            position: relative;
            top: 2250px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
           
        }
        .anzhaung .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
    .anzhaung .d21{
      float: left;
      text-align: left;
      position: relative;
     left: 100px;
      height: 770px;

      /* border-bottom: solid 1px #484a50; */
    }
    .anzhaung .d22{
      float: left;
      text-align: left;
      position: relative;
     left: 100px;
      height: 870px;

      /* border-bottom: solid 1px #484a50; */
    }
    .anzhaung .mysql-change{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
    }
    /* 公共代码块 */
    .info{
        background-color: rgba(228,249,239);
    }
</style>