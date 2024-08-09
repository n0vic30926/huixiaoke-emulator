/**
 * 这个文件定义了一个名为NavItemConfig的接口，用于描述导航项的配置信息。
 * 
 * @interface NavItemConfig
 * @property {string} key - 导航项的唯一标识符。
 * @property {string} [title] - 导航项的标题。
 * @property {boolean} [disabled] - 导航项是否禁用。
 * @property {boolean} [external] - 导航项是否为外部链接。
 * @property {string} [label] - 导航项的标签。
 * @property {string} [icon] - 导航项的图标。
 * @property {string} [href] - 导航项的链接地址。
 * @property {NavItemConfig[]} [items] - 导航项的子项配置。
 * @property {{ type: 'startsWith' | 'equals'; href: string }} [matcher] - 导航项的匹配器配置。
 *   - `type` 可以是 'startsWith' 或 'equals'，用于指定匹配类型。
 *   - `href` 是要匹配的链接地址。
 */

export interface NavItemConfig {
  key: string;
  title?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  icon?: string;
  href?: string;
  items?: NavItemConfig[];
  // Matcher cannot be a function in order
  // to be able to use it on the server.
  // If you need to match multiple paths,
  // can extend it to accept multiple matchers.
  matcher?: { type: 'startsWith' | 'equals'; href: string };
}
