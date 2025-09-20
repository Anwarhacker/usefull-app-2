const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  ...props
}) => {
  return (
    <div className="mb-3 sm:mb-4">
      {label && (
        <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-secondary">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 sm:px-3 sm:py-2 bg-card border border-card-hover rounded-lg text-foreground placeholder-secondary focus-brand-blue text-sm sm:text-base min-h-[40px] sm:min-h-[44px] ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
