import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BarChartCategories from './Graphcategoriepayment';
import React from "react";
import { FcReading } from 'react-icons/fc';

function Graphcategories(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <BarChartCategories />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function BarChartCategoriesss() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <button className=' animate-pulse ' variant="primary" onClick={() => setModalShow(true)}>
        <FcReading className=" animate-pulse rounded-full bg-gray-900 " size={30} />
      </button>
      <Graphcategories
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}