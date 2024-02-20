export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/ui", "@nuxt/image", "nuxt-icon"],
  target: "static",
  build: {
    extractCSS: true,
    terser: {
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  },
  image: {
    formats: {
      webp: {
        quality: 80
      }
    }
  },
  app: {
    head: {
      title: "CaliSaan",
      meta: [
        { name: "description", content: "Discover top-quality fitness products to help you reach your health and wellness goals. From cutting-edge workout gear to performance-enhancing supplements, CaliSaan has everything you need for a fit and active lifestyle. Start your journey to a healthier you today!" },
        { name: "og:description", content: "Discover top-quality fitness products to help you reach your health and wellness goals. From cutting-edge workout gear to performance-enhancing supplements, CaliSaan has everything you need for a fit and active lifestyle. Start your journey to a healthier you today!" },
        { name: "og:type", content: "website" },
        { name: "og:locale", content: "en_US" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.ico" }
      ]
    }
  },
});
