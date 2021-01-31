import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const DeleteAlert = ({ toggle, modal, deleteEmployee}) => {


  return (
    <Modal isOpen={modal} toggle={toggle} >
      <ModalHeader toggle={toggle}>Eliminar empleado</ModalHeader>
      <ModalBody>
        Está seguro de que desea eliminar el empleado?
        </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => { deleteEmployee(); toggle() }}>Si</Button>{' '}
        <Button color="secondary" onClick={toggle}>No</Button>
      </ModalFooter>
    </Modal>
  )
}
export default DeleteAlert