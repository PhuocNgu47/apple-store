import { useCallback, useState } from 'react';

/**
 * Custom hook để quản lý modal state
 * @param {boolean} initialState - Trạng thái ban đầu
 */
export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

export default useModal;
