const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  required = false,
  ...props
}) => {
  return (
    <div className="mb-4 sm:mb-5">
      {label && (
        <label className="block text-sm sm:text-base font-medium mb-2 sm:mb-3 text-secondary">
          {label}
          {required && <span className="text-danger-red ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full touch-target px-4 py-3 sm:px-4 sm:py-3 bg-card border border-card-hover rounded-lg text-foreground placeholder-secondary focus-brand-blue focus:ring-2 focus:ring-brand-blue focus:ring-opacity-20 text-base sm:text-base transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
