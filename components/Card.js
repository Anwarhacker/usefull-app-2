const Card = ({ children, className = "", animate = true }) => {
  return (
    <div
      className={`bg-card rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-smooth hover-lift ${
        animate ? "animate-fade-in stagger-item" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
