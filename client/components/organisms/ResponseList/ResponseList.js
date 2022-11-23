import React, { useEffect, useState } from 'react';

import Response from '_components/molecules/gpt3Response';

import './styles.scss';

export default function ResponseList({ resList, data }) {
  const [list, setList] = useState(resList);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      setList([data, ...list]);
    }
  }, [data]);

  console.log(data);

  return (
    <div className="response-col">
      {list.map((r) => (
        <Response res={r} />
      ))}
      <div className="gradient-bg"></div>
    </div>
  );
}
