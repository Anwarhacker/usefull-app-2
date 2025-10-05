const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseClasses =
    "rounded-2xl font-semibold transition-all duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-primary to-primary-hover text-white hover:shadow-lg hover:shadow-primary/25",
    secondary:
      "bg-surface-hover text-foreground-secondary hover:bg-surface hover:text-foreground border border-border/50",
    danger:
      "bg-gradient-to-r from-error to-red-600 text-white hover:shadow-lg hover:shadow-error/25",
    success:
      "bg-gradient-to-r from-success to-green-600 text-white hover:shadow-lg hover:shadow-success/25",
    ghost: "text-foreground-secondary hover:bg-surface hover:text-foreground",
    glass: "glass text-foreground hover:bg-white/20",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm min-h-[40px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-4 text-lg min-h-[56px]",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
