<!--联系各方-->
<template>
  <div class="evidence_content">
    <back-btn title="联系各方"/>
    <section>
      <div class="el-form-item">
        <label class="el-form-item__label" for="desc">发送文字</label>
        <div class="el-form-item__content">
          <el-input type="textarea" v-model="form.desc" name="desc"></el-input>
        </div>
      </div>
      <div class="el-form-item">
        <label class="el-form-item__label" for="desc">发送语音(最大时长1分钟)</label>
        <div class="el-form-item__content recorder__content">
          <div class="recorder__content-box">
            <i
              class="iconfont icon-recorder"
              @click="startRecord"
              v-if="!isRecording && !hasRecord"
            ></i>
            <i
              class="iconfont icon-recording"
              @click="stopRecord"
              v-else-if="isRecording && !hasRecord"
            ></i>
            <i class="iconfont icon-play" v-else-if="!isRecording && hasRecord"></i>
            <p class="record__time">{{formatedRecordTime}}</p>
            <el-progress :percentage="progressVal"></el-progress>
          </div>
        </div>
      </div>
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
        <el-radio-button label="1">发送图片</el-radio-button>
        <el-radio-button label="2">发送视频</el-radio-button>
      </el-radio-group>
      <div class="el-form-item" v-if="tabPosition == 1">
        <div class="el-form-item__content">
          <el-input type="textarea" v-model="form.desc" name="desc"></el-input>
        </div>
      </div>
      <div class="el-form-item" v-if="tabPosition == 2">
        <div class="el-form-item__content">
          <el-input type="textarea" v-model="form.desc" name="desc"></el-input>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Recorder from "@/utils/recorder.js";
import { formatTime } from "@/utils/tools";
import uploadFiles from "@/service/upload";
import { mapGetters, mapState } from "vuex";
import { cosOption } from "@/service/config";
const DefaultProgressVal = Number((100 / 60).toFixed(2));
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      audioContext: null,
      recorder: null,
      isRecording: false,
      blob: null,
      tabPosition: 1,
      recordTimeInterval: null,
      formatedRecordTime: "00:00:00",
      recordTime: 0,
      hasRecord: false,
      progressVal: 0
    };
  },
  computed:{
    ...mapState(['privateChatId'])
  },
  computed:{
    privateChatId(val){
      console.log(val)
    }
  },
  methods: {
    RecorderInit() {
      let _this = this;
      try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia =
          navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;

        audio_context = new AudioContext();
        console.log(
          "navigator.getUserMedia " +
            (navigator.getUserMedia ? "available." : "not present!")
        );
      } catch (e) {
        // alert("No web audio support in this browser!");
      }

      navigator.getUserMedia(
        { audio: true },
        function(stream) {
          console.log(stream);
          _this.recorder = new Recorder(stream);
          console.log("初始化完成");
        },
        function(e) {
          console.log("No live audio input: " + e);
        }
      );
    },
    startRecording() {
      this.isRecording = true;
      this.recordTimeInterval = setInterval(() => {
        var recordTime = (this.recordTime += 1);
        this.progressVal = Number(parseInt(DefaultProgressVal * recordTime));
        this.formatedRecordTime = formatTime(this.recordTime);
        this.recordTime = recordTime;
        if (this.recordTime == 60) {
          clearInterval(this.recordTimeInterval);
          this.recordTimeInterval = null;
          this.hasRecord = true;
          this.isRecording = false;
        }
      }, 1000);
      if (this.recorder) {
        this.recorder.start();
        this.isRecording = true;
      }
    },
    startRecord() {
      this.startRecording();
    },
    stopRecord() {
      clearInterval(this.recordTimeInterval);
      this.recordTimeInterval = null;
      this.isRecording = false;
      this.hasRecord = true;
      this.recorder.stop();
      var mp3Blob = this.recorder.upload();
      console.log(mp3Blob);
      var fd = new FormData();
      fd.append("audio", mp3Blob);
      uploadFiles(cosOption.Bucket, cosOption.Region, 'audio', mp3Blob)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.RecorderInit();
    });
  },
  beforeDestroy() {
    this.isRecording = false;
    clearInterval(this.recordTimeInterval);
    this.recordTimeInterval = null;
  }
};
</script>
<style lang="scss" scoped>
.recorder__content {
  line-height: 2;
  display: inline-block;
  width: 100%;
  vertical-align: bottom;
  font-size: 14px;
  min-height: 120px;
  border: 1px solid #DCDFE6;
  padding: 0 15px;
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;

  .recorder__content-box {
    display: flex;
    position: relative;

    .iconfont {
      cursor: pointer;
      font-size: 40px;
      color: #0052D9;
      margin-right: 15px;
      line-height: 1.5;
      width: 40px;

      &:hover {
        color: #55aeef;
      }
    }

    .record__time {
      position: absolute;
      right: 40%;
      z-index: 2;
    }

    .el-progress {
      line-height: 4;
      width: 100%;
    }
  }
}
</style>
