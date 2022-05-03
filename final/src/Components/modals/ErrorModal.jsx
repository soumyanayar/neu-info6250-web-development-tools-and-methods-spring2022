import "./modalStyle.css";

const ErrorModal = ({ setError, error, setErrorModalOpen }) => {
  const handleClick = () => {
    setErrorModalOpen(false);
    setError("");
  };

  return (
    <div className="error-modalBackground">
      <div className="error-modalContainer">
        <div className="error-titleCloseBtn">
          <button onClick={handleClick}>X</button>
        </div>
        <div className="error-modal-content">
          <div className="title">
            <p>{error}</p>
          </div>
          <div className="footer">
            <button onClick={handleClick} className="modal-cancelBtn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
