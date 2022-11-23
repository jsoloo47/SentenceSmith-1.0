import React, { useState } from 'react';

import Input from '_components/molecules/PublicInput';
import ResponseList from '_components/organisms/PublicResponseList';

export default function Hero() {
  const [data, setData] = useState('');

  return (
    <div className="hero-title">
      <h1>SentenceSmith: Create amazing content with the power of AI!</h1>
      <Input setData={setData} />
      <ResponseList rez={data} />
    </div>
  );
}
