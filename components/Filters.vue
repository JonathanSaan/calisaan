<template>
  <div>
    <h3 class="mb-3 text-lg font-medium">Category</h3>
    <UCheckbox v-for="(label, index) in categoryLabels" :key="index" class="ml-3 mb-2" :ui="{ color: 'text-black', base: 'cursor-pointer' }" :value="label" @change="handleCheckboxChange($event, label, 'category')" :checked="isChecked(label, 'category')">
      <template #label>
        <span class="cursor-pointer pl-4 ml-[-1rem]">{{ label }}</span>
      </template>
    </UCheckbox>
  </div>
      
  <div class="flex flex-col border-t-[1px] sm:border-t-2 border-gray mt-5 pt-3">
    <h3 class="text-lg font-medium mb-3">Price:</h3>
    <UCheckbox v-for="(label, index) in priceLabels" :key="index" class="ml-3 mb-2" :ui="{ color: 'text-black', base: 'cursor-pointer' }" :value="label" @change="handleCheckboxChange($event, label)" :checked="isChecked(label, 'price')">
      <template #label>
        <span class="cursor-pointer pl-4 ml-[-1rem]">{{ label }}</span>
      </template>
    </UCheckbox>
  </div>
</template>

<script setup>
import useFilter from "~/utils/filterUtils";
const { selectedCategory, selectedPrice, applyFilters } = useFilter();

const categoryLabels = ["Fitness Equipment", "Clothing", "Tops Wear", "Bottom Wear", "Other"];
const priceLabels = ["Under $30.00", "$30.00 - $70.00", "$70.00 - $100.00"];

const handleCheckboxChange = (event, value, type) => {
  if (type === "category") {
    return selectedCategory.value = event.target.checked ? value : null;
  } 
  selectedPrice.value = event.target.checked ? value : null;
}

const isChecked = (label, type) => {
  if (type === "category") {
    return selectedCategory.value === label;
  }
  selectedPrice.value === label;
}

watchEffect(() => {
  applyFilters();
});
</script>
