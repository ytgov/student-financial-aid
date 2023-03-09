<template>
  <section>
    <div class="assets">
      <a @click="upload()">
        <div v-if="!assets">
          <div>Upload Assets</div>
          <div>Accepted Types ({{ types.join(", ") }})</div>
        </div>
        <span v-else> <strong>Zip File Exists</strong> (Upload New)</span>
      </a>
    </div>
    <ProgressScreen :progress="progress" />
  </section>
</template>

<style lang="scss" scoped>
div.assets {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  min-height: auto;

  line-height: 1.3;
  padding: 3rem;

  border: solid 1px #60c5bc;
  background: #000;

  > a {
    border: solid 1px #60c5bc;
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 0;
    background: transparent;
    color: #60c5bc;

    font-size: 12px;

    text-transform: uppercase;
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    > div {
      display: block;
      line-height: 1.5;
      text-align: center;
      > div {
        &:nth-of-type(1) {
          color: #fff;
          font-size: 1.5rem;
        }
      }
    }
  }

  &:hover {
    cursor: pointer;
    > a {
      z-index: 10;
    }
  }

  > img {
    position: absolute;
    min-width: 100%;
    min-height: 100%;
    z-index: 1;
  }
}
</style>

<script>
import ProgressScreen from "@/components/utils/ProgressScreen.vue";

export default {
  props: ["name", "value", "resource"],
  $_veeValidate: {
    value() {
      return this.assets;
    },
    name() {
      return "assets";
    }
  },
  components: {
    ProgressScreen
  },
  data() {
    return {
      types: ["zip"],
      progress: false,
      assets: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.assets = this.value ? this.value : false;
    });
  },
  methods: {
    upload() {
      var self = this;
      var options = {
        types: ["zip"],
        multiple: false,
        resource: this.resource
      };
      /* FirebaseUploader.upload(
        options,
        function (assets) {
          self.assets = assets;
        },
        function (progress) {
          self.progress = progress >= 100 ? false : parseInt(progress);
        }
      ); */
    },
    remove() {
      var self = this;
      self.assets = false;
    }
  },
  watch: {
    assets(to, from) {
      this.$emit("input", this.assets);
    }
  }
};
</script>
