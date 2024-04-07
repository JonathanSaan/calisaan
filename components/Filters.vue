<template>
  <div>
    <h3 class="mb-3 text-lg font-medium">Category</h3>
    <UCheckbox
      v-for="(label, index) in categoryLabels"
      :key="index"
      class="ml-3 mb-2"
      :ui="{ color: 'text-black', base: 'cursor-pointer' }"
      :value="label"
      @change="handleCheckboxChange($event, label, 'category')"
      :v-model="categoryLabels"
      :checked="isChecked(label, 'category')"
    >
      <template #label>
        <span class="cursor-pointer pl-4 ml-[-1rem]">{{ label }}</span>
      </template>
    </UCheckbox>
  </div>

  <div class="flex flex-col border-t-[1px] sm:border-t-2 border-gray mt-5 pt-3">
    <h3 class="text-lg font-medium mb-3">Price:</h3>
    <UCheckbox
      v-for="(label, index) in priceLabels"
      :key="index"
      class="ml-3 mb-2"
      :ui="{ color: 'text-black', base: 'cursor-pointer' }"
      :value="label"
      @change="handleCheckboxChange($event, label)"
      :v-model="priceLabels"
      :checked="isChecked(label)"
    >
      <template #label>
        <span class="cursor-pointer pl-4 ml-[-1rem]">{{ label }}</span>
      </template>
    </UCheckbox>
  </div>
</template>

<script setup lang="ts">
import useFilter from "~/utils/filterUtils";

interface FilterState {
  selectedCategory: Ref<string>;
  selectedPrice: Ref<string>;
  applyFilters: () => void;
}

interface CheckboxChangeEvent extends Event {
  target: HTMLInputElement;
}

const { selectedCategory, selectedPrice, applyFilters }: FilterState = useFilter();

const categoryLabels: string[] = ["Fitness Equipment", "Clothing", "Tops Wear", "Bottom Wear", "Other"];
const priceLabels: string[] = ["Under $30.00", "$30.00 - $70.00", "$70.00 - $100.00"];

const handleCheckboxChange = (event: CheckboxChangeEvent, value: string, type: "category"): void => {
  if (type === "category") {
    return selectedCategory.value = event.target.checked ? value : null;
  }
  return selectedPrice.value = event.target.checked ? value : null;
};

const isChecked = (label: string, type: "category"): boolean => {
  if (type === "category") {
    return selectedCategory.value === label;
  }
  return selectedPrice.value === label;
};

watchEffect(() => {
  applyFilters();
});
</script>
