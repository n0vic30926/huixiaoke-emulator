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
  name?: string;
  avatar?: string;
  email?: string;

  [key: string]: unknown;
}
