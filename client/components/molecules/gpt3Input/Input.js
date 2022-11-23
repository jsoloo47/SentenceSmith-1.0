import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { attemptGetResponse } from '_store/thunks/projects';

import Textarea from 'react-bulma-companion/lib/Textarea';
import Button from 'react-bulma-companion/lib/Button';

import './styles.scss';

export default function Input({ setData, setBgOpacity }) {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const updateText = (e) => setText(e.target.value);

  const requestResponse = async () => {
    setLoading(true);
    const data = await dispatch(attemptGetResponse(text, id));
    setData(data);
    setLoading(false);
  };

  const onKeyDown = async (e) => {
    if (e.metaKey && e.which === 13) {
      console.log(text, 'command + enter clicked');
      setLoading(true);
      const data = await dispatch(attemptGetResponse(text, id));
      setData(data);
      setBgOpacity(true);
      setLoading(false);
    }
  };

  return (
    <div className="col-container">
      <Textarea
        placeholder="Ask Sentence Smith Something"
        value={text}
        onChange={updateText}
        onKeyDown={onKeyDown}
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
