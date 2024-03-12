<template>
  <div>
    <h3 class="mb-3 text-lg font-medium">Category</h3>
    <UCheckbox v-for="(label, index) in categoryLabels" :key="index" class="ml-3 mb-2" :ui="{ color: 'text-black', base: 'cursor-pointer' }">
      <template #label>
        <span class="cursor-pointer pl-4 ml-[-1rem]">{{ label }}</span>
      </template>
    </UCheckbox>
  </div>
      
  <div class="flex flex-col border-t-[1px] sm:border-t-2 border-gray mt-5 pt-3">
    <h3 class="text-lg font-medium mb-3">Price:</h3>
    <UCheckbox v-for="(label, index) in priceLabels" :key="index" class="ml-3 mb-2" :ui="{ color: 'text-black', base: 'cursor-pointer' }">
      <template #label>
        <span class="cursor-pointer pl-4 ml-[-1rem]">{{ label }}</span>
      </template>
    </UCheckbox>
  </div>
</template>

<script setup>
const categoryLabels = ["Fitness Equipment", "Clothing", "Tops Wear", "Bottom Wear", "Other"];
const priceLabels = ["Under $50.00", "$50.00 - $100.00", "$100.00 - $200.00"];
</script>
