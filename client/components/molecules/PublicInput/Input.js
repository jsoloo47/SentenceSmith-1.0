import React, { useState } from 'react';

import { getResponse } from '_api/public.js';

import Textarea from 'react-bulma-companion/lib/Textarea';

import { dispatchError } from '_utils/api';

export default function Input({ setData }) {
  const [text, setText] = useState('');

  const updateText = (e) => setText(e.target.value);

  const requestResponse = () => getResponse(text);

  const onKeyDown = async (e) => {
    if (e.metaKey && e.which === 13) {
      console.log(text, 'command + enter clicked');
      // Refactor this try catch block to follow current redux/thunk architecture
      try {
        const data = await getResponse(text);
        setData(data.rez);
      } catch (error) {
        dispatchError(error);
        console.log(error.text);
      }
    }
  };

  return (
    <div className="col-container">
      <div className="col1">
        <Textarea
          placeholder="Ask Sentence Smith Something"
          value={text}
          onChange={updateText}
          onKeyDown={onKeyDown}
        />
        <button onClick={requestResponse}>Api call</button>
      </div>
    </div>
  );
}
