const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  required = false,
  variant = "default",
  ...props
}) => {
  const variants = {
    default:
      "bg-surface border-border hover:border-primary/50 focus:border-primary",
    filled:
      "bg-surface-hover border-border/50 hover:border-primary/50 focus:border-primary",
    glass:
      "glass border-border/20 hover:border-primary/30 focus:border-primary",
  };

  return (
    <div className="mb-6 sm:mb-7">
      {label && (
        <label className="block text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground">
          {label}
          {required && <span className="text-error ml-2">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full touch-target px-5 py-4 sm:px-6 sm:py-4 rounded-2xl text-foreground placeholder-foreground-muted focus:ring-2 focus:ring-primary/20 text-base sm:text-base transition-all duration-300 ${variants[variant]} ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
