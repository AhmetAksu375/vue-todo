// stores/productStore.js
import { defineStore } from 'pinia';
import { toast } from 'vue3-toastify';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: JSON.parse(localStorage.getItem('products')) || []
  }),
  actions: {
    saveProduct(product) {
      const index = this.products.findIndex(p => p.id === product.id);
      if (index === -1) {
        product.id = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
        this.products.push(product);
        toast.success('Product added successfully.');
    } else {
        this.products[index] = { ...product };
        toast.success('Product updated successfully.');

      }
      localStorage.setItem('products', JSON.stringify(this.products));
    },

    deleteProduct(productId) {
      const index = this.products.findIndex(p => p.id === productId);
      if (index !== -1) {
        this.products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(this.products));
        toast.success('Product deleted successfully.');

      } else {
        toast.success('Product not found.');

      }
    }
  }
});
