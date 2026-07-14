import { useCallback, useState, type DragEvent } from "react";

interface UseDragAndDropOptions {
  onDrop: (files: FileList) => void;
}

export function useDragAndDrop({ onDrop }: UseDragAndDropOptions) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = useCallback((event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      setIsDragActive(false);
      if (event.dataTransfer.files.length > 0) {
        onDrop(event.dataTransfer.files);
      }
    },
    [onDrop],
  );

  return {
    isDragActive,
    dragHandlers: {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
  };
}
