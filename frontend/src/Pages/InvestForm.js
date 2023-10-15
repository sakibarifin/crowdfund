import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import '../Styles/InvestForm.css';
import BackerBalance from '../Components/BackerBalance';
import { prepareWriteContract, waitForTransaction, writeContract, readContract } from '@wagmi/core';
import testABI from '../abi/testABI.json';
import { useAccount } from 'wagmi';


function InvestForm() {
  const {address} = useAccount();
  const [currentTokenAmount, setCurrentTokenAmount] = useState(100);
  const [tokenAmount, setTokenAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [popupVisible, setPopupVisible] = useState(false); // Initialize as false
  const testABIAddress = '0xE5F537Bc26856B3E5080fd701527E67B80dc3215';

  const handleVerifyAndConfirmToken= async(e) => {
    
    try {
      const { request } = await prepareWriteContract({
        abi: testABI,
        address: testABIAddress,
        functionName: 'setGreeting',
        args: ['Hello, world!'],
        account: address,
      });
  
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash,
      });
      alert(`Transaction confirmed with hash ${hash}!`);
    } catch (error) {
      console.log(error)
    }
  };

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleTokenAmountChange = (e) => {
    setTokenAmount(e.target.value);
    // Set the popupVisible state to true to display the popup
    //setPopupVisible(true);
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

  const getGoalTokenAmount = () => {
    let temp = 40;
    return temp;
  }

  const getCurrentTokenAmount = () => {
    let temp = 80;
    return temp;
  }

  return (
    <div className='landing-page'>
      <Navbar />
      <div className='investForm'>
      {!popupVisible &&
        <>
        <h3>Your Current Investable Token Amount: {<BackerBalance/>}</h3>
        <h3>The project goal Token Amount: {getGoalTokenAmount()}</h3>
        </>
        }
        <form>
            {!popupVisible &&
            <>
          <div className="form-group">
            <label htmlFor="tokenAmount">Token Amount :</label>
            <input
              type="number"
              id="tokenAmount"
              name="tokenAmount"
              value={tokenAmount}
              onChange={handleTokenAmountChange}
            />
          </div>
          <button type="button" onClick={handleVerifyAndConfirmToken}>
            Verify and Confirm Investment
          </button>
          </>
          }
          {popupVisible && (
            <PopupMessage className='pop'
              message="Points successfully invested and points deducted from your account."
              onClose={() => setPopupVisible(false)} // Close the popup
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default InvestForm;
