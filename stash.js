
const mitm = [
  "g.cn",
  "*.google.cn",
  "weather-data.apple.com",
  "weather-data.apple.com:*",
  "*.weather-data.apple.com"
]
const forceHttpEngine = [
  "g.cn",
  "*.google.cn"
]
const rewrite = [
  "^https?:\/\/(www.)?(g|google)\.cn https://www.google.com 302"
]


const getStashConfig = () => {
 return {
    http: {
      mitm: mitm,
      'force-http-engine': forceHttpEngine,
      rewrite: rewrite,
    }
  }
}

module.exports = getStashConfig