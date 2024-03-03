export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxt/image", "@pinia/nuxt"],
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
  colorMode: {
    preference: "light"
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
        { rel: "icon", type: "image/png", href: "/favicon.ico" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" }
      ]
    }
  },
});
