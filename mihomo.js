require('dotenv').config()
const fs = require('fs')
const yaml = require('js-yaml')
const rules = require('./rules')

process.stdout.write('read env...')
const { GHPROXY_URL, MY_SECRET_KEY, BYWAVE_SUBSCRIPTION_URL, SSRDOG_SUBSCRIPTION_URL } = process.env
console.log(' done')

process.stdout.write('read example...')
const tpl = fs.readFileSync('./my-clash.example.yaml', 'utf-8')
console.log(' done')

process.stdout.write('replace env in example...')
const replacedTxt = tpl.replaceAll('{{GHPROXY_URL}}', GHPROXY_URL)
  .replace('{{MY_SECRET_KEY}}', MY_SECRET_KEY)
  .replace('{{BYWAVE_SUBSCRIPTION_URL}}', BYWAVE_SUBSCRIPTION_URL)
  .replace('{{SSRDOG_SUBSCRIPTION_URL}}', SSRDOG_SUBSCRIPTION_URL)
console.log(' done')

process.stdout.write('apply rules and rule-providers...')
const mihomo = {...yaml.load(replacedTxt), ...rules()};
console.log(' done')

process.stdout.write('replace env in rule-providers')
Object.values(mihomo['rule-providers']).forEach(d=>{
  d.url = d.url.replace('{{GHPROXY_URL}}', GHPROXY_URL);
})
console.log(' done')

process.stdout.write('delete anchors...')
delete mihomo.anchors
console.log(' done')

process.stdout.write('write to file...')
fs.writeFileSync('./my-mihomo.yaml', yaml.dump(mihomo, {indent: 2, lineWidth :-1}))
console.log(' done')
