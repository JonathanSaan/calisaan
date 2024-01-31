export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['@fortawesome/fontawesome-free/css/all.css'],
  app: {
    head: {
      title: 'CaliSaan',
      meta: [
        { name: 'description', content: 'Discover top-quality fitness products to help you reach your health and wellness goals. From cutting-edge workout gear to performance-enhancing supplements, CaliSaan has everything you need for a fit and active lifestyle. Start your journey to a healthier you today!' }
      ],
    }
  }
})
