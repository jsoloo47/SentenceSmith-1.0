import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';

import Icon from 'react-bulma-companion/lib/Icon';

import './styles.scss';

import {
  attemptGetProject,
  attemptDeleteProject,
  attemptUpdateTitle,
} from '_store/thunks/projects';

import ConfirmModal from '_components/organisms/ConfirmModal';

export default function Project({ project }) {
  const dispatch = useDispatch();

  const [currentTitle, setCurrentTitle] = useState(project.title);
  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const openModal = (e) => {
    e.stopPropagation();
    setConfirm(true);
  };
  const closeModal = (e) => {
    e.stopPropagation();
    setConfirm(false);
  };
  const updateText = (e) => setCurrentTitle(e.target.value);
  const editTitle = (e) => {
    e.stopPropagation();
    setEdit(true);
  };

  const openProject = () => {
    dispatch(attemptGetProject(project.id));
  };

  const handleUpdateTitle = (e) => {
    e.stopPropagation();
    if (currentTitle) {
      dispatch(attemptUpdateTitle(project.id, currentTitle)).then(() =>
        setEdit(false)
      );
    }
  };

  const deleteProject = (e) => {
    e.stopPropagation();
    dispatch(attemptDeleteProject(project.id));
  };

  return (
    <>
      {edit ? (
        <div className="project-card" key={project.id}>
          <input
            className="title-edit"
            value={currentTitle}
            onChange={updateText}
            autoFocus
          />
          <div className="project-actions">
            <Icon
              className="space-right"
              onClick={handleUpdateTitle}
              onKeyPress={handleUpdateTitle}
            >
              <FontAwesomeIcon icon={faFloppyDisk} size="xl" />
            </Icon>
            <Icon onClick={openModal}>
              <FontAwesomeIcon icon={faTrashCan} size="xl" />
            </Icon>
            <ConfirmModal
              confirm={confirm}
              closeModal={closeModal}
              deleteProject={deleteProject}
            />
          </div>
        </div>
      ) : (
        <div className="project-card" onClick={openProject}>
          <div className="project-content" key={project.id}>
            <h1 className="project-main-title">{project.title}</h1>
          </div>
          <div className="project-actions">
            <Icon
              className="space-right"
              onClick={editTitle}
              onKeyPress={editTitle}
            >
              <FontAwesomeIcon icon={faPencil} size="xl" />
            </Icon>
            <Icon onClick={openModal}>
              <FontAwesomeIcon icon={faTrashCan} size="xl" />
            </Icon>
          </div>
          <ConfirmModal
            confirm={confirm}
            closeModal={closeModal}
            deleteProject={deleteProject}
          />
        </div>
      )}
    </>
  );
}
