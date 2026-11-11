import { Request } from 'express';

export interface DeviceInfo {
  ip: string;
  userAgent: string;
  browser: string;
  os: string;
  device: string;
}

export function parseRequestInfo(req: Request): DeviceInfo {
  // Capture client IP (handles proxies like Cloudflare, Nginx, or localhost)
  const forwarded = req.headers['x-forwarded-for'];
  let ip = typeof forwarded === 'string' 
    ? forwarded.split(',')[0].trim() 
    : Array.isArray(forwarded) 
    ? forwarded[0] 
    : req.socket.remoteAddress || 'unknown';

  if (ip === '::1' || ip === '127.0.0.1') {
    ip = '127.0.0.1 (Localhost)';
  }

  const userAgent = req.headers['user-agent'] || 'Unknown';

  // Determine Browser
  let browser = 'Unknown';
  if (/edg/i.test(userAgent)) {
    browser = 'Edge';
  } else if (/chrome|crios/i.test(userAgent) && !/opr|opera/i.test(userAgent)) {
    browser = 'Chrome';
  } else if (/firefox|fxios/i.test(userAgent)) {
    browser = 'Firefox';
  } else if (/safari/i.test(userAgent) && !/chrome|crios/i.test(userAgent)) {
    browser = 'Safari';
  } else if (/opr|opera/i.test(userAgent)) {
    browser = 'Opera';
  }

  // Determine OS
  let os = 'Unknown';
  if (/windows/i.test(userAgent)) {
    os = 'Windows';
  } else if (/macintosh|mac os x/i.test(userAgent)) {
    os = 'macOS';
  } else if (/android/i.test(userAgent)) {
    os = 'Android';
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    os = 'iOS';
  } else if (/linux/i.test(userAgent)) {
    os = 'Linux';
  }

  // Determine Device type
  let device = 'Desktop';
  if (/tablet|ipad/i.test(userAgent)) {
    device = 'Tablet';
  } else if (/mobile|iphone|android/i.test(userAgent)) {
    device = 'Mobile';
  }

  return { ip, userAgent, browser, os, device };
}

