import React, { useState } from 'react';

import { getResponse } from '_api/public.js';

import Textarea from 'react-bulma-companion/lib/Textarea';
import Button from 'react-bulma-companion/lib/Button';

import { dispatchError } from '_utils/api';

import './styles.scss';

export default function Input({ setData, resList }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const updateText = (e) => setText(e.target.value);

  const requestResponse = async () => {
    setLoading(true);
    const data = await getResponse(text);
    setData(data.rez);
    setLoading(false);
  };

  const onKeyDown = async (e) => {
    if (e.metaKey && e.which === 13) {
      // Refactor this try catch block to follow current redux/thunk architecture
      try {
        setLoading(true);
        const data = await getResponse(`${[...resList]}${text}`);
        setData(data.rez);
        setLoading(false);
      } catch (error) {
        dispatchError(error);
        console.log(error);
      }
    }
  };

  return (
    <div className="hero-input-container">
      <Textarea
        placeholder="Ask Sentence Smith Something"
        value={text}
        onChange={updateText}
        onKeyDown={onKeyDown}
        id="hero-input"
      />
      {loading ? (
        <div className="submit-container">
          <Button className="submit-btn" loading></Button>
        </div>
      ) : (
        <div className="submit-container">
          <button className="submit-btn" onClick={requestResponse}>
            Enter
          </button>
          <span className="alt-submit">Or press ⌘ + ⏎</span>
        </div>
      )}
    </div>
  );
}
