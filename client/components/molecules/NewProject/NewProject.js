import React from 'react';
import { useDispatch } from 'react-redux';

import './styles.scss';

import { attemptNewPrjct } from '_store/thunks/projects';

export default function AddTodo() {
  const dispatch = useDispatch();

  const handleNewPrjct = () => {
    dispatch(attemptNewPrjct());
    console.log('newPrjct is being fired without be doing shit');
  };

  return (
    <div className="new-prjct" onClick={handleNewPrjct}>
      <span className="content">New Project</span>
    </div>
  );
}
