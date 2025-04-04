
const region_groups = {
  '🇭🇰 香港': { fallback: true, urltest: true, filter: '香港', },
  '🇸🇬 新加坡': { fallback: true, urltest: true, filter: '新加坡', },
  '🇹🇼 台湾': { fallback: true, urltest: false, filter: '台湾', },
  '🇯🇵 日本': { fallback: true, urltest: false, filter: '日本', },
  '🇺🇸 美国': { fallback: true, urltest: false, filter: '美国', },
  '🇺🇳 其它': { fallback: false, urltest: false, filter: '其它', },
}

const getSmartGroup = (region='', filter=[]) => {
  filter = Array.isArray(filter) ? filter : [filter]
  const groups = ['🚀 默认代理', ...Object.keys(region_groups), '📦 全部节点', '🎯 直连']
    .filter(g => !filter.includes(g))
  if (region) {
    return [region, ...groups.filter(g => g !== region)]
  }
  return groups
}

const direct = ['🎯 直连', '🚀 默认代理']

const base_groups = [
  {name: '🚀 默认代理', type: 'select', proxies: [...getSmartGroup('', '🚀 默认代理'), '🏠 回家穿透']},
  {name: '🏠 回家穿透', type: 'select', proxies:['直连'], use:['GoHome']},
  {name: '🛑 广告', type: 'select', proxies: ['REJECT', ...direct]},
  {name: '🐟 漏网之鱼', type: 'select', proxies: getSmartGroup()},
]

const rule_groups = [
  {name: '📹 YouTube', type: 'select', proxies: getSmartGroup()},
  {name: '🍀 Google', type: 'select', proxies: getSmartGroup()},
  {name: '🤖 AI', type: 'select', proxies: [...getSmartGroup('🇸🇬 新加坡')]},
  {name: '🍎 Apple', type: 'select', proxies: getSmartGroup()},
  {name: '🍎 Apple 中国', type: 'select', proxies: direct},
  {name: '🐬 OneDrive', type: 'select', proxies: getSmartGroup()},
  {name: '🪟 Microsoft', type: 'select', proxies: getSmartGroup()},
  {name: '🪟 Microsoft 中国', type: 'select', proxies: direct},
  {name: '🎵 TikTok', type: 'select', proxies: [...getSmartGroup('🇯🇵 日本')]},
  {name: '📲 Telegram', type: 'select', proxies: [...getSmartGroup('🇸🇬 新加坡')]},
  {name: '🎥 NETFLIX', type: 'select', proxies: [...getSmartGroup('🇸🇬 新加坡')]},
  {name: '👨🏿‍💻 GitHub', type: 'select', proxies: getSmartGroup()},
  {name: '🎮 游戏平台', type: 'select', proxies: getSmartGroup()},
  {name: '🎮 游戏下载', type: 'select', proxies: direct},
  {name: '✈️ Speedtest', type: 'select', proxies: direct},
]

const final_groups = [
  {name: '🎯 直连', type: 'select', proxies: ['直连']},
  {name: '📦 全部节点', type: 'select', 'include-all': true},
]

const testOptions = {
  tolerance: 20, interval: 300,
}

function getProxyGroup(proxies) {
  const groups = []
  groups.push(...base_groups, ...rule_groups)
  const regin = []
  const reginAppend = []
  for (const [name, options] of Object.entries(region_groups)) {
    // 指定节点列表
    if (proxies) {
      regin.push({
        name, type: 'select',
        proxies: proxies.filter(p => p.includes(options.filter))
      })
      if (options.urltest) {
        reginAppend.push({
          name:`⚡${name}测速`, type: 'url-test', ...testOptions,
          proxies: proxies.filter(p => p.includes(options.filter))
        })
        regin.at(-1).proxies.unshift(`⚡${name}测速`)
      }
      if (options.fallback) {
        reginAppend.push({
          name:`🔁${name}故转`, type: 'fallback', ...testOptions,
          proxies: proxies.filter(p => p.includes(options.filter))
        })
        regin.at(-1).proxies.unshift(`🔁${name}故转`)
      }
    // 使用 include-all & filter
    } else {
      regin.push({name, type: 'select', proxies: [`📦${name}节点`]})
      const opt = {
        ...testOptions, 'include-all': true, filter: '(?i)' + options.filter
      }
      if (options.urltest) {
        reginAppend.push({
          name:`⚡${name}测速`, type: 'url-test', ...opt,
        })
        regin.at(-1).proxies.unshift(`⚡${name}测速`)
      }
      if (options.fallback) {
        reginAppend.push({
          name:`🔁${name}故转`, type: 'fallback', ...opt,
        })
        regin.at(-1).proxies.unshift(`🔁${name}故转`)
      }
      if (options.urltest || options.fallback) {
        reginAppend.push({
          name:`📦${name}节点`, type: 'select',
          'include-all': true, filter: '(?i)' + options.filter
        })
      } else {
        delete regin.at(-1).proxies
        regin.at(-1)['include-all'] = true
        regin.at(-1).filter = '(?i)' + options.filter
      }
    }
  }
  groups.push(...regin, ...reginAppend)
  groups.push(...final_groups)
  return {'proxy-groups': groups}
}

module.exports = getProxyGroup
