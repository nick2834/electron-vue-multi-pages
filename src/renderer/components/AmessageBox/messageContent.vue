<template>
  <div class="message_box">
    <div class="message_title">
      <span class="title">Web前端（JS|React|Angular|V</span>
    </div>
    <ul class="message_list infinite-list" v-infinite-scroll="load">
      <li class="message_item infinite-list-item" v-for="i in newsList" :key="i">
        <div class="message_main" :class="i%2 == 0 ? 'other':'self'">
          <img
            v-if="i%2 == 0"
            src="~@/assets/images/avatar.jpg"
            class="avatar"
            width="36"
            height="36"
          />
          <img v-else src="~@/assets/images/avatar.png" class="avatar" width="36" height="36" alt />
          <div class="message_body">
            <div class="username">{{i%2 == 0 ?'张三':'李四'}}</div>
            <div
              class="content"
            >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, voluptas quod? Porro voluptatibus assumenda quibusdam impedit enim repudiandae molestias minima ipsam ad repellendus necessitatibus dolore eligendi, consectetur consequuntur sit quo.</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: 0
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.message_box {
  height: calc(100vh - 256px);
  .message_title {
    font-weight: bold;
    line-height: 30px;
    padding: 0 10px;
    border-bottom: 1px solid $borderColor;
    .title {
      cursor: pointer;
    }
  }
  .message_list {
    height: calc(100vh - 286px);
    overflow-y: scroll;
    .message_item {
      overflow: hidden;
    }
    .message_main {
      .username {
        font-size: 12px;
        line-height: 2;
        color: #999999;
        position: relative;
      }
      .content {
        display: inline-block;
        position: relative;
        padding: 6px 10px;
        max-width: 330px;
        min-height: 36px;
        line-height: 24px;
        box-sizing: border-box;
        font-size: 14px;
        text-align: left;
        word-break: break-all;
        background-color: #f3f3f3;
        border-radius: 4px;
        &:before {
          content: " ";
          position: absolute;
          top: 12px;
          right: 100%;
          border: 6px solid transparent;
          border-right-color: #f3f3f3;
        }
      }
      &.self {
        text-align: right;
        .avatar {
          float: right;
          margin: 0 15px;
          margin-left: 0;
        }

        .message_body {
          margin-right: 15px;
          margin-left: 0;
          .content {
            background-color: #d9f4fe;
            &:before {
              left: 100%;
              border-right-color: transparent;
              border-left-color: #d9f4fe;
            }
          }
        }
      }
      &.other {
        text-align: left;
        .avatar {
          float: left;
          margin-left: 15px;
          border-radius: 3px;
        }
        .message_body {
          display: inline-block;
          margin-left: 15px;
          position: relative;
        }
      }
    }
  }
}
</style>