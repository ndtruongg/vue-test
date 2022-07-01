<template>
  <li
    class="bg-white shadow-lg p-4 rounded-lg flex justify-between w-full mb-3"
  >
    <div class="flex items-center">
      <img
        class="w-12 h-12 rounded-full"
        :src="payment.image"
        :alt="payment.name"
      />
      <div class="ml-3">
        <p class="text-gray-900 font-sans tracking-wide text-sm">
          Payment to {{ payment.name }}
        </p>
        <div class="flex text-sm">
          <p class="font-semibold mr-1">{{ payment.amount }}</p>
          <span class="text-gray-600">{{ payment.currency }}</span>
        </div>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    payment: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
