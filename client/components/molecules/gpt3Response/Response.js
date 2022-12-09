import React, { useState } from 'react';
import './styles.scss';

export default function Response({ res }) {
  const [isActive, setActive] = useState(false);

  const handleClick = () => setActive(!isActive);

  return (
    <div className={isActive ? 'res-card' : 'res-card'} onClick={handleClick}>
      {res}
    </div>
  );
}
