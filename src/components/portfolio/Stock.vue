<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-info">
      <div class="panel-heading">
        <div class="panel-title">
          {{stock.name}}
          <small>(Price: {{stock.price}} | Quantity: {{stock.quantity}})</small>
        </div>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input
            v-model="quantity"
            type="number"
            class="form-control"
            :class="{danger: insufficientQuantity}"
            placeholder="Quantity"
          />
        </div>
        <div class="pull-right">
          <button
            :disabled="insufficientQuantity || quantity <= 0 || !Number.isInteger(+quantity)"
            @click="sellStock"
            class="btn btn-success"
          >{{insufficientQuantity ? 'Not enough':'Sell'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["stock"],
  data() {
    return {
      quantity: 0
    };
  },
  computed: {
    insufficientQuantity() {
      return this.quantity > this.stock.quantity;
    }
  },
  methods: {
    ...mapActions({ placeSellOrder: "sellStock" }),
    sellStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      this.placeSellOrder(order);
      this.quantity = 0;
    }
  }
};
</script>

<style scoped>
.danger {
  border: 1px solid red;
}
</style>