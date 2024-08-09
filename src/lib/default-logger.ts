/**
 * 这个文件是默认日志记录器的实现。
 * 它导入了 `config` 和 `createLogger` 两个模块，并使用 `config.logLevel` 创建了一个日志记录器实例。
 */

import { config } from '@/config';
import { createLogger } from '@/lib/logger';

export const logger = createLogger({ level: config.logLevel });
