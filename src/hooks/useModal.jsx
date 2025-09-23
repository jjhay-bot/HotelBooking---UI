import { useState, useCallback } from "react";

/**
 * A reusable modal state management hook for controlling `Dialog` or `Modal` components in MUI (v5/v6/v7).
 *
 * @param {boolean} [initialState=false] - Whether the modal should be initially open.
 * @returns {{
 *   open: boolean,                        // State value to control Dialog/Modal `open` prop
 *   onClose: (event: object, reason: string) => void, // Pass to Dialog/Modal `onClose` prop
 *   openModal: () => void,               // Opens the modal programmatically
 *   closeModal: (event?: object, reason?: string) => void, // Closes the modal unless reason is backdrop/escape
 *   toggle: () => void                   // Toggles modal open/close (⚠️ use cautiously if backdrop is enabled)
 * }}
 *
 * @example
 * ```jsx
 * const { open, onClose, openModal } = useModal();
 *
 * return (
 *   <>
 *     <Button onClick={openModal}>Open</Button>
 *     <Dialog open={open} onClose={onClose}>Hello</Dialog>
 *   </>
 * );
 * ```
 */
export const useModal = (initialState = false) => {
  const [open, setOpen] = useState(initialState);

  const openModal = useCallback(() => setOpen(true), []);

  const closeModal = useCallback((_, reason) => {
    // prevent closing as need
    if (["backdropClick", "escapeKeyDown"].includes(reason)) return;

    setOpen(false);
  }, []);

  // DON'T use if backdrop are full page (optional)
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  return {
    // Dialog / Modal specific (...modal)
    open,
    onClose: closeModal,

    // optional
    openModal,
    closeModal,
    toggle,
  };
};

// Usage Tip:
// Avoid using `toggle()` unless the toggle button remains outside the modal/backdrop.
// For most cases, stick to `openModal` and `closeModal`.
