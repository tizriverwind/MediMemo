import "./WelcomeMessage.css"; // Assuming you have a separate CSS file for this component

const WelcomeMessage = () => {
  return (
    <div className="welcome-message-container">
      {" "}
      {/* Changed the class name if it's a unique container */}
      <h1 className="welcome-title">Welcome to MediMemo</h1>
    </div>
  );
};

export default WelcomeMessage;
