import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@components/ui/button";
import { PropsWithChildren } from "react";
import { cn } from "@lib/cn";

interface CounterProps {
  count: number;
  onChange: (count: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export const Counter = ({ count, onChange, className, min, max }: CounterProps) => {
  const increase = () => {
    onChange(count + 1);
  };

  const decrease = () => {
    onChange(count - 1);
  };

  return (
    <div className={cn("flex flex-row items-center justify-between gap-2", className)}>
      <IconButton onClick={decrease} disabled={min !== undefined && count <= min}>
        <MinusIcon className="h-4 w-4" />
      </IconButton>
      <p className="text-lg font-semibold">{count}</p>
      <IconButton onClick={increase} disabled={max !== undefined && count >= max}>
        <PlusIcon className="h-4 w-4" />
      </IconButton>
    </div>
  );
};

interface IconButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const IconButton = ({ onClick, children, disabled }: PropsWithChildren<IconButtonProps>) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      variant="outline"
      className="flex h-8 w-8 items-center justify-center p-0">
      {children}
    </Button>
  );
};
