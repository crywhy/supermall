<template>
  <div class="category">
    <nav-bar class="category-nav-bar ignore">
      <div slot="center">商品分类</div>
    </nav-bar>

    <category-sidebar :categoryList="categories"
                      :currentIndex="currentIndex"
                      @ListItemInfo="ListItemInfo"/>

<!--    <category-item :subcategory="subcategory"/>-->
    <scroll ref="scroll"
            class="category-item-scroll"
            :pullUpLoad="true"
            @pullingUp="pullingUp"
            :probeType="3" @scroll="listenShowBackTop">
      <category-item-info :subcategory="showSubcategory"
                          @imageLoad="imageLoad"/>

      <tab-control :titles="['综合','新品','销量']" @tabClick="tabClick"/>

      <tab-content-detail :category-data="showCategoryDetail"
                          class="category-data"/>

    </scroll>
    <back-top v-show="backTopViews" @click.native="handleBackTop"/>
  </div>
</template>

<script>
  import CategorySidebar from "./childComps/CategorySidebar";
  import CategoryItemInfo from "./childComps/CategoryItemInfo";
  import TabContentDetail from "./childComps/TabContentDetail";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import Scroll from "components/common/scroll/Scroll";

  import { debounce } from "common/utils"
  import {backTopMixin}  from "common/mixin"
  import { getCategory, getSubcategory, getCategoryDetail } from 'network/category'
  import BackTop from "@/components/content/backTop/BackTop";


export default {
    name: "Category",
    components: {
      BackTop,
      NavBar,
      CategorySidebar,
      TabControl,
      Scroll,
      CategoryItemInfo,
      TabContentDetail
    },
    // mixins: ['tabControlMixin'],
    mixins: [backTopMixin],
    data() {
      return {
        categories: [],
        categoryData: {},
        currentIndex: -1,
        currentType: 'pop'
      }
    },
  created() {
      // 1.请求分类数据
      this._getCategory()
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.$bus.$on('categoryItemImageLoad', ()=> {
        refresh()
      })
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      _getCategory() {
        getCategory().then(res => {
          // 1.获取分类数据
          this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          console.log(mailKey)
          this.categoryData[index].subcategories = res.data

          this.categoryData = {...this.categoryData}

          this._getCategoryDetail('pop')
          this._getCategoryDetail('sell')
          this._getCategoryDetail('new')
        })
      },
      _getCategoryDetail(type) {
        // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(res => {

          // 3.将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      ListItemInfo(index) {
        this._getSubcategories(index)
      },
      imageLoad() {
        this.$refs.scroll.refresh()
      },
      pullingUp() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  .category-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 18px;
    font-weight: 550;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 20;
    line-height: 44px;
  }
  .category-item-scroll {
    position: fixed;
    right: 0;
    top: 48px;
    width: calc(100vw - 102px);
    height: calc(100vh - 47px - 50px);
  }
  .category-data {
    margin-top: 10px;
  }
</style>
