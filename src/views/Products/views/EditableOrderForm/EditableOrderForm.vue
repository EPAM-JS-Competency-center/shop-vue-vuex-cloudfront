<template>
  <div class="grey lighten-5">
    <v-container class="white">
      <h4 class="text-h4 d-flex justify-center py-6">
        {{ $t("orders.manageOne") }}
      </h4>

      <v-order-details
        :cartItems="cartItems"
        :address="address"
      ></v-order-details>
      <v-row>
        <v-form>
          <v-col cols="12" md="12">
            Status:

            <span>
                {{ initialOrderStatus }}
            </span>
          </v-col>

          <v-col cols="12" md="12"> Change status: </v-col>

          <v-col cols="12">
            <v-status-select :value="statusSelectValue"> </v-status-select>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field label="Comment"></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-btn type="button" color="primary">
              {{ $t("common.changeStatus") }}
            </v-btn>
          </v-col>
        </v-form>

        <v-col cols="12" md="12">
          <v-status-history-table :items="statusHistoryItems">
          </v-status-history-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { ORDER_STATUS } from "@/models/order";

import VOrderDetails from "../CartCheckout/ui/OrderDetails.vue";
import VStatusHistoryTable from "./ui/StatusHistoryTable.vue";
import VStatusSelect from "./ui/StatusSelect.vue";

export default Vue.extend({
  name: "EditableOrderForm",
  data: () => ({
    cartItems: [],
    address: {},

    statusSelectValue: ORDER_STATUS.Open,
    initialOrderStatus: ORDER_STATUS.Open,
    statusHistoryItems: [],
  }),
  components: { VOrderDetails, VStatusSelect, VStatusHistoryTable },
});
</script>
