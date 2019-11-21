<template>
  <div class="message_input">
    <div class="input_tool">
      <i class="el-icon-microphone"></i>
      <i class="el-icon-picture-outline"></i>
      <i class="el-icon-files"></i>
      <i class="el-icon-receiving"></i>
      <i class="el-icon-set-up" @click="handleShowModal"></i>
    </div>
    <div class="func-area" v-if="drawer">
      <ul class="func-area__content">
        <li v-for="(item, index) in count" :key="index" class="func-area__item">
          <span class="el-icon el-icon-chat-round"></span>
          <div class="title">功能按钮</div>
        </li>
      </ul>
    </div>
    <textarea name id cols="30" rows="10" class="input_area" placeholder="请在此输入内容" v-else></textarea>
    <div class="send" @click="send" v-if="!drawer">
      <span>发送(ent)</span>
    </div>
    <a-drag-modal
      :showWin.sync="showWin"
      :width="600"
      :height="400"
      @update:showWin="showWin = false"
    >
      <div slot="title">标题</div>
      <div slot="content" draggable="false">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </a-drag-modal>
  </div>
</template>

<script>
import ADragModal from "@/components/AdragModal";
const { ipcRenderer } = require("electron");
export default {
  data() {
    return {
      drawer: false,
      count: 10,
      showWin: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  computed: {
    caseNo: {
      get() {
        return this.$store.state.cases.caseNo;
      }
    }
  },
  components: { ADragModal },
  methods: {
    send() {},
    handleShowModal() {
      this.showWin = true;
    },
    onSubmit() {
      console.log("submit!");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.message_input {
  border-top: 1px solid $borderColor;
  height: 200px;
  position: relative;
  .input_tool {
    height: 40px;
    line-height: 40px;
    color: #888a92;
    font-size: 20px;
    padding: 0 10px;
    i {
      padding: 0 5px;
      cursor: pointer;
      &:hover {
        color: #12b7f5;
      }
    }
  }
  .func-area {
    background: #ffffff;
    &__content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    &__item {
      margin-right: 10px;
      span.el-icon {
        background: #f3f3f3;
        border-radius: 10px;
        text-align: center;
        color: #888a92;
        border: 1px solid #f3f3f3;
        line-height: 50px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        font-size: 22px;
      }
      .title {
        text-align: center;
        font-size: 12px;
      }
      &:hover {
        color: #12b7f5;
      }
    }
  }
  .input_area,
  .func-area {
    padding: 10px;
    height: 160px;
    box-sizing: border-box;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
    font-size: 16px;
  }
  .send {
    position: absolute;
    bottom: 10px;
    right: 20px;
    width: 75px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #12b7f5;
    border-radius: 3px;
    background: #12b7f5;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;

    &:hover {
      background: #12b7f5;
      color: #fff;
    }
  }
}
</style>