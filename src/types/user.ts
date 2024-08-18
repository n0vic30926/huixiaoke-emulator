/**
 * 这个文件定义了用户接口。
 * 
 * @remarks
 * 用户接口包含了用户的基本信息，如ID、姓名、头像和电子邮件等。
 * 
 * @public
 * @interface
 */

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;  // Optional, since your current model does not include an avatar.
  fullName?: string;  // You can include this if you prefer to handle the full name in your UI components.

  [key: string]: unknown;
}
