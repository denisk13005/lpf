import React from 'react';

export const TextBox = React.forwardRef(
  (
    {
      className,
      children,
      labelText,
      type = 'text',
      error,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={className}>
        {labelText && <label htmlFor='txt'>{labelText}</label>}
        <div>
          <input
            id='txt'
            {...props}
            ref={ref}
            type={type}
            disabled={disabled}></input>

          <div>{children}</div>
        </div>
        {error && <p>{error}</p>}
      </div>
    );
  }
);

TextBox.displayName = 'TextBox';
