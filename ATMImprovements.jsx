const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Withdrawal'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label huge">
        <br></br>
        <br></br>
        <h3> {choice[Number(!isDeposit)]} of Amount</h3>
        <input id="number-input" type="number" width="200" onChange={onChange} className="labelSelect"></input>
        <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input" className="labelSelect"></input>
      </label>
    );
  };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setATMMode] = React.useState("Balance");
    const [validTransaction, setValidTransaction] = React.useState(false);
    const [dispMsg, setDispMsg] = React.useState("");
  
    let status = `Account Balance $ ${totalState} `;
    let msg = `${dispMsg}`;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    const handleChange = (event) => {
      console.log(`handleChange ${event.target.value}`);
      if(Number(event.target.value) <= 0 ) { 
        setValidTransaction(false); 
        let newDispMsg = `The amount cannot be zero or negative`;
      setDispMsg(newDispMsg);
      }
      else  if(atmMode === "Withdrawal" && Number(event.target.value) > totalState ) {
        setValidTransaction(false);
        let newDispMsg = `You cannot withdraw more than available balance!`;
        setDispMsg(newDispMsg);
      }
      else {
        setValidTransaction(true);
        let newDispMsg = ``;
        setDispMsg(newDispMsg);
      }
  
      setDeposit(Number(event.target.value));
    };
  
    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      setValidTransaction(false);
      event.preventDefault();
    };
  
    const handleModeSelect = (event) => {
      setATMMode(event.target.value);
      console.log(event.target.value);
      setValidTransaction(false);
      if(event.target.value === "Deposit"){ setIsDeposit(true); }
      else  {setIsDeposit(false);}
    }
  
  
    return (
      <form onSubmit={handleSubmit}>
        <p></p>
        <h2 id="total">{status}</h2>
        <br></br>
        <br></br>
        <label className="labelSelect">Select Transaction&nbsp;</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select" className="choice">
        <option id="balance-selection" value="Balance">Account Balance</option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Withdrawal">Withdrawal</option>
        </select>
        <div>{
        atmMode != "Balance" && 
              <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
        }
        </div>
        <p id="msg" className="msg">{msg}</p>
      </form>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));
  