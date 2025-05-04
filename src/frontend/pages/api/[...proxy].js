import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();
const API_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export default function handler(req, res) {
  // Don't forward cookies
  req.headers.cookie = '';
  
  proxy.web(req, res, { 
    target: API_URL,
    changeOrigin: true,
    ignorePath: true
  });
}

export const config = {
  api: {
    bodyParser: false
  }
};