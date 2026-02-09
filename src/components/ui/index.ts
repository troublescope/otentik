/**
 * UI Components Index
 *
 * Centralized exports for all shadcn/ui components.
 * Provides cleaner import paths and compound component access.
 */

// Dialog Component - Compound exports for flexibility
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./dialog";

// Re-export Dialog as default for convenience
export { Dialog as default } from "./dialog";

// Button Component
export { Button, buttonVariants, type ButtonProps } from "./button";
