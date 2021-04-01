<template>
  <v-data-table
    :headers="headers"
    :items="mappedStatusHistoryItems"
    :items-per-page="10"
    :loading="isFetching"
    item-key="id"
    class="elevation-1"
  >
    <template v-slot:loading>
      <v-progress-linear indeterminate color="indigo"></v-progress-linear>

      <p class="pa-2 v-data-table__empty-wrapper">
        {{ $t("app.loading") }}
      </p>
    </template>

    <template v-slot:item="{ item }">
      <tr>
        <td>
          {{ item.status }}
        </td>
        <td>
          {{ item.date }}
        </td>
        <td>
          {{ item.status }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";

import type { StatusHistory } from "@/models/order";

export default Vue.extend({
  name: "StatusHistoryTable",
  props: {
    items: Array,
  },
  data() {
    const toi18n = (v: string) => this.$t(v);

    return {
      isFetching: false,
      headers: [
        { text: toi18n("common.status"), value: "status" },
        { text: toi18n("common.dateAndTime"), value: "timestamp" },
        { text: toi18n("common.comment"), value: "comment" },
      ],
    };
  },
  computed: {
    mappedStatusHistoryItems() {
      // @ts-expect-error todo
      return this.items.map((item: StatusHistory, i: number) => ({
        id: i,
        date: new Date(item.timestamp),
        status: item.status,
        comment: item.comment,
      }));
    },
  },
  methods: {
    deleteOrder(orderId: string) {
      this.$emit("delete-order", orderId);
    },
  },
});
</script>
