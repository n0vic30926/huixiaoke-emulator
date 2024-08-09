/**
 * 这个文件定义了一个名为 `useSelection` 的自定义 Hook，用于处理选择逻辑。
 *
 * @param {T[]} keys - 一个可选的键数组，用于初始化选择状态。
 * @returns {Selection<T>} - 一个包含选择相关方法和状态的对象。
 *
 * @template T - 泛型参数，表示选择项的类型。
 */

import * as React from 'react';

export interface Selection<T = string> {
  deselectAll: () => void;
  deselectOne: (key: T) => void;
  selectAll: () => void;
  selectOne: (key: T) => void;
  selected: Set<T>;
  selectedAny: boolean;
  selectedAll: boolean;
}

// IMPORTANT: To prevent infinite loop, `keys` argument must be memoized with React.useMemo hook.
export function useSelection<T = string>(keys: T[] = []): Selection<T> {
  const [selected, setSelected] = React.useState<Set<T>>(new Set());

  React.useEffect(() => {
    setSelected(new Set());
  }, [keys]);

  const handleDeselectAll = React.useCallback(() => {
    setSelected(new Set());
  }, []);

  const handleDeselectOne = React.useCallback((key: T) => {
    setSelected((prev) => {
      const copy = new Set(prev);
      copy.delete(key);
      return copy;
    });
  }, []);

  const handleSelectAll = React.useCallback(() => {
    setSelected(new Set(keys));
  }, [keys]);

  const handleSelectOne = React.useCallback((key: T) => {
    setSelected((prev) => {
      const copy = new Set(prev);
      copy.add(key);
      return copy;
    });
  }, []);

  const selectedAny = selected.size > 0;
  const selectedAll = selected.size === keys.length;

  return {
    deselectAll: handleDeselectAll,
    deselectOne: handleDeselectOne,
    selectAll: handleSelectAll,
    selectOne: handleSelectOne,
    selected,
    selectedAny,
    selectedAll,
  };
}
