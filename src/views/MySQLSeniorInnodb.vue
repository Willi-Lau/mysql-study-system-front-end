<template>
  <div class="MySQLSeniorFrameWork">
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
           MySQL 存储引擎
          </h1>
         <h3>innodb</h3>
         innodb存储引擎支持事务，其设计目标主要面向在线事务处理OLTP的应用，其特点是行锁设计，支持外键，并支持Oracle的非锁定读，即默认读取操作不产生
         锁。从MySQL5.5.8版本开始，innodb存储引擎是默认的存储引擎 <br> 
         innodb存储引擎将数据放在一个逻辑的表空间中，这个表空间就像黑盒一样由innodb存储引擎自身进行管理。从MySQL4.1版本开始，他可以将每一个innodb
         存储的表单独存放到一个独立的ibd文件中。此外，innodb存储引擎支持用裸设备用来建立其表空间。<br> 
         innodb通过使用多版本并发控制MVCC来获得高并发性，并且还实现了SQL标准的四种隔离级别，默认为Repeatable Read级别。同时使用next-key lock的
         策略实现避免幻读 phantom 的产生。除此之外，innodb存储引擎还提供了插入缓冲，二次写，自适应性哈希索引，预读等高性能和高可用功能。
         <br> 
         对于表中数据的存储，innodb存储引擎采用了聚集的方式，因此每张表的存储都是按照主键的顺序进行存放。如果没有显式地在表定义时指定主键
         ，innodb存储疫情会为每一行生成一个6字节的ROWID，并以此作为主键。
         <br> 
         inndb存储引擎时MySQL数据库最为常用的一种引擎。而FackBook,Google,Yahoo 等公司的成功应用证明了innodb存储引擎具备高可用性，高性能以及高可扩性
         <h5>下面是innodb的架构图</h5>
         <img src="../assets/mysql-innodb1.jpg" width="800px">
         以下主要从内存和线程的角度分析InnoDB的架构。
         <h5>内存池</h5>
            主要工作： <br> 

                维护所有进程/线程需要使用的多个内部数据结构 <br> 
                缓存磁盘上的数据，方便快速地读取，同时对磁盘文件数据修改之前在这里缓存 <br> 
                重做日志缓存 <br> 
                InnoDB内存池主要有以下部分 <br>  <br> 
           <img src="../assets/mysql-innodb-buffer-pool.jpg" width="800px">
            <h5>缓冲池</h5>
            InnoDB是基于磁盘存储的，并将其中的记录按照页的方式进行管理。 <br> 
            而缓冲池就是一块内存区域，主要缓冲数据页和索引页。 <br> 
            InnoDB中对页的读取操作，首先判断该页是否在缓冲池中，若在，直接读取该页，若不在则从磁盘读取页数据，并存放在缓冲池中。 <br> 
            对页的修改操作，首先修改在缓冲池中的页，再以一定的频率（Checkpoint机制）刷新到磁盘。 <br> 
            参数：innodb_buffer_pool_size设置缓冲池大小 <br>  <br> 

            缓冲池通过LRU（Latest Recent Used，最近最少使用）算法进行管理。最频繁使用的页在LRU列表前端，最少使用的页在尾端，当缓冲池不能存放新读取的页时，首先释放LRU列表尾端的页（页数据刷新到磁盘，并从缓冲次中删除）。 <br> 
            InnoDB对于新读取的页，不是放到LRU列表最前端，而是放到midpoint位置（默认为5/8处）。 <br> 
            这是因为一些SQL操作会访问大量的页（如全表扫描），读取大量非热点数据，如果直接放到首部，可能导致真正的热点数据被移除。 <br>  <br> 


            <h5>重做日志缓存</h5>
            重做日志先放到这个缓冲区，然后按一定频率刷新到重做日志文件。 <br> 
            参数：innodb_log_buffer_size <br> 

            <h5>刷新规则：</h5>

            Master Thread每秒将一部分重做日志缓冲刷新到重做日志文件 <br> 
            每一事务提交时会将重做日志刷新到重做日志文件（如果配置了） <br> 
            重做日志缓冲区使用空间大于1/2 <br> 
            额外的内存池 <br> 
            内存堆，对InnoDB内部使用的数据结构对象进行管理 <br> 

            <h5>Checkpoint机制</h5>
            InnoDB对于对于DML语句操作（如Update或Delete），事务提交时只需在缓冲池中中完成操作，然后再通过Checkpoint将修改后的脏页数据刷新到磁盘。 <br> 

            <h5>InnoDB有两种Checkpoint</h5>
            Sharp Checkpoint：数据库关闭是将所有脏页刷新会磁盘 <br> 
            Fuzzy Checkpoint： <br> 

            <h5>Master Thread Checkpoint</h5>
            Master Thread每个1秒或10秒按一定比例将缓存池的脏页列表刷新会磁盘 <br> 
            FLUSH LRU LIST Checkpoint <br> 
            Page Cleaner线程发现LRU列表中可用页数量少于innodb_lru_scan_depth(1024)，就将LRU列表尾端移除，如果这些页中有脏页，就需要Checkpoint <br> 
            Async/Sync Flush Checkpoint <br> 
            重做日志文件空间不可以用时，将一部分脏页刷新到磁盘。 <br> 
            Dirty Page too much Checkpoint: <br> 
            脏页数量太多（超过比例innodb_max_dirty_pages_pct,默认75），执行Checkpoint。 <br> 
            <h5>重做日志</h5>
            重做日志是为了保证事务的原子性，持久性。InnoDB采用Write Ahread Log策略，事务提交时，先写重做日志，再修改页。 <br> 
            数据库宕机重启时通过执行重做日志恢复数据。 <br> 
            但由于Checkpoint机制，数据库宕机重启并不需要重做所有的日志，因为Checkpoint之前的页都刷新到磁盘了，只需执行最新一次Checkpoint后的重做日志进行恢复，这样可以缩短数据库的恢复时间。 <br> 

            InnoDB中重做日志文件是循环使用的。当页被Checkpoint刷新到磁盘后，对应的重做日志就不需要使用 ，其空间可以被覆盖重用。 <br> 
            如果待写入的重做日志文件空间不可用（脏页还没有刷新到磁盘），就需要强制产生Checkpoint，将缓冲池中的页至少刷新到当前重做日志的位置。 <br> 

            InnoDB 1.2.x(MySql 5.6)后，FLUSH LRU LIST Checkpoint以及Async/Sync Flush Checkpoint操作放到Page Cleaner线程，以免阻塞用户线程。 <br> 

            <h5>线程</h5>
            主要作用： <br> 

            负责刷新内存池中的数据，保证缓冲池的内存缓冲的是最近的数据 <br> 
            已修改的数据文件刷新到磁盘文件 <br> 
            保证数据库发生异常的情况下InnoDB能恢复到正常状态。 <br> 
            InnoDB运行时主要有以下线程 <br> 
            <h5>Master Thread</h5>
            负责将缓冲池中的数据异步刷新到磁盘，保证数据的一致性，包括脏页的刷新，合并插入缓冲（INSERT BUFFER），UNDO页的回收等。 <br> 

            <h5>IO Thread</h5>
            负责AIO请求的回调处理。 <br> 
            参数：innodb_read_io_threads，innodb_write_io_threads <br> 

            <h5>Purge Thread</h5>
            事务提交后，undo log可能不再需要，由Purge Thread负责回收并重新分配的这些已经使用的undo页。 <br> 
            注意：Purge Thread需要离散地读取undo页。 <br> 

            <h5>Page Cleaner Thread</h5>
            InnoDB 1.2.x引入，将Master Threader中刷新脏页的工作移至该线程，如上面说的FLUSH LRU LIST Checkpoint以及Async/Sync Flush Checkpoint。 <br> 

            <h5>Master Thread</h5>
            Master Thread具有最高的线程优先级别，内部由多个循环组成：主循环（loop），后台循环(backgroup loop)，刷新循环(flush loop)，暂停循环(suspend loop)，Master Thread根据数据库运行状态在以上循环切换。 <br> 

                    <br><br>
          <h3>InnoDB关键特性</h3>

          <h5>插入缓冲</h5>
            插入聚集索引一般是顺序的，不需要磁盘的随机读取 <br>
            但插入非聚集索引叶子节点不是顺序的，需要离散访问非聚集索引页，速度较慢。 <br>
            对于非聚集索引的插入或更新，先判断插入的非聚集索引页是否在缓存池中，若在，直接插入，或不在，先放到一个Inser Buffer对象中， <br>
            然后根据一些算法将Insert Buffer缓存的记录通过后台线程慢慢合并刷新回辅助索引。 <br>
            插入缓冲将多次插入合并为一次操作，减少磁盘的离散操作。 <br>

            使用Insert Buffer需满足两个条件： <br>
            索引是辅助索引 <br>
            索引不是唯一的（不需要查找索引页判断唯一性） <br>

            InnoDB从1.0.x引入Change Buffer，对INSERT，DELETE，UPDATE都进行缓冲。 <br>
            参数：innodb_change_buffer_max_size，Change Buffer最多使用缓冲池内存空间。 <br>

            <h5>两次写 doublewrite</h5>
            部分写失效：页数据写入到磁盘时只写了一部分（如16K数据只写了2K），数据库就宕机了，导致页数据损坏，这时无法使用重做日志恢复。（执行重做日志时需要利用页的一些变量，如checksum） <br>

            因此在使用重做日志恢复数据库，需要有一个页的副本，当发生写失效时，先通过页的副本还原该页，再进行重做。于是InnoDB实现了doublewrite技术。 <br>

            doublewrite有两部分，一部分是内存中的doublewrite buffer，大小为2MB，另一部分是磁盘共享表空间连续的128个页，也是2MB。 <br>
            doublewrite要求刷新缓冲池的脏页时执行以下步骤 <br>

            通过memcpy函数将脏页复制到内存的doublewrite buffer <br>
            doublewrite buffer分两次，每次1MB顺序写入共享表空间 <br>
            调用fsync函数同步磁盘，避免缓冲写带来问题，确保数据刷新到共享表空间（顺序写，开销小） <br>
            将上述的脏页数据写入各个表空间文件（离散写） <br>
            自适应哈希索引 <br>
            InnoDB会监控对表上各索引页的查询执行情况，如发现建立哈希索引可以提升速度，则建立哈希索引，这是过程不需要用户干预。 <br>
            参数：innodb_adaptive_hash_index，默认AHI为开启状态 <br>

            <h5>异步IO</h5>
            InnoDB使用异步IO操作磁盘，避免同步IO导致阻塞，也可以进行IO Merge操作，将多个IO操作合并为一个IO操作。 <br>

            <h5>刷新邻接页</h5>
            当刷新一个脏页时，InnoDB会检测该页所在区的所有页，如果是脏页，一起刷新，这是可以通过AIO将多个IO写入操作合并为一个IO操作。 <br>
            参数：innodb_flush_neighbors，控制开关 <br>

            <h5>文件</h5>
            <h5>参数文件</h5>
            在MySql实例启动时指定某些初始化参数，如数据库文件目录，内存池大小等。 <br>
            参看参数文件所在目录：mysql --help|grep my.cnf <br>
            linux下默认目录为/etc/mysql/my.cnf <br>
            /etc/mysql/conf.d/mysql.cnf为客户端参数文件 <br>
            /etc/mysql/mysql.conf.d/mysql.cnf为服务端参数文件 <br>

           <h5>参数类型：</h5> 

            动态参数，可以在MySql实例运行中进行更改 <br>
            SET [global | session] system_var_name = expr <br>
            SET [@@golbal. | @@session. | @@]system_var_name = expr <br>
            静态参数：只能在实例停止时修改 <br>
            注意：datadir参数指定MySql数据目录，它是数据文件，日志文件默认存放目录。 <br>

            <h5>日志文件</h5>
            <h5>错误日志</h5>
            遇到问题应该查看该文件以便定位问题。 <br>
            参数：log-error <br>

            <h5>慢查询日志</h5>
            记录执行时间超过某一阀值的所有SQL <br>
            参数： <br>
            log_slow_queries：记录慢SQL的开关 <br>
            long_query_time：慢SQl的阀值，默认为10，单位秒 <br>
            log_queries_not_using_indexes:是否记录没有使用索引的查询 <br>
            log_throttle_queries_not_using_indexs:每分钟最多记录没使用索引的SQL的数量 <br>
            slow-query-log-file:指定目录，默认在data目录 <br>
            log_output：输出格式，默认为FILE，可以配置为TABLE（记录到slow_log表） <br>
            可以使用mysqldumpslow分析慢日志 <br>

            <h5>查询日志</h5>
            记录所有对MySql数据库的请求信息。 <br>
            默认文件名为主机名.log，也可以输出到mysql架构的general_log表中。 <br>

            <h5>二进制日志</h5>
            记录对MySql数据库执行更改的所有操作，不包括select，show这类操作。 <br>
            可用于恢复，复制，审计（判断是否有对数据库进行注入攻击） <br>
            MySql官方手册测试表明，开启二进制日志会使性能下降1%，但考虑到复制，point-in-time的恢复等功能，完成可以接受，建议开启。 <br>
            参数： <br>
            log_bin：是否开启二进制日志，默认No <br>
            log-bin：指定日志名称，默认为主机名，后缀为二进制日志序列号，如bin_log.000001 <br>
            max_binlog_size：单个二进制日志文件最大值 <br>
            binlog_cache_size：二进制日志缓冲区大小，基于会话 <br>
            sync_binlog：1 表示使用同步写磁盘方法写入二进制日志，默认为0 <br>
            binlog_format：二进制日志格式，可以为STATEMENT，ROW，MIXED <br>
            -- STATEMENT：记录SQL语句 <br>
            -- ROW：记录表的行更改情况 <br>
            -- MIXED：默认使用STATEMENT，一些特定情况使用ROW <br>
            使用ROW可以为数据库的恢复和复制带来更好的可靠性，但会导致二进制文件大小增加。复制的网络开销也有所增加。 <br>
            可以使用mysqlbinlog可以分析二进制日志 <br>

            <h5>套接字文件</h5>
            当使用UNIX域套接字方式进行连接时需要的文件。 <br>
            参数：socket <br>

            <h5>pid文件</h5>
            MySql实例的进程ID文件。 <br>
            参数：pid_file <br>

            <h5>表结构定义文件</h5>
            存放MySql表结构定义。 <br>
            在数据目录下，每一个表都有一个子目录，存放对应的表结构定义文件，后缀为frm <br>
            MySql8.0后，移除了.frm文件，表结构定义存放到数据库系统表中。 <br>

            每个存储引擎都可以自行定义的文件保存引擎所需的数据。InnoDB存储引擎定义了以下文件： <br>
            <h5>表空间文件</h5>
            InnoDB将所有数据（表数据，索引，插入缓冲索引页，回滚信息，插入缓冲索引页，系统事务信息，二次写缓冲等等）逻辑地放在一个空间中，称为共享表空间。 <br>
            表空间数据默认保证在数据目录下的ibdata1文件，该文件初始大小为10M。 <br>
            一个表空间可以由多个文件组成。 <br>

            参数：innodb_data_file_path，可以通过多个文件组成一个表空间，同时指定文件属性，如 <br>
            /db/ibdata1:2000M;/db/ibdata2:2000M:autoextend，autoextend表示文件可以自动扩容，只有最后一个文件可以被指定为自动扩容。 <br>

            开启参数innodb_file_per_table后，每个表都产生一个独立的表空间，文件命名为:表名.ibd，该表的数据，索引和插入缓冲BITMAP等信息到保存到独立表空间，但其它数据（如回滚信息，插入缓冲索引页，系统事务信息，二次写缓冲）还是存放在默认的表空间。 <br>

            <h5>重做日志文件</h5>
            每个InnoDB存储引擎至少有1个重做日志文件组，每个文件组下至少有2个重做日志文件，默认为ib_logfile0,ib_logfile1，一个文件写满后，再写另一个文件，循环复用。 <br>

            innodb_log_file_size：每个重做日志文件大小 <br>
            innodb_log_files_in_group：日志文件组中重做日志文件数量，默认为2 <br>
            innodb_mirrored_log_groups:日志镜像文件组数量，默认为1，表示只有一个日志文件组，没有镜像 <br>
            innodb_log_group_host_dir:日志文件所在路径，默认为./，表示MySql数据目录 <br>

            <h5>Undo日志文件</h5>
            undo log保证事务的原子性， 帮助事务回滚以及MVCC功能。 <br>

            在InnoDB 1.2.x(MySQL 5.6)前，undo日志保存在共享表空间ibdata1文件中的，随着数据库的运行时间的不断增长，会导致共享表空间越来越大， <br>
            从InnoDB 1.2.x(MySQL 5.6)起，Undo日志被分离出来，由单独的Undo表空间管理，这样可以避免处理Undo日志的IO过于集中，有助于分散IO负载。 <br>
            Undo日志默认保存数据目录下的undo_001，undo_002文件中。 <br>
            MySQL 5.7，提供undo log在线回收功能 <br>
            MySQL 8.0，可以通过SQL语句非常方便的管理 Undo 表空间 <br>

            innodb_undo_directory：指定UNDO独立表空间位置 <br>
            innodb_undo_logs：设置rollback segment个数，默认为128(一个rollback segment支持1024并发)，在InnoDB 1.2，该参数替换之前版本的innodb_rollback_segments <br>
            innodb_undo_tablespaces：组成独立表空间文件个数 <br>
            innodb_undo_log_truncate: MySQL 自动收缩 Undo 表空间，防止磁盘占用过大，默认开启（Mysql5.7.5之后提供） <br>
            innodb_max_undo_log_size：超过该阀值将被自动收缩 <br>

            <h1>MyISAM</h1>
            在MySQL 5.1 及之前的版本，MyISAM是默认引擎。MyISAM提供的大量的特性，包括全文索引、压缩、空间函数（GIS）等，但MyISAM并不支持事务以及行级锁，而且一个毫无疑问的缺陷是崩溃后无法安全恢复。正是由于MyISAM引擎的缘故，即使MySQL支持事务已经很长时间了，在很多人的概念中MySQL还是非事务型数据库。尽管这样，它并不是一无是处的。对于只读的数据，或者表比较小，可以忍受修复操作，则依然可以使用MyISAM（但请不要默认使用MyISAM，而是应该默认使用InnoDB）
            <br>    
             <h1>Innodb MyISAM对比</h1>
              <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                prop="attribute"
                label="attribute"
                width="180">
                </el-table-column>
                <el-table-column
                prop="Innodb"
                label="Innodb"
                width="380">
                </el-table-column>
                <el-table-column
                prop="MyISAM"
                label="MyISAM"
                width="380">
                </el-table-column>
            </el-table>
         
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
                 attribute:' 存储结构',
                Innodb: '所有的表都保存在同一个数据文件中（也可能是多个文件，或者是独立的表空间文件），InnoDB表的大小只受限于操作系统文件的大小，一般为2GB。',
                MyISAM: '每个MyISAM在磁盘上存储成三个文件。分别为：表定义文件、数据文件、索引文件。第一个文件的名字以表的名字开始，扩展名指出文件类型。.frm文件存储表定义。数据文件的扩展名为.MYD (MYData)。索引文件的扩展名是.MYI (MYIndex)。 '
             }, 
              {
                 attribute:' 存储空间',
                Innodb: ' 需要更多的内存和存储，它会在主内存中建立其专用的缓冲池用于高速缓冲数据和索引。',
                MyISAM: 'MyISAM支持支持三种不同的存储格式：静态表(默认，但是注意数据末尾不能有空格，会被去掉)、动态表、压缩表。当表在创建之后并导入数据之后，不会再进行修改操作，可以使用压缩表，极大的减少磁盘的空间占用。。 '
             }, 
              {
                 attribute:'  可移植性、备份及恢复',
                Innodb: '免费的方案可以是拷贝数据文件、备份 binlog，或者用 mysqldump，在数据量达到几十G的时候就相对痛苦了。',
                MyISAM: '数据是以文件的形式存储，所以在跨平台的数据转移中会很方便。在备份和恢复时可单独针对某个表进行操作。'
             }, 
              {
                 attribute:' 事务支持',
                Innodb: '提供事务支持事务，外部键等高级数据库功能。 具有事务(commit)、回滚(rollback)和崩溃修复能力(crash recovery capabilities)的事务安全(transaction-safe (ACID compliant))型表。',
                MyISAM: '强调的是性能，每次查询具有原子性,其执行数度比InnoDB类型更快，但是不提供事务支持。'
             }, 
              {
                 attribute:' AUTO_INCREMENT',
                Innodb: 'InnoDB中必须包含只有该字段的索引。引擎的自动增长列必须是索引，如果是组合索引也必须是组合索引的第一列。',
                MyISAM: '可以和其他字段一起建立联合索引。引擎的自动增长列必须是索引，如果是组合索引，自动增长可以不是第一列，他可以根据前面几列进行排序后递增。 '
             }, 
              {
                 attribute:' 表锁差异',
                Innodb: '支持事务和行级锁，是innodb的最大特色。行锁大幅度提高了多用户并发操作的新能。但是InnoDB的行锁，只是在WHERE的主键是有效的，非主键的WHERE都会锁全表的。',
                MyISAM: '只支持表级锁，用户在操作myisam表时，select，update，delete，insert语句都会给表自动加锁，如果加锁以后的表满足insert并发的情况下，可以在表的尾部插入新的数据。 '
             }, 
              {
                 attribute:' 全文索引',
                Innodb: '不支持FULLTEXT类型的全文索引，但是innodb可以使用sphinx插件支持全文索引，并且效果更好。',
                MyISAM: '支持 FULLTEXT类型的全文索引 '
             }, 
              {
                 attribute:' 表主键',
                Innodb: '允许没有任何索引和主键的表存在，索引都是保存行的地址。',
                MyISAM: '如果没有设定主键或者非空唯一索引，就会自动生成一个6字节的主键(用户不可见)，数据是主索引的一部分，附加索引保存的是主索引的值。'
             }, 
              {
                 attribute:' 表的具体行数',
                Innodb: '没有保存表的总行数，如果使用select count(*) from table；就会遍历整个表，消耗相当大，但是在加了wehre条件后，myisam和innodb处理的方式都一样。',
                MyISAM: '保存有表的总行数，如果select count() from table;会直接取出出该值。'
             }, 
               {
                 attribute:' 外键',
                Innodb: '支持',
                MyISAM: '不支持'
             }, 
             
             
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
      .MySQLSeniorFrameWork .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 8800px;
            bottom:0px;
            z-index: 1;
      }
      .MySQLSeniorFrameWork .homeBottom1{
            position: relative;
            top: 8850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQLSeniorFrameWork .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLSeniorFrameWork .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLSeniorFrameWork .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>