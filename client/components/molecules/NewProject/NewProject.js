import React from 'react';
import { useDispatch } from 'react-redux';

import './styles.scss';

import { attemptNewPrjct } from '_store/thunks/projects';

export default function AddTodo() {
  const dispatch = useDispatch();

  const handleNewPrjct = () => {
    dispatch(attemptNewPrjct());
  };

  return (
    <div className="new-prjct" onClick={handleNewPrjct}>
      <span className="content">New Project</span>
    </div>
  );
}
