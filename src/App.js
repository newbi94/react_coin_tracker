import { useState ,useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState();
  const [selectCoin, setSelectCoin] = useState([]);
  const [exchangeRate, setExchangeRate] = useState();
  
  const onChangeMoney = (event) => {
    const value = event.target.value;
    const removedCommaValue: number = Number(value.replaceAll(",",""));
    setMoney(removedCommaValue.toLocaleString());
  }//숫자 입력시 세자리마다 콤마를 찍어주는 코드를 추가했다.
  //https://velog.io/@quack777/React-input-%EC%88%AB%EC%9E%90%EC%97%90-%EC%BD%A4%EB%A7%88-%EC%B0%8D%EC%96%B4%EC%84%9C-%EB%82%98%ED%83%80%EB%82%B4%EB%8A%94-%EB%B2%95
  
  const onChangeCoin = (event) =>{
    const selectedOption = JSON.parse(event.target.value)
    setSelectCoin(selectedOption.quotes.USD.price)
    console.log(selectedOption.quotes.USD.price)
    }//객체화한 selectedOption자체를 setSelectCoin에 담아서
    //selectCoin.quotes.USD.price를 사용하려 했지만 에러가 발생했고
    //다시 JSON을 해야할수도 있을거 같길래 어차피 필요한건 금액이니 그것만
    //빼다가 쓰기로 했다.
  
  const calculateMoney = (money) =>{
    console.log(money);
  } //환율 계산기를 만들어야 한다.

  
  
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        console.log(json)
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
      /><button onClick ={() => calculateMoney(money)}/>
              <div>{selectCoin*money}$</div>
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
    
  );
}

export default App;