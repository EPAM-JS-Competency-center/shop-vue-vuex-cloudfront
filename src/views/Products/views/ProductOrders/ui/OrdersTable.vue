<template>
  <v-data-table
    :headers="headers"
    :items="mappedOrders"
    :items-per-page="10"
    :loading="{ isLoading }"
    loading-text="Loading... Please wait"
    item-key="id"
    class="elevation-1"
  >
    <template v-slot:loading>
      <v-progress-linear
        indeterminate
        color="indigo"
      ></v-progress-linear>

      <p class="pa-2 v-data-table__empty-wrapper">Loading... Please wait</p>
    </template>

    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.customerInfo }}</td>
        <td>
          <v-chip :color="item.orderColorIndicator" dark>
            {{ item.orderItemsCount }}
          </v-chip>
        </td>
        <td>
          {{ item.address }}
        </td>

        <td>{{ item.status }}</td>

        <td>
          <v-btn color="primary" small :to="`/admin/order/${item.id}`">
            Manage
          </v-btn>

          <v-btn color="error" @click="deleteOrder(item.id)" small>
            Delete
          </v-btn>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";

const headers = [
  { text: "From", value: "from" },
  { text: "Items count", value: "itemsCount" },
  { text: "Address", value: "address" },
  { text: "Status", value: "status" },
  { text: "Action", value: "action" },
];

// TODO Enum
const getColor = (count: number) => {
  if (count > 100) {
    return "green";
  }

  if (count > 50) {
    return "orange";
  }

  return "red";
};

// TODO: avoid any
const mapOrder = (order: any) => {
  const address = Object(order.address);

  const firstName = address?.firstName;
  const lastName = address?.lastName;
  const length = order.items.length;

  const statusHistory = order.statusHistory;
  const lastStatusIndex = order.statusHistory.length - 1;

  const status = statusHistory[lastStatusIndex].status.toUpperCase();

  return {
    id: order.id,
    customerInfo: `${firstName} ${lastName}`,
    orderColorIndicator: getColor(length),
    orderItemsCount: length || 0,
    address: address.address || "",
    status: status || "",
  };
};

export default Vue.extend({
  name: "OrdersTable",
  props: {
    orders: Array,
    isLoading: Boolean,
  },
  data() {
    return {
      headers,
    };
  },
  computed: {
    mappedOrders() {
      return this.orders.map(mapOrder);
    },
  },
  methods: {
    deleteOrder(orderId: string) {
      this.$emit("delete-order", orderId);
    },
  },
});
</script>
