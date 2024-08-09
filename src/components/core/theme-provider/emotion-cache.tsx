/**
 * 这个文件是一个 Emotion 缓存提供者组件，用于在 Next.js 应用中提供 Emotion 缓存。
 * 它接受以下属性：
 * - options: 创建 Emotion 缓存时的选项，除了 insertionPoint。
 * - CacheProvider: 自定义的缓存提供者组件，接受 value 和 children 属性。
 * - children: 子组件。
 *
 * @remarks
 * 这个组件在 Next.js 应用中使用，用于管理 Emotion 缓存，并在服务器端渲染时将样式插入到 HTML 中。
 * 它包含以下重要变量和函数：
 * - registry: 缓存注册表对象，包含 cache 和 flush 属性。
 * - NextAppDirEmotionCacheProvider: Emotion 缓存提供者组件，接受上述属性。
 * - useServerInsertedHTML: 用于在服务器端渲染时获取已插入的 HTML 元素。
 */

'use client';

import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import createCache from '@emotion/cache';
import type { EmotionCache, Options as OptionsOfCreateCache } from '@emotion/cache';
import { CacheProvider as DefaultCacheProvider } from '@emotion/react';

interface Registry {
  cache: EmotionCache;
  flush: () => { name: string; isGlobal: boolean }[];
}

export interface NextAppDirEmotionCacheProviderProps {
  options: Omit<OptionsOfCreateCache, 'insertionPoint'>;
  CacheProvider?: (props: { value: EmotionCache; children: React.ReactNode }) => React.JSX.Element | null;
  children: React.ReactNode;
}

// Adapted from https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx
export default function NextAppDirEmotionCacheProvider(props: NextAppDirEmotionCacheProviderProps): React.JSX.Element {
  const { options, CacheProvider = DefaultCacheProvider, children } = props;

  const [registry] = React.useState<Registry>(() => {
    const cache = createCache(options);
    cache.compat = true;
    // eslint-disable-next-line @typescript-eslint/unbound-method -- Expected
    const prevInsert = cache.insert;
    let inserted: { name: string; isGlobal: boolean }[] = [];
    cache.insert = (...args) => {
      const [selector, serialized] = args;

      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({ name: serialized.name, isGlobal: !selector });
      }

      return prevInsert(...args);
    };
    const flush = (): { name: string; isGlobal: boolean }[] => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML((): React.JSX.Element | null => {
    const inserted = registry.flush();

    if (inserted.length === 0) {
      return null;
    }

    let styles = '';
    let dataEmotionAttribute = registry.cache.key;

    const globals: { name: string; style: string }[] = [];

    inserted.forEach(({ name, isGlobal }) => {
      const style = registry.cache.inserted[name];

      if (typeof style !== 'boolean') {
        if (isGlobal) {
          globals.push({ name, style: style || '' });
        } else {
          styles += style;
          dataEmotionAttribute += ` ${name}`;
        }
      }
    });

    return (
      <React.Fragment>
        {globals.map(
          ({ name, style }): React.JSX.Element => (
            <style
              dangerouslySetInnerHTML={{ __html: style }}
              data-emotion={`${registry.cache.key}-global ${name}`}
              key={name}
            />
          )
        )}
        {styles ? <style dangerouslySetInnerHTML={{ __html: styles }} data-emotion={dataEmotionAttribute} /> : null}
      </React.Fragment>
    );
  });

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
}
