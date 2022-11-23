import React from 'react';
import { useDispatch } from 'react-redux';

import './styles.scss';

import { attemptNewPrjct } from '_store/thunks/projects';

export default function Template({ title, k }) {
  const dispatch = useDispatch();

  const handleNewPrjct = () => {
    dispatch(attemptNewPrjct(title));
  };

  return (
    <div className={`bg${k} template-container`} onClick={handleNewPrjct}>
      <h2 className="title">{title}</h2>
    </div>
  );
}
