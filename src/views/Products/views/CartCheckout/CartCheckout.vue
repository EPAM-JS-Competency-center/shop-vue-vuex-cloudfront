<template>
  <div class="grey lighten-5">
    <v-container>
      <v-stepper v-model="stepIndex">
        <h4 class="text-h4 d-flex justify-center py-6">Checkout</h4>

        <v-stepper-header>
          <v-stepper-step :complete="stepIndex > 1" step="1">
            Review your cart
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="stepIndex > 2" step="2">
            Shipping address
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3"> Review your order </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-review-your-cart-step
              :cartItems="cartItems"
              @complete="handleReviewCartStep1"
            ></v-review-your-cart-step>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-shipping-address-step
              @complete="handleShippingAddressStep2"
            ></v-shipping-address-step>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-review-your-order-step
              :cartItems="cartItems"
              :address="address"
              @complete="handleOrderStep3"
            ></v-review-your-order-step>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import VReviewYourCartStep from "./ui/ReviewYourCartStep.vue";
import VShippingAddressStep from "./ui/ShippingAddressStep.vue";
import VReviewYourOrderStep from "./ui/ReviewYourOrderStep.vue";

interface ShippingAddressFormValues {
  firstname: string;
  lastname: string;
  address: string;
  comment?: string;
}

export default Vue.extend({
  name: "CartCheckout",
  components: {
    VShippingAddressStep,
    VReviewYourCartStep,
    VReviewYourOrderStep,
  },
  data: () => ({
    address: {},
    stepIndex: 1,
    cartItems: [],
  }),
  methods: {
    goBackStep() {
      this.stepIndex -= 1;
    },
    goNextStep() {
      this.stepIndex += 1;
    },
    handleReviewCartStep1() {
      console.log("i`m fine");
      this.goNextStep();
    },
    handleShippingAddressStep2(values: ShippingAddressFormValues) {
      console.info(values);
      this.goNextStep();
    },
    handleOrderStep3() {
      this.goNextStep();
    },
  },
});
</script>

<style scoped></style>
