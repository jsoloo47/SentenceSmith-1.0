import React, { useState } from 'react';

import Input from '_components/molecules/PublicInput';
import ResponseList from '_components/organisms/PublicResponseList';
import './styles.scss';

export default function Hero() {
  const [data, setData] = useState('');

  return (
    <div className="hero-container">
      <div className="hero-input-col">
        <h1 className="hero-title">
          SentenceSmith: Create amazing content with the power of AI!
        </h1>
        <Input setData={setData} resList={data} />
      </div>
      <ResponseList rez={data} />
    </div>
  );
}
