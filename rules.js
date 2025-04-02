const ip_preset = {type: 'http', interval: 86400, behavior: 'ipcidr', format: 'mrs'}
const domain_preset = {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs'}
const class_preset = {type: 'http', interval: 86400, behavior: 'classical', format: 'text'}

const rules = [
  'RULE-SET,my_block,🛑 广告',
  'RULE-SET,my_proxy_sg,🚀 默认代理',
  'RULE-SET,my_proxy,🚀 默认代理',
  'RULE-SET,my_direct,🎯 直连',
  'RULE-SET,ads_domain,🛑 广告',
  'RULE-SET,ads_awavenue,🛑 广告',
  'RULE-SET,private_ip,🎯 直连,no-resolve',
  'RULE-SET,private_domain,直连',
  'RULE-SET,apple_cn_domain,🍎 Apple 中国',
  'RULE-SET,icloud_cn_domain,🍎 Apple 中国',
  'RULE-SET,apple_domain,🍎 Apple',
  'RULE-SET,icloud_domain,🍎 Apple',
  'RULE-SET,ai_domain,🤖 AI',
  'RULE-SET,youtube_domain,📹 YouTube',
  'RULE-SET,google_ip,🍀 Google,no-resolve',
  'RULE-SET,google_domain,🍀 Google',
  // 'RULE-SET,facebook_ip,🚀 默认代理,no-resolve',
  // 'RULE-SET,facebook_domain,🚀 默认代理',
  // 'RULE-SET,twitter_ip,🚀 默认代理,no-resolve',
  // 'RULE-SET,twitter_domain,🚀 默认代理',
  // 'RULE-SET,github_domain,🚀 默认代理',
  'RULE-SET,netflix_ip,🎥 NETFLIX,no-resolve',
  'RULE-SET,netflix_domain,🎥 NETFLIX',
  'RULE-SET,telegram_ip,📲 Telegram,no-resolve',
  'RULE-SET,telegram_domain,📲 Telegram',
  'RULE-SET,onedrive_domain,🐬 OneDrive',
  'RULE-SET,microsoft_cn_domain,🪟 Microsoft 中国',
  'RULE-SET,bing_cn_domain,🪟 Microsoft 中国',
  'RULE-SET,microsoft_domain,🪟 Microsoft',
  'RULE-SET,bing_domain,🪟 Microsoft',
  'RULE-SET,tiktok_domain,🎵 TikTok',
  'RULE-SET,speedtest_domain,✈️ Speedtest',
  'RULE-SET,games_cn_domain,🎯 直连',
  'RULE-SET,games_download_domain,🎮 游戏下载',
  'RULE-SET,games_domain,🎮 游戏平台',
  'RULE-SET,porn_domain,🚀 默认代理',
  'RULE-SET,porn_class_domain,🚀 默认代理',
  'RULE-SET,bank_cn_domain,🎯 直连',
  'RULE-SET,gfw_domain,🚀 默认代理',
  'RULE-SET,geolocation-!cn,🚀 默认代理',
  'RULE-SET,cn_domain,🎯 直连',
  'RULE-SET,cn_ip,🎯 直连',
  'MATCH,🐟 漏网之鱼',
]


const providers = {
  private_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/private.mrs"},

  private_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/private.mrs"},
  private_ip: {...ip_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/private.mrs"},

  //  my rules
  my_proxy: {...class_preset, url: "{{GHPROXY_URL}}https://github.com/q3boy/meta-rules/raw/refs/heads/main/use-proxy.list"},
  my_proxy_sg: {...class_preset, url: "{{GHPROXY_URL}}https://github.com/q3boy/meta-rules/raw/refs/heads/main/use-proxy-sg.list"},
  my_direct: {...class_preset, url: "{{GHPROXY_URL}}https://github.com/q3boy/meta-rules/raw/refs/heads/main/direct.list"},
  my_block: {...class_preset, url: "{{GHPROXY_URL}}https://github.com/q3boy/meta-rules/raw/refs/heads/main/block.list"},

  //  proxylite: { <<: *class, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/qichiyuhub/rule/refs/heads/master/ProxyLite.list"}


  //  AI 服务
  ai_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ai-chat-!cn.mrs" },

  //  youtube
  youtube_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/youtube.mrs"},

  //  google
  google_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google.mrs"},
  google_ip: {...ip_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/google.mrs"},

  //  facebook
  facebook_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/facebook.mrs"},
  facebook_ip: {...ip_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/facebook.mrs"},

  //  twitter
  twitter_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/twitter.mrs"},
  twitter_ip: {...ip_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/twitter.mrs"},

  //  github
  github_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/github.mrs"},

  //  telegram
  telegram_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/telegram.mrs"},
  telegram_ip: {...ip_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/telegram.mrs"},

  //  netflix
  netflix_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/netflix.mrs"},
  netflix_ip: {...ip_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/netflix.mrs"},

  //  paypal
  paypal_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/paypal.mrs"},

  //  onedrive
  onedrive_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/onedrive.mrs"},

  //  microsoft
  microsoft_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/microsoft.mrs"},
  microsoft_cn_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/microsoft@cn.mrs"},
  bing_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/bing.mrs"},
  bing_cn_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/bing@cn.mrs"},

  //  apple
  apple_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/apple-cn.mrs"},
  apple_cn_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/apple@cn.mrs"},
  //  icloud
  icloud_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/icloud.mrs"},
  icloud_cn_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/icloud@cn.mrs"},


  //  speedtest
  speedtest_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/ookla-speedtest.mrs"},

  //  tiktok
  tiktok_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/tiktok.mrs"},

  //  gfw
  gfw_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/gfw.mrs"},

  //  非中国
  'geolocation-!cn': {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/geolocation-!cn.mrs"},

  //  中国
  cn_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/cn.mrs"},
  cn_ip: {...ip_preset, url: "{{GHPROXY_URL}}https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/cn.mrs"},

  //  银行
  bank_cn_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-bank-cn.mrs" },

  //  游戏
  games_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-games.mrs" },

  //  游戏 中国
  games_cn_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-games@cn.mrs" },

  //  游戏 下载
  games_download_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-game-accelerator-cn.mrs" },

  //  色情
  porn_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-porn.mrs" },
  porn_class_domain: {...class_preset, url: "{{GHPROXY_URL}}https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/classical/category-porn.list" },

  //  广告
  ads_awavenue: {...domain_preset, url: "{{GHPROXY_URL}}https://github.com/TG-Twilight/AWAvenue-Ads-Rule/raw/refs/heads/main/Filters/AWAvenue-Ads-Rule-Clash.mrs" },
  ads_domain: {...domain_preset, url: "{{GHPROXY_URL}}https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ads-all.mrs" },

}

const getRuleAndProvider = () => {

  const providerUsed = {}
  rules.map(d=>{
    const [type, name, ..._] = d.split(',')
    if (type === 'RULE-SET') {
      providerUsed[name] = providers[name]
    }
  })

  return  {rules, 'rule-providers': providerUsed }
}
module.exports = getRuleAndProvider