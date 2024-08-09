/**
 * 这个文件包含了一个自定义的 React Hook，用于处理弹出框（Popover）的逻辑。
 * 
 * @template T - 弹出框锚点元素的类型，默认为 HTMLElement。
 * 
 * @returns {PopoverController<T>} - 弹出框控制器对象，包含了锚点元素的引用、打开、关闭和切换状态的方法，以及当前弹出框的状态。
 */

import * as React from 'react';

interface PopoverController<T> {
  anchorRef: React.MutableRefObject<T | null>;
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;
  open: boolean;
}

export function usePopover<T = HTMLElement>(): PopoverController<T> {
  const anchorRef = React.useRef<T>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleToggle = React.useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  return { anchorRef, handleClose, handleOpen, handleToggle, open };
}
