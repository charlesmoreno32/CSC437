import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

function Modal(props) {
  // props: {isOpen, onCloseRequested, headerLabel}
  const modalContentRef = useRef(null);
  const handleOverlayClick = (event) => {
    // Check if the click occurred outside the modal content
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(event.target)
    ) {
      props.onCloseRequested(); // Close the modal
    }
  };
  if (!props.isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div ref={modalContentRef} className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          {props.headerLabel}
          <button
            aria-label="Close"
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={props.onCloseRequested}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
