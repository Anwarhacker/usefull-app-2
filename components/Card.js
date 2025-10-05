const Card = ({
  children,
  className = "",
  animate = true,
  hover = true,
  variant = "default",
}) => {
  const variants = {
    default: "glass-card hover:shadow-xl",
    elevated:
      "bg-surface-elevated shadow-xl hover:shadow-2xl border border-border/50",
    flat: "bg-surface hover:bg-surface-hover border border-border/30",
    gradient:
      "bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 hover:from-primary/10 hover:via-secondary/10 hover:to-primary/15",
  };

  return (
    <div
      className={`rounded-2xl p-6 sm:p-7 lg:p-8 transition-all duration-300 ${
        hover ? "hover-lift cursor-pointer hover:scale-[1.02]" : ""
      } ${animate ? "animate-fade-in stagger-item" : ""} ${
        variants[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
