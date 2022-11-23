import React, { useEffect, useState } from 'react';

import Response from '_components/molecules/gpt3Response';

export default function ResponseList({ rez }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (rez.length > 0) {
      setList([rez, ...list]);
    }
  }, [rez]);

  console.log(rez, list);
  return (
    <div>
      {list.map((r) => (
        <Response res={r} />
      ))}
    </div>
  );
}
