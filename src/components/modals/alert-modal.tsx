"use client";

import {
  useEffect,
  useState,
} from 'react';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center justify-end space-x-2 pt-6">
        <Button disabled={isLoading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
