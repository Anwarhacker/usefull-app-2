const Card = ({ children, className = "", animate = true, hover = true }) => {
  return (
    <div
      className={`bg-card rounded-lg shadow-md p-4 sm:p-5 lg:p-6 hover:shadow-lg transition-all duration-200 ${
        hover ? "hover-lift cursor-pointer" : ""
      } ${animate ? "animate-fade-in stagger-item" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
