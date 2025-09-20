const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-card rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
