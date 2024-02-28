import React from 'react'

const Button = ({ text, onClick }: any) => {
   return (
      <button
         type="button"
         onClick={onClick}
         className='py-2 bg-gray-900 text-gray-100 rounded-sm px-7 outline-1'
      >
         {text}
      </button>
   );
};

export default Button