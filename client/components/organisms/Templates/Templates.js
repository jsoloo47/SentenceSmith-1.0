import React from 'react';
import Template from '_components/molecules/Template';

import './styles.scss';

export default function Templates() {
  const titles = [
    'Marketing Content',
    'Conversation',
    'Brain Storm Ideas',
    'Code Translation',
  ];

  return (
    <>
      <h1 className="main-title">Templates</h1>
      <ul className="templates-list">
        {titles.map((title, i) => {
          return <Template key={i} k={i} title={title} />;
        })}
      </ul>
    </>
  );
}
