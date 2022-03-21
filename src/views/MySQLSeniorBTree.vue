<template>
  <div class="MySQLSeniorBTree">
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
           MySQL B+树
          </h1>
           b+树和二叉树，二叉平衡树一样，都是经典的数据结构。b+树由b树和索引顺序访问方法(ISAM)演化而来，但是在现实中几乎没有使用b树的情况了
           <br> 
           b+定义在任何一本数据结构书中都可以找到，其定义十分的复杂。这里只对b+树做简单的介绍。b+树是为了磁盘或者其他直接存储辅助设备设计的一种
           平衡查找树。在b+树种，所有记录节点都是按照键值代销顺序存放在同一层的叶子结点上，由各叶子结点指针进行连接。先看一B+树，其高度为2，每页
           可以存放4条记录。扇出为5，如图所示，所有记录都在叶子结点上，并且是顺序存放的，如果用户从最左边的叶子节点开始顺序遍历，可以得到所有键值
           的顺序排序排序：5,10,15,20,25,30,55,60,65,75,80,85,90<br> <br> 
          <h3>b+树插入</h3>
           <img src="../assets/mysql-b-tree-1.jpg" width="800px"><br>
           <h6>b+树插入的三种情况</h6>
           <img src="../assets/mysql-b-tree-2.jpg" width="800px"><br><br> 
           这里用一个例子来分析b+树的插入。例如，对于图中这颗b+树，若用户插入28这个键值，发现当前LeafPage和IndexPage都没有满，直接进行插入即可。之后得
           下图
           <br><br> <img src="../assets/mysql-b-tree-3.jpg" width="800px"><br><br> 
           接着在插入70这个键值，这时原来的Leaf Page已经满了，但是Index Page还没有满，根据表5-1的第二种情况，这时候插入Leaf Page后的情况为55,55,60,65,8.
           并根据中间的值来60来拆分叶子结点可得下图
           <br><br> <img src="../assets/mysql-b-tree-4.jpg" width="800px"><br><br> 
           因为图片的关系，这次没有再叶子结点上加入双向链表指针，不过它是存在的。最后插入键值95，这时符合第三种情况。即Leaf Page和Index Page 都满了
           需要做两次拆分
           <br><br> <img src="../assets/mysql-b-tree-5.jpg" width="800px"><br><br> 
           可以看到，不管怎么变化，b+树总会保持平衡。但是为了保持平衡对于新插入的键值可能需要做大量的拆分也操作。因为b+树结构主要用于磁盘，页的拆分
           意味着磁盘的操作。所以应该在可能的情况下尽量减少页的拆分系统。因此，b+树同样提供了类似二叉树的旋转操作。 
           <br> 
           旋转发生在Leaf Page 已经满了，但是其左右兄弟节点没有满的情况下。这时b+树并不会急于做拆分的操作，而是将记录移到所在页的兄弟节点上。在通常情况下，
           左兄弟会被首先检查用来做旋转操作，因此，如果插入键值70，其实b+树并不会着急去拆分叶子节点，而是去做旋转操作，得到下图。
          <br><br> <img src="../assets/mysql-b-tree-6.jpg" width="800px"><br><br> 
            <h3>b+树删除</h3>
            b+树使用填充因子来控制树的删除变化。50% 是填充因子课设置的最小值。b+树的删除操作同样必须保证删除后叶子结点中的记录依然排序，同插入一样
            ，b+树的删除操作同样需要考虑以下表中的情况，与插入不同的是，删除根据填充因子的变化量来衡量
            <br><br> <img src="../assets/mysql-b-tree-7.jpg" width="800px"><br><br> 
            根据b+树来进行删除操作。首先删除键值为70这条记录，该记录符合表5-2讨论的第一种情况。删除后可以得到下图
            <br><br> <img src="../assets/mysql-b-tree-8.jpg" width="800px"><br><br> 
            接着删除键值为25的记录，这也是表5-2讨论的第一种情况，但是该值还是index page中的值，新词在删除Leaf Page中的25后还应降25的右兄弟节点28更新到
            page index中
            <br><br> <img src="../assets/mysql-b-tree-9.jpg" width="800px"><br><br> 
            最后看删除键值为60的情况。删除Leaf Page 中键值为60的记录后，Fill Facctor小与50% ，这时候需要合并操作，同样，再删除Index Page中相关记录后需要做
            Index Page的合并操作。

            <br><br> <img src="../assets/mysql-b-tree-10.jpg" width="800px"><br><br> 

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
      .MySQLSeniorBTree .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 4500px;
            bottom:0px;
            z-index: 1;
      }
      .MySQLSeniorBTree .homeBottom1{
            position: relative;
            top: 4550px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQLSeniorBTree .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLSeniorBTree .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLSeniorBTree .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>