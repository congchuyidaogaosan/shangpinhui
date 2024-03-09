<!--
 * @Author: your name
 * @Date: 2022-04-01 10:51:08
 * @LastEditTime: 2022-04-10 16:54:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE>
 * @FilePath: \projectd:\23田雷宇\shangpinhui\app\src\pages\Home\index.vue
-->
<template>
  <div>
      <!-- 三级联动组件已经注册为全局组件,不需要import引入,可以直接使用 -->
    <TypeNav/>
    <ListContainer/>
    <TodayRecommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,index) in floorList " :key="floor.id" :list="floor"/>
    
    <Brand/>
  </div>
</template>

<script>
import ListContainer from './ListContainer';
import TodayRecommend from './TodayRecommend';
import Rank from './Rank';
import Like from './Like';
import Floor from './Floor';
import Brand from './Brand';
import {mapState} from 'vuex';


export default {
    name:"Home",
    components:{
      ListContainer,
      TodayRecommend,
      Rank,
      Like,
      Floor,
      Brand,
    },
    mounted() {
      this.$store.dispatch('floorList');
      

      
    }, 
    computed:{
      ...mapState({
        floorList:state=>state.home.floorList
      })
    }

}


</script>

<style>

</style>