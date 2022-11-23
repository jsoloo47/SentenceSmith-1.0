import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bulma-companion/lib/Modal';

import ConfirmDeleteProject from '_components/organisms/ConfirmDeleteProject';

export default function ConfirmModal({ confirm, closeModal, deleteProject }) {
  return (
    <Modal className="confirm-modal" active={confirm}>
      <Modal.Background />
      <Modal.Content>
        <ConfirmDeleteProject
          closeModal={closeModal}
          deleteProject={deleteProject}
        />
      </Modal.Content>
      <Modal.Close size="large" aria-label="close" onClick={closeModal} />
    </Modal>
  );
}

ConfirmModal.propTypes = {
  confirm: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
};
