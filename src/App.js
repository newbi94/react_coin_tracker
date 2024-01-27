import { useState ,useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState();
  const [selectCoin, setSelectCoin] = useState({});
  const [calculated,setCalculated] = useState();
  //const [exchangeRate, setExchangeRate] = useState();
  
  const onChangeMoney = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    const removedCommaValue: number = Number(value.replaceAll(",",""));
    setMoney(removedCommaValue.toLocaleString());
  };
  
  const onChangeCoin = (event) =>{
    const selectedOption = JSON.parse(event.target.value)
    setSelectCoin(selectedOption)
    }

  const onChangeCountry = (event) =>{
    console.log(event.target)
  }
  
  const OnCalculateMoney = () =>{
    console.log(money)
    console.log(selectCoin)
    const piece = money/selectCoin.quotes.USD.price
    console.log(piece)
    setCalculated(piece);
}

  
  
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coin! {loading ? "" : `(${coins.length})`}</h1>
      <input 
              value={money}
              id="money"
              placeholder="how much do you have?" 
              type="text"
              onChange={onChangeMoney}
      /><button onClick ={OnCalculateMoney}>Trans</button>
      
      <select onChange={onChangeCountry}>
        <option value="kormoney" key="kormoney">KOR₩</option>
        <option value="usdmoney" key="usdmoney">USD$</option>
      </select>
      <div>        
      {loading ?  
      (<strong>Loading...</strong>): (
      <select onChange={onChangeCoin}>{coins.map((coin) => {
        return <option value={JSON.stringify(coin)} key={coin.id}>{coin.name} ({coin.symbol}):${coin.quotes.USD.price}USD
        </option>
})}
      </select>
      )
      }
      </div>
      <div>How many of these coins can I have?
                <div>{calculated}{selectCoin.symbol}</div>
                </div>
    </div>
    
  );
}

export default App;