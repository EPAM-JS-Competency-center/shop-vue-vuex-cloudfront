<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="handleFormSubmit"
  >
    <v-row>
      <v-col cols="12" md="12">
        <v-text-field
          :label="$t('products.title')"
          v-model="title"
          :rules="validationRules"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="12">
        <v-text-field
          :label="$t('products.description')"
          v-model="description"
          :rules="validationRules"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          :label="$t('products.price')"
          v-model="price"
          :rules="validationRules"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          :label="$t('products.count')"
          v-model="count"
          :rules="validationRules"
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="d-flex justify-end">
        <v-btn class="mr-1" type="button" @click="handleFormReset"> {{ $t("common.clear") }} </v-btn>

        <v-btn class="ml-1" type="submit" color="primary">
          {{ $t("products.save") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";

type VuetifyFormElement = Vue & { validate(): void };
// TODO: common validation rules
const required = (v: string) => !!v || "Field is required";

export default Vue.extend({
  data: () => ({
    valid: true,
    validationRules: [required],
    //
    title: "",
    description: "",
    count: "",
    price: "",
  }),
  methods: {
    triggerValidation(): void {
      (this.$refs.form as VuetifyFormElement).validate();
    },
    handleFormSubmit() {
      this.triggerValidation();

      this.$emit("submit", {
        title: this.title,
        description: this.description,
        count: this.count,
        price: this.price,
      });
    },
    handleFormReset () {
      this.title = '';
      this.description = '';
      this.count = '';
      this.price = '';
    }
  },
});
</script>
