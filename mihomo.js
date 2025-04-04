require('dotenv').config()
const fs = require('fs')
const yaml = require('js-yaml')
const rules = require('./rules')
const groups = require('./groups')
const hosts = require('./hosts')
const stash = require('./stash')

const { MY_SECRET_KEY, BYWAVE_SUBSCRIPTION_URL, SSRDOG_SUBSCRIPTION_URL, GOHOME_SUBSCRIPTION_URL, GH_PROXY_PREFIX } = process.env

const tpl = fs.readFileSync('./my-clash.example.yaml', 'utf-8')


const replacedTxt = tpl.replace('{{MY_SECRET_KEY}}', MY_SECRET_KEY)
  .replace('{{BYWAVE_SUBSCRIPTION_URL}}', BYWAVE_SUBSCRIPTION_URL)
  .replace('{{SSRDOG_SUBSCRIPTION_URL}}', SSRDOG_SUBSCRIPTION_URL)
  .replace('{{GOHOME_SUBSCRIPTION_URL}}', GOHOME_SUBSCRIPTION_URL)
  .replaceAll('{{GH_PROXY_PREFIX}}', GH_PROXY_PREFIX)
const config = yaml.load(replacedTxt)

const mihomo = {...config, ...groups(), ...rules(), ...hosts()};

fs.writeFileSync('./my-mihomo.yaml', yaml.dump(mihomo, {indent: 2, lineWidth :-1}))

delete mihomo.hosts
mihomo.dns.nameserver = ['223.5.5.5', '119.29.29.29']

fs.writeFileSync('./my-android.yaml', yaml.dump(mihomo, {indent: 2, lineWidth :-1}))

const proxyProviders = mihomo['proxy-providers']
for (const key of ['ByWave', 'SsrDog', 'GoHome']) {
  proxyProviders[key].url = proxyProviders[key].url.replace('ClashMeta', 'Stash')
}

const ruleProviders = mihomo['rule-providers']
for (const [name, rule] of Object.entries(ruleProviders)) {
  if (rule.format === 'mrs') {
    if (name === 'ads_awavenue') {
      rule.format = 'yaml'
      rule.url = rule.url.replace('.mrs', '.yaml')
    } else {
      rule.format = 'text'
      rule.url = rule.url.replace('.mrs', '.list')
    }
  }
}
mihomo.http = stash().http

fs.writeFileSync('./my-stash.yaml', yaml.dump(mihomo, {indent: 2, lineWidth :-1}))
