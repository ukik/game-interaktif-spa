import { boot } from 'quasar/wrappers'
import { defineAsyncComponent } from 'vue'
import { scroll, date, Notify, Platform, Screen, Cookies } from "quasar";

export default boot(({ app }) => {

  // app.mixin({
  //   computed: {
  //     // is_mobile_size() {
  //     //   return Screen.width < 768;
  //     // },
  //     // is_ipad_size() {
  //     //   return Screen.width >= 768 && Screen.width < 1024;
  //     // },

  //     // is_mobile_size() {
  //     //   return Screen.width <= 425;
  //     // },
  //     // is_higher_mobile_size() {
  //     //   return Screen.width > 425;
  //     // },
  //     // is_higher_ipad_size() {
  //     //   return Screen.width > 768;
  //     // },
  //     // is_ipad_size() {
  //     //   return Screen.width <= 768 && Screen.width >= 425;
  //     // },
  //     // is_lower_ipad_size() {
  //     //   return Screen.width <= 768;
  //     // },
  //     // is_lower_laptop_size() {
  //     //   return Screen.width <= 1024;
  //     // },
  //     // is_higher_laptop_size() {
  //     //   return Screen.width > 1024;
  //     // },
  //     // is_higher_ipad_size_route() {
  //     //   return Screen.width > 768 ? "" : "";
  //     // },
  //     // is_mobile_size_route() {
  //     //   return Screen.width <= 425 ? "" : "";
  //     // },
  //     // is_higher_desktop_size() {
  //     //   return Screen.width > 1440;
  //     // },
  //   }
  // })

  app.component("HomeCarousel",
    defineAsyncComponent(() => import('src/components/HomeCarousel.vue'))
  )

  app.component("HomeExclusive",
    defineAsyncComponent(() => import('src/components/HomeExclusive.vue'))
  )

  app.component("HomeIcon",
    defineAsyncComponent(() => import('src/components/HomeIcon.vue'))
  )


  app.component("HomeCategory",
    defineAsyncComponent(() => import('src/components/HomeCategory.vue'))
  )

  app.component("HomeFlavor",
    defineAsyncComponent(() => import('src/components/HomeFlavor.vue'))
  )

  app.component("HomeNew",
    defineAsyncComponent(() => import('src/components/HomeNew.vue'))
  )

  app.component("HomeBestSelling",
    defineAsyncComponent(() => import('src/components/HomeBestSelling.vue'))
  )

  app.component("HomeProductCarousel",
    defineAsyncComponent(() => import('src/components/HomeProductCarousel.vue'))
  )

  app.component("ListExclusive",
    defineAsyncComponent(() => import('src/components/ListExclusive.vue'))
  )
  app.component("ListSpecial",
    defineAsyncComponent(() => import('src/components/ListSpecial.vue'))
  )
  app.component("ListDeal",
    defineAsyncComponent(() => import('src/components/ListDeal.vue'))
  )
  app.component("ListPackage",
    defineAsyncComponent(() => import('src/components/ListPackage.vue'))
  )

  app.component("ListMenuCategory",
    defineAsyncComponent(() => import('src/components/ListMenuCategory.vue'))
  )

  app.component("ListColumn",
    defineAsyncComponent(() => import('src/components/ListColumn.vue'))
  )

  app.component("ListDrink",
    defineAsyncComponent(() => import('src/components/ListDrink.vue'))
  )

  app.component("ListDialogStore",
    defineAsyncComponent(() => import('src/components/ListDialogStore.vue'))
  )


  app.component("QuizMediaComponent",
    defineAsyncComponent(() => import('src/components/quiz/QuizMediaComponent.vue'))
  )
  app.component("ReportCardSummary",
    defineAsyncComponent(() => import('src/components/quiz/ReportCardSummary.vue'))
  )
  app.component("QuizIndexCard",
    defineAsyncComponent(() => import('src/components/quiz/QuizIndexCard.vue'))
  )

  app.component("LogoutConfirmDialog",
    defineAsyncComponent(() => import('src/components/lms/LogoutConfirmDialog.vue'))
  )

  app.component("Pagination",
    defineAsyncComponent(() => import('src/components/lms/Pagination.vue'))
  )

  app.component("NoDataSVG",
    defineAsyncComponent(() => import('src/components/lms/NoDataSVG.vue'))
  )
  app.component("EmptyBlock",
    defineAsyncComponent(() => import('src/components/lms/EmptyBlock.vue'))
  )

  app.component("InitLoading",
    defineAsyncComponent(() => import('src/components/lms/InitLoading.vue'))
  )

  // app.component("FormCreateTugas",
  //   defineAsyncComponent(() => import('src/views/FormCreateTugas.vue'))
  // )


  // app.component("RelatedImageSlide",
  //   defineAsyncComponent(() => import('src/components/RelatedImageSlide.vue'))
  // )
  // app.component("RelatedImageSlideCarousel",
  //   defineAsyncComponent(() => import('src/components/RelatedImageSlideCarousel.vue'))
  // )

})
