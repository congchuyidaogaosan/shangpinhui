<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件的委派+编程式导航实现路由的跳转与传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  methods: {
    goSearch(event) {
      // 存在问题 事件委派,是把全部的子节点的事件委派给给父节点
      // 点击<a>标签的时候才会进行路由跳转[怎么确定点击的一定是a标签]
      // 如何确定的一级二级还是三级标签

      // 第一个问题:把子节点a标签,加上自定义属性 data-categoryName 其余的子节点是没有的
      let element = event.target;
      //获取到当前出发这个事件的节点 ,需要带有data-categoryName这样的节点 [一定是a标签]
      //给a标签添加自定义属性data-categoryName,全部的字标签当中只有a标签带有自定义属性，别的标签名字----dataset纯属扯淡
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //第二个问题解决了：点击的到底是不是a标签（只要这个标签身上带有categoryname）一定是a标签
      //当前这个if语句：一定是a标签才会进入
      if (categoryname) {
        //准备路由跳转的参数对象
        let loction = { name: "search" };
        let query = { categoryName: categoryname };
        //一定是a标签：一级目录
        if (category1id) {
          query.category1Id = category1id;
          //一定是a标签：二级目录
        } else if (category2id) {
          query.category2Id = category2id;
          //一定是a标签：三级目录
        } else {
          query.category3Id = category3id;
        }
        
        //判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
        if (this.$route.params) {
          loction.params = this.$route.params;
          //动态给location配置对象添加query属性
          loction.query = query;
          //路由跳转
          this.$router.push(loction);
        }
      }
    },
    //用于修改组件实例身上的currentIndex的属性值
    //当用户鼠标移入到h3身上的时候就会立即出发一次
    // throttle 回调函数别用箭头函数,可能会出现上下文this
    changeIndex: throttle(function (index) {
      // index: 鼠标以上某一个一级分类的元素的索引值
      // 正常情况(用户慢慢的操作):鼠标进入,每一个以及分类h3 ,都会触发鼠标进入事件
      // 非正常情况 (用户操作很快 ): 本身全部的一级分类都应该触发鼠标事件,但经过测试 ,只有部分h3触发
      // 就是由于用户行为过快,导致浏览器反应不过来,如果当时回调函数中有一些大量业务,有可能出现卡顿现象

      //修改当前currentIndex索引值
      //函数节流:在20MS时间之内只能执行一次
      this.currentIndex = index;
    }, 20),
    //鼠标移出发生事件

    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    //鼠标移入显示
    enterShow() {
      this.show = true;
    },
  },
  mounted() {
    //通知vuex发请求,获取数据,储存在仓库中
    // this.$store.dispatch("categoryList");
    //当组件挂载完毕,让show属性变为false
    if (this.$route.path != "/home") {
      this.show = false;
    }
    
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        // console.log(state);
        return state.home.categoryList;
        
      },
    }),
    
    
    // ...mapState({
    //   //右侧需要的是一个参数,当使用这个计算属性的时候,有猜测的函数回被立即执行一次
    //   // 注入一个参数state ,就是大仓库中的数据
      
    //   categoryList: (state) => {
        
    //     return state.home.categoryList;
    //   },
    // }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: #72a2eb;
        }
      }
    }
    // 过度动画开始
    .sort-enter {
      height: 0px;
      transform: rotate(0deg);
    }
    .sort-enter-to {
      height: 461px;
      transform: rotate(360deg);
    }
    .sort-enter-avtive {
      transition: all 0.5s linear;
    }
  }
}
</style>
