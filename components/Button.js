const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseClasses =
    "rounded-lg font-medium transition-colors focus-brand-blue disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-brand-blue text-white hover:bg-blue-600 active:bg-blue-700",
    secondary: "bg-card-hover text-secondary hover:bg-card active:bg-card",
    danger: "bg-danger-red text-white hover:bg-red-700 active:bg-red-800",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm min-h-[32px] sm:min-h-[36px]",
    md: "px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base min-h-[36px] sm:min-h-[40px]",
    lg: "px-4 py-2 text-base sm:px-6 sm:py-3 sm:text-lg min-h-[40px] sm:min-h-[44px]",
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
