import React, { useEffect, useState } from 'react';

import Response from '_components/molecules/gpt3Response';

import possibilityImage from '../../../assets/images/header.svg';

import './styles.scss';

export default function ResponseList({ rez }) {
  const [list, setList] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (rez.length > 0) {
      setList([rez, ...list]);
      setIsActive(true);
    }
  }, [rez]);

  return (
    <div className="hero-response-container">
      <img
        src={possibilityImage}
        style={{
          opacity: isActive ? '40%' : '100%',
        }}
      />
      <div className="hero-response">
        {list.map((r) => (
          <Response res={r} />
        ))}
      </div>
    </div>
  );
}
