require('dotenv').config()
const fs = require('fs')

const { GHPROXY_URL, MY_SECRET_KEY, BYWAVE_SUBSCRIPTION_URL, SSRDOG_SUBSCRIPTION_URL } = process.env

const myClash = fs.readFileSync('./my-clash.example.yaml', 'utf-8')

const myClashData = myClash.replaceAll('{{GHPROXY_URL}}', GHPROXY_URL)
    .replace('{{MY_SECRET_KEY}}', MY_SECRET_KEY)
    .replace('{{BYWAVE_SUBSCRIPTION_URL}}', BYWAVE_SUBSCRIPTION_URL)
    .replace('{{SSRDOG_SUBSCRIPTION_URL}}', SSRDOG_SUBSCRIPTION_URL)

fs.writeFileSync('./my-clash.yaml', myClashData)
