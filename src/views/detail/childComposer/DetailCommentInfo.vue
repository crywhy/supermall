<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评论</div>
      <div class="header-more">更多
        <i class="arrow-right">+</i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <div class="info-detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <span class="date">{{ commentInfo.created | showDate}}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="info-imgs">
      <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
      </div>
    </div>
  </div>
  <div v-else>
    <p  class="no-comment">暂无评论~</p>
  </div>
</template>

<script>
  import {formatDate} from "common/utils";

  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      showDate(value) {
        // 将时间戳转成Date对象
        const date = new Date(value * 1000)

        // 将date进行格式化
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped>
  .no-comment {
    padding: 40px;
    text-align: center;
    border-bottom: 2px #eee solid;
    margin-bottom: 6px;
  }
  .info-header {
    overflow: hidden;
    padding: 20px 10px 10px 10px;
    font-size: 15px;
  }
  .header-title {
    float: left;
  }
  .header-more {
    float: right;
  }
  .info-user {
    width: 95%;
    border-top: #eee 2px solid;
    position: relative;
    margin: 0 auto;
    padding-top: 10px;
    font-size: 15px;
  }
  .info-user img {
    width: 40px;
    border-radius: 50%;
  }
  .info-user span{
    position: absolute;
    top: 50%;
    margin-top: -6px; /* height的一半bai*/
    height: 20px;
    margin-left: 15px;
    color: #000;
  }
  .info-detail {
    font-size: 14px;
    padding: 12px;
  }
  .info-other {
    margin: 10px 0;
  }
  .info-other span{
    font-size: 12px;
    margin-right: 10px;
  }
  .info-imgs img{
    width: 70px;
    margin-right: 2px;
    border-radius: 5px;
  }
</style>
