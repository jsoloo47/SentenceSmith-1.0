import React, { useState } from 'react';
import './styles.scss';

export default function Response({ res }) {
  const [isActive, setActive] = useState(false);

  const handleClick = () => setActive(!isActive);

  //TODO: onClick, focus the card in the center? orrrr what do I do

  return (
    <div className={isActive ? 'res-card' : 'res-card'} onClick={handleClick}>
      {res}
    </div>
  );
}
