<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
    // #ifdef H5
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    // #endif
    // pcFrom，pc端演示页面
    if (!this.$route.query.pcFrom && !this.$route.query.iframe && !this.$route.fullPath.includes("customerService")) {
      // 获取用户信息
      this.$store.dispatch("ObtainUserInfo");
    }
  },
  // onShow: function () {
  //   console.log('App Show')
  // },
  // onHide: function () {
  //   console.log('App Hide')
  // }
}
</script>

<style lang="scss">
/* 引入uView基础样式 */
@import '@/uni_modules/uview-ui/index.scss';
// @import "@/components/active-form/css/active-form.scss";//注入active-form样式
/*每个页面公共scss */
@import 'app.scss';
</style>
