import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/modules/utils";

const buttonVariants = cva(
    "cursor-pointer inline-flex shrink-0 items-center justify-center rounded-2xl text-sm font-medium transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-background disabled:pointer-events-none disabled:opacity-50 sm:text-base",
    {
        variants: {
            variant: {
                default:
                    "bg-brand-background text-brand-text hover:bg-brand-background/85 hover:text-brand-text",
                secondary:
                    "bg-brand-surface text-brand-surface-text hover:bg-brand-surface/85 hover:text-surface-text",
                accent: "bg-brand-accent-surface text-brand-accent-surface-text hover:bg-brand-accent-surface/85 hover:text-brand-accent-surface-text",
                outline:
                    "border border-brand-text bg-transparent text-brand-text hover:border-brand-accent hover:text-brand-text hover:border-brand-text/40",
                ghost: "bg-transparent text-brand-text hover:bg-brand-surface hover:text-brand-accent",
                destructive:
                    "bg-system-destructive text-brand-background hover:bg-system-destructive/85",
            },
            size: {
                default: "h-10 gap-1.5 px-5 py-2.5",
                sm: "h-8 px-4 text-xs",
                lg: "h-11 px-6 text-base",
                icon: "size-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

function Button({
    className,
    variant = "default",
    size = "default",
    ...props
}: ButtonProps) {
    return (
        <ButtonPrimitive
            data-slot="button"
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        />
    );
}

export { Button, buttonVariants };
