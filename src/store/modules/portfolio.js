const state = {
  funds: 10000,
  stocks: [],
};

const mutations = {
  'BUY_STOCK'(state, { stocksId, quantity, stockPrice }) {
    const record = state.stocks.find(el => el.id === stocksId);
    if (record) {
      record.quantity += quantity;
    } else {
      state.stocks.push({
        id: stocksId,
        quantity
      });
    }
    state.funds -= stockPrice * quantity;
  },
  'SELL_STOCK'(state, { stocksId, quantity, stockPrice }) {
    const record = state.stocks.find(el => el.id === stocksId);
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }
    state.funds += stockPrice * quantity;
  }
};

const actions = {
  sellStock({ commit }, oder) {
    commit('SELL_STOCK', order);
  }
};

const getters = {
  stocksPortfolio(state, getters) {
    return state.stocks.map(stock => {
      const record = getters.stocks.find(el => el.id === stock.id);
      return {
        ...stock,
        name: record.name,
        price: record.price,
      }
    });
  },
  funds(state) {
    return state.funds;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}