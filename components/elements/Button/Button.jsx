export const Button = ({ className, children, type = 'button', ...props }) => {
  return (
    <button
      {...props}
      type={type}
      className={`${className} `}>
      {children}
    </button>
  );
};
