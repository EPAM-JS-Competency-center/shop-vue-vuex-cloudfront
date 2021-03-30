
<template>
  <v-form class="my-4" @submit.prevent="uploadFile">
    <v-file-input
      v-model="file"
      placeholder="Upload your files"
      label="File input, click here"
      show-size
      prepend-icon="mdi-paperclip"
    >
      <template v-slot:selection="{ text }">
        <v-chip label color="">
          {{ text }}
        </v-chip>
      </template>
    </v-file-input>

    <div class="my-2" v-if="file">
      <v-btn class="mr-1" type="submit" color="primary" small>
        Upload file
      </v-btn>

      <v-btn class="ml-1" color="error" small @click="resetFile">
        Remove file
      </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";

import axios from "axios";

const fetchPresignedS3Url = (url: string, fileName: string) => {
  return axios({
    method: "GET",
    url,
    params: {
      name: encodeURIComponent(fileName),
    },
  });
};

export default Vue.extend({
  name: "CSVFileUploader",
  props: {
    url: String,
  },
  data(): { file: File | null } {
    return {
      file: null,
    };
  },
  methods: {
    async uploadFile() {
      const file = this.file as File;
      const destUrl = await fetchPresignedS3Url(this.url, file.name);

      console.info("Uploading to: ", destUrl.data);

      const result = await fetch(destUrl.data, {
        method: "PUT",
        body: file,
      });

      console.info("Result: ", result);

      this.resetFile();
    },
    resetFile() {
      this.file = null;
    },
  },
});
</script>