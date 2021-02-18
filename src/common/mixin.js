import BackTop from "components/content/backTop/BackTop";

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      backTopViews: false
    }
  },
  methods: {
    handleBackTop() {
      this.$refs.scroll.scrollTo(0,0,200)
    },
    listenShowBackTop(position) {
      this.backTopViews = (-position.y) > 1000
    }
  }
}
