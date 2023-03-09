<template>
  <v-flex xs9>
    <p>Accepted Types ({{ types.join(", ") }})</p>

    <div v-if="file">
      {{ file }}
    </div>

    <v-btn class="upload-button" color="primary" @click="upload()">
      Select file from Computer
      <v-icon right color="white"> cloud_upload </v-icon>
    </v-btn>

    <span v-if="error" class="error">Must upload a file.</span>

    <a @click="$router.go(-1)" class="cancel">Cancel</a>

    <ProgressScreen :progress="progress" />
  </v-flex>
</template>

<script>
// import { mapMutations, mapGetters } from "vuex";
import FirebaseUploader from "@/services/firebase-upload.js";
import ProgressScreen from "@/components/utils/ProgressScreen.vue";
import auth from "@/services/firebase.js";
// https://www.begueradj.com/file-upload-from-a-nuxt.js-client-to-an-adonisjs-restful-api-server-using-axios/

export default {
  name: "FileUpload",
  props: ["name", "value", "resource"],
  $_veeValidate: {
    value() {
      return this.file;
    },
    name() {
      return "file";
    }
  },
  components: {
    ProgressScreen
  },
  computed: {
    ...mapGetters({
      documents: "documents/list"
    }),
    document() {
      return this.documents[this.resource];
    },
    path() {
      return `/uploads/${auth.currentUser.uid}/${this.document.resource.id}`;
    }
  },
  data() {
    return {
      types: ["pdf", "doc", "docx"],
      progress: false,
      file: false,
      error: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.file = this.value ? this.value : false;
    });
  },
  watch: {
    file(to, from) {
      this.$emit("input", this.file);
    }
  },
  methods: {
    upload() {
      var self = this;
      var options = {
        types: this.types,
        multiple: false,
        resource: this.path
      };
      FirebaseUploader.upload(
        options,
        function (file) {
          self.file = file;
        },
        function (progress) {
          self.progress = progress >= 100 ? false : parseInt(progress);
        }
      );
    },
    remove() {
      var self = this;
      self.file = false;
    }
  }
};
</script>

<style scoped>
.flex {
  margin-top: 2rem;
}
.hide-input {
  display: none;
}
* {
  text-transform: none !important;
}
.upload-button {
  border-radius: 50px;
  color: white;
}

.cancel {
  margin-left: 2rem;
}
</style>
