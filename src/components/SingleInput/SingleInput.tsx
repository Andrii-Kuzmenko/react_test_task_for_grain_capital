import React, { useCallback } from "react";

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  name: string;
  type?: string;
  value: string;
  isError: boolean;
}

export const SingleInput = React.memo<Props>(({ 
  handleChange, 
  name, 
  value, 
  type = 'text', 
  isError 
}) => {
  const formatString = useCallback((str: string) => {
    const result = str.split('').map(char => {
      if (char === char.toUpperCase()) {
        return ' ' + char.toLowerCase();
      }
    
      return char;
    }).join('');

      return result[0].toUpperCase() + result.slice(1);
  }, [name])

  return (
    <div>
      <label className="label" htmlFor={`user-${name}`}>{formatString(name)}</label>

      <div>
        <input 
          type={type}
          name={name}
          id={`user-${name}`}
          maxLength={30}
          placeholder={formatString(name)}
          value={value}
          onChange={handleChange}
        />
      </div>

      {isError && (
        <p className="form__error">
          {`${formatString(name)} is required`}
        </p>
      )}
    </div>
  )
})
