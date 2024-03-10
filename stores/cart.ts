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
    initializeCartFromLocalStorage() {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    },

    saveCartToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    addToCart(item) {
      const existingItemIndex = this.cart.findIndex((cartItem) => cartItem.id === item.id && cartItem.size === item.size);

      if (existingItemIndex !== -1) {
        this.cart[existingItemIndex].quantity++;
        this.saveCartToLocalStorage();
        return;
      }

      this.cart.push({ ...item, quantity: 1 });
      this.saveCartToLocalStorage();
    },
    
    decrementItemQuantity(item) {
      
      const existingItemIndex = this.cart.findIndex((cartItem) => cartItem.id === item.id && cartItem.size === item.size);

      if (existingItemIndex === -1) {
        return;
      }

      if (this.cart[existingItemIndex].quantity > 1) {
        this.cart[existingItemIndex].quantity--;
        this.saveCartToLocalStorage();
        return;
      }
      
      this.cart.splice(existingItemIndex, 1);
      this.saveCartToLocalStorage();
    },
    
    removeItem(item) {
      const existingItemIndex = this.cart.findIndex((cartItem) => cartItem.id === item.id && cartItem.size === item.size);
      
      if (existingItemIndex !== -1) {
        this.cart.splice(existingItemIndex, 1);
        this.saveCartToLocalStorage();
      }
    },
    
    clearCart() {
      this.cart = [];
      this.saveCartToLocalStorage();
    }
  },
});
