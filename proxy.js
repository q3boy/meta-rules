import http from 'http'
// import https from 'https'
import { Readable } from 'stream'

// proxy url to remote url

const REMOTE_PREFIXES = {
  geosite  : 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/',
  geoip    : 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/',
  category : 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/category-',
  cls      : 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/classical/',
  cls_cate : 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/classical/category-',
  q3boy    : 'https://raw.githubusercontent.com/q3boy/meta-rules/main/',
  awa      : 'https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/',
  release  : 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/',
  dashboard: 'https://github.com/Zephyruso/zashboard/archive/refs/heads/',
}
const DNS_MAP = {
  'raw.githubusercontent.com': '180.188.47.62',
  'github.com': '180.188.47.62',
}

const dns = process.argv[3] === 'dns'

// 获取当前时间的ISO格式字符串
const getCurrentTime = () => {
  const d = new Date()
  const localDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return localDate.toISOString().replace('T', ' ').substring(0, 19);
}

// 日志
const log = (...args) => {
  console.log(`${getCurrentTime()} ${args.join(' ')}`)
}

/**
 * 将 fetch Response 转换为可读流
 * @param {Response} response - fetch 响应对象
 * @returns {ReadableStream} - Node.js 可读流
 */
const responseToStream = async (response) => {
  return Readable.fromWeb(response.body);
};

/**
 * 发送远程请求
 * @param {string|URL} url - 请求URL
 * @param {Object} options - 请求选项
 * @returns {Promise<Object>} - 包含响应和流的对象
 */
const fetchRemote = async (url, options = {}) => {
  const response = await fetch(url, options);
  const stream = await responseToStream(response);
  return { response, stream };
};

const port = parseInt(process.argv[2])

const server = http.createServer(async (req, res) => {
  const startTime = Date.now()
  const url = req.url
  // 跳过 favicon.ico
  if (url === '/favicon.ico') {
    res.statusCode = 200
    res.end('')
    return
  }
  // 解析 url
  let [, prefix, name] = url.split('/')
  prefix = prefix?.trim()
  name = name?.trim()

  // 前缀不存在
  if (!REMOTE_PREFIXES[prefix]) {
    res.writeHead(404, 'Not Found')
    res.end('Not Found')
    return log(`${req.url} prefix not found`)
  }
  // 名称不存在
  if (!name) {
    res.writeHead(404, 'Not Found')
    res.end('Not Found')
    return log(`${req.url} name not found`)
  }

  // 远程 url
  const remoteUrl = REMOTE_PREFIXES[prefix] + name

  // 解析远程 url
  const uinfo = new URL(remoteUrl)
  const headers = req.headers

  const logData = [req.url, remoteUrl]

  // 是否启用 dns
  if (dns) {
    const {hostname} = uinfo
    uinfo.hostname = DNS_MAP[hostname]
    logData.push(`[dns: ${hostname}/${uinfo.hostname}]`)
  }
  headers['Host'] = uinfo.hostname
  try {
    // 使用 fetch 替代 https.get
    const { response: remoteRes, stream: remoteStream } = await fetchRemote(uinfo, { headers });

    logData.push(`[${remoteRes.status}] "${remoteRes.statusText}"`)

    // 处理重定向（302 响应）
    if (remoteRes.status === 302) {
      const location = remoteRes.headers.get('location');
      const { hostname } = new URL(location);

      // 处理重定向请求
      const { response: locationRes, stream: locationStream } = await fetchRemote(
        location,
        { headers: { ...headers, Host: hostname } }
      );

      logData.push(`[${locationRes.status}] "${locationRes.statusText}"`);

      // 设置响应头
      for (const [key, value] of locationRes.headers.entries()) {
        res.setHeader(key, value);
      }

      res.statusCode = locationRes.status;
      res.statusMessage = locationRes.statusText;

      // 流式传输响应体
      locationStream.pipe(res);

      // 完成后记录日志
      locationStream.on('end', () => {
        logData.push(
          `\n  -> redirect: ${location}`,
          `[${locationRes.status}] "${locationRes.statusText}"`,
          `[${Date.now() - startTime}ms]`
        );
        log(...logData);
      });
    }
    // 处理成功响应
    else if (remoteRes.status === 200) {
      // 设置响应头
      for (const [key, value] of remoteRes.headers.entries()) {
        res.setHeader(key, value);
      }

      res.statusCode = 200;
      res.statusMessage = 'OK';

      // 流式传输响应体
      remoteStream.pipe(res);

      // 完成后记录日志
      remoteStream.on('end', () => {
        logData.push(`[${Date.now() - startTime}ms]`);
        log(...logData);
      });
    }
    // 处理其他响应状态
    else {
      res.statusCode = remoteRes.status;
      res.statusMessage = remoteRes.statusText;
      res.end(remoteRes.statusText);

      logData.push(`[${Date.now() - startTime}ms]`);
      log(...logData);
    }
  } catch (error) {
    // 处理错误
    res.statusCode = 500;
    res.statusMessage = 'Internal Server Error';
    res.end('Internal Server Error');

    logData.push(`[500] "${error.message}"`, `[${Date.now() - startTime}ms]`);
    log(...logData);
  }
})
const errorHandler = (error) => {
  log(`[error] ${error.message}`, `[${Date.now() - startTime}ms]`)
  console.log(error.stack)
}
server.on('error', errorHandler)
process.on('uncaughtException', errorHandler)
process.on('unhandledRejection', errorHandler)

process.on('SIGINT', () => {
  log('SIGINT')
  process.exit(0)
})
process.on('SIGTERM', () => {
  log('SIGTERM')
  process.exit(0)
})
server.listen(port)
// 启动服务器
console.log(`Server running at http://localhost:${port}/ [dns: ${dns ? 'on' : 'off'}]`)
