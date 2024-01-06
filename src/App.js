import { useState ,useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState();
  const [selectCoin, setSelectCoin] = useState();
  const onChangeMoney = (event) => setMoney(event.target.value);
  //변화감지 onChange는 <select> 내에서 하지만 value는 <option>에서 받는다.
  //선택된 option을 통해 value를 받는다라는건 당연한건데 알기전에는 <select>에서만 해결하려 했다.
  const onChangeCoin = (event) =>{
    const selectedOption = JSON.parse(event.target.value)
    setSelectCoin(selectedOption)
    console.log(selectedOption)
  }
  
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
              type="number"
              onChange={onChangeMoney}
      />
              <div></div>
      {loading ?  
      (<strong>Loading...</strong>): (
      <select onChange={onChangeCoin}>{coins.map((coin) => {
        return <option value={JSON.stringify(coin)} key={coin.id}>{coin.name} ({coin.symbol}):${coin.quotes.USD.price}USD
        </option>
})}
      </select>
      )
	//환율계산+인풋값으로 금액을 입력하면 선택된 코인으로 환산해주는 계산기를 만드는 챌린지

	    //단순히 <select>내부에서 onChange를 통해 선택한 coin 객체를 넘겨받을 생각이었지만
       //넘겨받은 후 console.log(event)을 찍으면 target에는 셀렉트박스에서 보여주는 모든 항목들
       //그리고 그 항목들을 각각 클릭하면 내가 설정해준 option들의 key, name, symbol, price등 정보들과 
       //시각적인 정보들만 들어있었다. 내가 원하는건 fetch를 통해 받아온 coins 객체의 모든정보였다
       //그리고 console.log(event.target.value)를 찍으면 선택된 option의 text가 찍혔다
       //일단 선택은 된다는 것. value값 지정이 없으면 text를 전달하는 듯 싶다.
       //그래서 <option>에 value={coin}을 주고 console.log(event.target.value)를 찍자, [object object]가 떴다.
       //[object object]에 대해 파고 들었지만 오늘은 더이상 머리에 내용이 들어오질 않는다
       //어쨌든 JSON을통해 객체를 직렬화, string화 시켜서 전달해야 하더라.
       //해서 JSON.stringify로 직렬화시켜 전달한 후, 전달받은 내용을 JSON.parse로 객체화시켰다.
       //이제 객체화해서 받아낸 selectCoin을 이용해서 진행해보려한다.
      }
    </div>
    
  );
}

export default App;