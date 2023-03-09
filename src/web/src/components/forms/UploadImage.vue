<template>
  <section>
    <div class="image">
      <img :src="image" id="image" v-if="image" />
      <a @click="upload()">
        <div v-if="!image">
          <div>Upload Image</div>
          <div>Accepted Types ({{ types.join(", ") }})</div>
        </div>
        <span class="change" v-else>Change Photo</span>
      </a>
    </div>
    <span v-if="error" class="error">Must upload an image.</span>
    <ProgressScreen :progress="progress" />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

div.image {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  min-height: 340px;

  line-height: 0;

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
    > span {
      &.change {
        background: #000;
        color: #fff;
        padding: 1rem 2rem;
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

.profile-photo {
  > div.image {
    height: 150px;
    width: 150px;
    min-height: 150px;
    border-radius: 100%;
    overflow: hidden;
    > a {
      border-radius: 100%;
      overflow: hidden;
    }
    > img {
      width: 100%;
    }
  }
}

.movie-cover {
  > div.image {
    width: 40%;
  }
}

.logo {
  > div.image {
    min-height: auto;
    height: 70px;
    width: 250px;
    overflow: hidden;
    > a {
      overflow: hidden;
    }
    > img {
      width: 100%;
    }
  }
}

.product {
  > div.image {
    width: 500px;
    height: 500px;
    min-height: 250px;
  }
}

.studio-image {
  // 5, 3
  @include aspect-ratio-overflow(2, 1);

  > div.image {
    @include full();
  }
}
</style>

<script>
import FirebaseUploader from "@/services/firebase-upload.js";
import ProgressScreen from "@/components/utils/ProgressScreen.vue";

// https://codepen.io/blackjacques/pen/bqgNoa

export default {
  props: ["name", "value", "resource", "ratio", "error"],
  $_veeValidate: {
    // value getter
    value() {
      return this.image;
    },
    // name getter
    name() {
      return "image";
    }
  },
  components: {
    ProgressScreen
  },
  data() {
    return {
      types: ["jpg", "jpeg", "png"],
      progress: false,
      image: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.image = this.value ? this.value : false;
    });
  },
  methods: {
    upload() {
      var self = this;

      var options = {
        types: ["jpg", "jpeg", "png"],
        multiple: false,
        resource: this.resource
      };
      FirebaseUploader.upload(
        options,
        function (image) {
          self.image = image;
        },
        function (progress) {
          self.progress = progress >= 100 ? false : parseInt(progress);
        }
      );
    }
  },
  watch: {
    image(to, from) {
      this.$emit("input", this.image);
      this.$emit("change", this.image);
    }
  }
};
</script>
