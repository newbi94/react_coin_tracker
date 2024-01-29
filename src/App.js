import { useState ,useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [exchangeRate, setExchangeRate] = useState({});
  const [money, setMoney] = useState();
  const [commaMoney,setCommaMoney] = useState();
  const [selectedCoin, setSelectedCoin] = useState({});//?? <Object | null>(coins[0])
  const [calculated,setCalculated] = useState();
  const [selectedCountry, setSelectedCountry] = useState("USD");
  const [calculatedToCoin,setCalculatedToCoin] = useState();

  const onChangeMoney = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value; 
    const removedCommaValue: number = Number(value.replaceAll(",",""));
    setCommaMoney(removedCommaValue.toLocaleString()); 
    setMoney(removedCommaValue)
  }
  
  const onChangeCoin = (event) =>{
    const selectedOption = JSON.parse(event.target.value)
    setSelectedCoin(selectedOption)
  } 

  const onChangeCountry = (event) =>{
    setSelectedCountry(event.target.value)
  }
  
  const OnCalculateMoney = () =>{
    const exchangeToDollar = money/exchangeRate.rates[selectedCountry]
    const exchangeToCoin = exchangeToDollar/selectedCoin.quotes.USD.price
    setCalculated(exchangeToDollar)
    setCalculatedToCoin(exchangeToCoin)
  }

  useEffect(() => {
    fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=7a92022790ff4807beb2ba05a961a0c0")
      .then((response) => response.json())
      .then((json) => {
        setExchangeRate(json)
      });
  }, []);
    //무료 환율 API https://otp-0613.tistory.com/6

  useEffect(() => {
      fetch("https://api.coinpaprika.com/v1/tickers")
        .then((response) => response.json())
        .then((json) => {
          setCoins(json);
          setSelectedCoin(json[0])
          setLoading(false);
        });
    }, []);

  return (
    <div>
      <h1>The Coin! {loading ? "" : `(${coins.length})`}</h1>
      <input 
              value={commaMoney || ""}
              id="money"
              placeholder="how much do you have?" 
              type="text"
              onChange={onChangeMoney}
      /><button onClick ={OnCalculateMoney}>Trans</button>
      
      <select onChange={onChangeCountry}>
        <option value="USD" key="USD">USD$</option>
        <option value="KRW" key="KRW">KRW₩</option>
        <option value="JPY" key="JPY">JPY¥</option>
      </select>
      <div>
        <div>{calculated}{'('}{selectedCountry} =&gt; USD{')'}</div>        
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
                <div>=&gt;{calculatedToCoin}{selectedCoin.symbol}</div>
                </div>
    </div>  
  );
}

export default App;