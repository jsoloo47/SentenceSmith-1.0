import React from 'react';
import { useSelector } from 'react-redux';
import R from 'ramda';

import './styles.scss';

import NewProject from '_components/molecules/NewProject';
import Project from '_components/molecules/Project';

export default function Projects() {
  const { projects } = useSelector(R.pick(['projects']));

  return (
    <>
      <h1 className="project-title">Projects</h1>
      <div className="project-container">
        <NewProject />
        {R.reverse(projects).map((project) => (
          <Project project={project} key={project.id} />
        ))}
      </div>
    </>
  );
}
