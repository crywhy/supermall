module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗的宽度
      viewportHeight: 667, // 视窗的高度
      unitPrecision: 5, // 指定’px‘ 转换为视窗单位值保留小数
      viewportUnit: 'vw', // 指定需要转换成的视窗单位
      selectorBlackList: ['ignore', 'tab-bar','bottom-bar','content','nav-bar'], // 指定不需要转换的类（css）
      minPixelValue: 2, // 小于或对于这个值(px)就不需要转换
      mediaQuery: false, // 允许在媒体查询中转换’px‘
      exclude: [/^TabBer/,/^scroll/]
    }
  }
}
