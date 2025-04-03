require('dotenv').config()
const fs = require('fs')
const yaml = require('js-yaml')
const rules = require('./rules')
const groups = require('./groups')
const hosts = require('./hosts')

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
