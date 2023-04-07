import React from "react";
import './Button.css';
import { Link } from 'react-router-dom';

const Styles = ['btn--primary', 'btn--outline']

const Sizes = ['btn--medium']

export const Button = ({
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = Styles.includes(buttonStyle) ? buttonStyle : Styles[0];
  const checkButtonSize = Sizes.includes(buttonSize) ? buttonSize : Sizes[0]

  return (
    <>

      <Link to='/search' className='btn--medium:hover'>
        <button
          className={`btn ${checkButtonStyle} ${checkButtonSize}`}
          onClick={onClick}
          type={type}
        >
          Pin Now!
        </button>
      </Link>
    </>
  );
};