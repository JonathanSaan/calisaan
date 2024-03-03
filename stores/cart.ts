import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
 state: () => {
    return {
      cart: [],
    };
  },
  
  getters: {
    totalValue() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },

  actions: {
    addToCart(item) {
      const existingItemIndex = this.cart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size
      );

      if (existingItemIndex !== -1) {
        return this.cart[existingItemIndex].quantity++;
      }

      this.cart.push({ ...item, quantity: 1 });
    },
    
    decrementItemQuantity(item) {
      const existingItemIndex = this.cart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size
      );

      if (existingItemIndex !== -1) {
        if (this.cart[existingItemIndex].quantity > 1) {
          return this.cart[existingItemIndex].quantity--;
        } 
        this.cart.splice(existingItemIndex, 1);
      }
    },
    
    removeItem(item) {
      const existingItemIndex = this.cart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size
      );
      
      this.cart.splice(existingItemIndex, 1);
    },
    
    clearCart() {
      this.cart = [];
    }
  },
});
