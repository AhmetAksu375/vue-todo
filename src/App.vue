<script setup>
import { ref, computed } from 'vue';
import { useProductStore } from './stores/productStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import 'primeflex/primeflex.css';
import { ToastContainer} from 'react-toastify';
import { toast } from 'vue3-toastify';

const productStore = useProductStore();

const showDialog = ref(false);
const form = ref({
  id: null,
  product: '',
  description: '',
  price: ''
});
const isEditing = ref(false);

const showDialogForm = (product = null) => {
  if (product) {
    form.value = { ...product };
    isEditing.value = true;
  } else {
    form.value = { id: null, product: '', description: '', price: '' };
    isEditing.value = false;
  }
  showDialog.value = true;
};

const saveProduct = () => {
  console.log('saveProduct function called');

  const value = form.value.price;
  if(!form.value.product || !form.value.description || !form.value.price){
    toast.warning('Fill all the blanks');
    return;

  }
  if (isNaN(Number(value)) || Number(value) <= 0) {
  // Handle invalid number
  toast.error('Price must be a valid number greater than 0.');
  return;
}
  productStore.saveProduct(form.value);
  showDialog.value = false;
};

const deleteProduct = (productId) => {
  productStore.deleteProduct(productId);
};

const hideDialog = () => {
  showDialog.value = false;
};
const isEmpty = computed(() => productStore.products.length === 0);

const dialogHeaderText = computed(() => isEditing.value ? "Edit Product" : "Add Product");
</script>

<template>
  <main class="table-container">

    <div class="actions">
      <Button label="Add Product" @click="showDialogForm" />
    </div>
    <div v-if="isEmpty" class="no-products-message w-screen  ">
      <p class="text-left	font-bold	text-2xl">There is no product yet</p>
    </div>
    <DataTable v-else :value="productStore.products" :rows="10" :responsiveLayout="'scroll'" class="w-screen">
      <Column field="id" header="ID"></Column>
      <Column field="product" header="Product"></Column>
      <Column field="description" header="Description"></Column>
      <Column field="price" header="Price"></Column>
      <Column header="Actions" class="w-16rem">
        <template #body="slotProps">
          <Button label="Edit" @click="showDialogForm(slotProps.data)" />
          <Button label="Delete" class="p-button-danger ml-2" @click="deleteProduct(slotProps.data.id)" />
        </template>
      </Column>
    </DataTable>

    <Dialog :header="dialogHeaderText" :visible="showDialog" @hide="hideDialog" :modal="true" :responsive="true">
      <div class="p-grid my-gutter w-19rem">
        <Button class="absolute top-0 right-0 mt-4 mr-4 p-button-danger sm: shadow-1" @click="hideDialog">X</Button>
        <div class="p-col-12 w-full">
          <InputText class="w-full h-3rem" v-model="form.product" placeholder="Product Name" />
        </div>
        <div class="p-col-12 w-full">
          <InputText class="w-full h-3rem" v-model="form.description" placeholder="Description" />
        </div>
        <div class="p-col-12 w-full">
          <InputText class="w-full h-3rem" v-model.number="form.price" placeholder="Price" />
        </div>
      </div>
      <div class="flex flex-column mt-2 gap-2 w-19rem p-2">
        <Button class="shadow-2" label="Save" @click="saveProduct" />
        <Button label="Cancel" class="p-button-secondary shadow-2" @click="hideDialog" />
      </div>
    </Dialog>
  </main>
</template>

<style scoped>
.table {
  width: 100%;
}
.my-gutter [class*=col] { 
  padding: 0.4rem; 
}

.p-button-danger {
  background-color: red;
  border-color: red;
}

.p-dialog .p-button {
  margin-right: 0.5rem;
}
</style>
