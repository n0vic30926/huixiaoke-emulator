/**
 * 获取站点URL的函数。
 * 
 * 此函数用于获取站点的URL。它首先尝试从环境变量中获取`NEXT_PUBLIC_SITE_URL`的值，如果没有设置，则尝试获取`NEXT_PUBLIC_VERCEL_URL`的值，如果还是没有设置，则默认返回`http://localhost:3000/`。
 * 
 * 注意：在非本地环境中，确保URL以`https://`开头。
 * 
 * 注意：确保URL以斜杠结尾。
 * 
 * @returns 站点的URL
 */

export function getSiteURL(): string {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`;
  return url;
}
