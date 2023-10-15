import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import '../Styles/BuyTokenPage.css'

function BuyTokenPage() {
  const [currentTokenAmount, setCurrentTokenAmount] = useState(100); // Example initial value for current token amount
  const [tokenAmount, setTokenAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);


  const handleTokenAmountChange = (e) => {
    setTokenAmount(e.target.value);
  };

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  };

  function PopupMessage({ message, onClose }) {
    return (
      <div className="popup">
        <div className="popup-content">
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
  const handleVerifyAndBuyToken = () => {
    // Handle the logic for verifying and buying tokens here
    // You can use the values of tokenAmount and transactionId in this function
    // For example, you can make an API request to process the transaction
    // Update currentTokenAmount based on the result
    setPopupVisible(true);
  };

  const getCurrentTokenAmount=()=>{
    let temp = 80;
    return temp;
  }

  //currentTokenAmount = getCurrentTokenAmount();
  return (
    <div className='landing-page'>
      <Navbar />
        <div className='buyTokenForm'>
            <h3>Your Current Token Amount: {getCurrentTokenAmount()}</h3>

            <form>
                <div className="form-group">
                <label htmlFor="tokenAmount">Token Amount:</label>
                <input
                    type="number"
                    id="tokenAmount"
                    name="tokenAmount"
                    value={tokenAmount}
                    onChange={handleTokenAmountChange}
                />
                </div>

                <div className="form-group">
                <label htmlFor="transactionId">Transaction ID:</label>
                <input
                    type="text"
                    id="transactionId"
                    name="transactionId"
                    value={transactionId}
                    onChange={handleTransactionIdChange}
                />
                </div>

                <button type="button" onClick={handleVerifyAndBuyToken}>
                Verify and Buy Token
                </button>
            </form>
        </div>
    </div>
  );
}

export default BuyTokenPage;
