const dail = '192.168.1.1'
const vm = '192.168.1.2'
const router = '192.168.1.3'
const fn = '192.168.1.5'
const q3nas = '192.168.1.230'
const hz = 'hz.q3boy.com'
const quickconnect = 'myds.me'
const q3boy = 'q3boy.com'

const getHost = () => {
  return {hosts:{
    // q3nas
    [`q3nas.${q3boy}`]: [q3nas],
    [`q3nas.${quickconnect}`]: [q3nas],
    [`nas.${hz}`]: [q3nas],
    // dail
    [`dail.${hz}`]: [dail],
    // fn
    [`fn.${hz}`]: [fn],
    // router
    [`router.${hz}`]: [router],
    // vm
    [`esxi.${hz}`]: [vm],
    // *.hz
    // [`*.${hz}`]: [fn],

    [`plex.${hz}`]: [fn],
    [`alist.${hz}`]: [fn],
    [`nikki.${hz}`]: [fn],
    [`reader.${hz}`]: [fn],
    [`news.${hz}`]: [fn],

  }}
}




module.exports = getHost
