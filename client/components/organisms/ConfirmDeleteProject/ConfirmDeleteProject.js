import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bulma-companion/lib/Card';
import Content from 'react-bulma-companion/lib/Content';

export default function ConfirmDeleteProject({ closeModal, deleteProject }) {
  return (
    <Card>
      <Card.Content>
        <Content className="has-text-centered">
          Are you sure you wanted to delete this Project?
        </Content>
      </Card.Content>
      <Card.Footer>
        <Card.FooterItem onClick={closeModal} onKeyPress={closeModal}>
          Cancel
        </Card.FooterItem>
        <Card.FooterItem onClick={deleteProject} onKeyPress={deleteProject}>
          Delete
        </Card.FooterItem>
      </Card.Footer>
    </Card>
  );
}

ConfirmDeleteProject.propTypes = {
  closeModal: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
};
