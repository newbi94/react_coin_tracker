import { useState ,useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState();
  const [commaMoney,setCommaMoney] = useState();
  const [selectedCoin, setSelectedCoin] = useState({})//<Object | null>(coins[0])
  const [calculated,setCalculated] = useState();
  //const [exchangeRate, setExchangeRate] = useState();
  

  //toLocaleString 사용해보기
  let a = 650001110;
  let b = a.toLocaleString()
  console.log(b)
  //출력값 => 650,001,110

  const onChangeMoney = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event) // input창의 변화에 대한 여러가지 객체가 뜬다.
    console.log(event.target.value)
    //input의 속성 value값이 뜬다 즉,{commaMoney}가 뜨는 것
    //여기서 input창에 11111을 입력하고 event.target.value를 콘솔찍어보면 1,1111이 뜬다.
    //이 함수 내부에서 아직 state가 업데이트 되지 않았기 때문에 1,111 에다가 1을 추가한 1,1111이 뜨는 것.
    //이제 1,1111(event.target.value)를 replaceAll을 통해 콤마를 지우고 (11111) number로 타입을 바꿔준 뒤,
    //toLocaleString으로 다시 3자리마다 콤마를 찍어 11,111로 바꿔주고 setCommaMoney에 태워 보낸다.
    const value: string = event.target.value; 
    const removedCommaValue: number = Number(value.replaceAll(",",""));
    //input에 입력된 value값은 아래 과정(콤마찍기)을 거치면서 string이 되기 때문에
    //다시 콤마를 지우고 Number로 바꿔주어야 toLocaleString을 할 수 있다.
    //toLocaleString은 number type에만 쓸 수 있기 때문(더 깊게 말하면 Number의 prototype이기 때문)
    //아래과정을 거치기 전 최초 숫자 입력 시 입력 값이 number임에도 불구하고 string으로 정의하고 number로 바꿔서 toLocaleString하는 것이
    //최초 입력 이후에도 이 함수가 정상적으로 유지되기 위해서 올바르다(?).
    setCommaMoney(removedCommaValue.toLocaleString()); 
    //콤마를 지우고 string을 number로바꾼 값을 toLocaleString(3자리마다 콤마찍기)
    //해서 state에 업데이트 => commaMoney가 업데이트 된다. 즉 input창에 입력 값이 콤마가 찍혀 뜨게된다.
    setMoney(removedCommaValue)
    //콤마없는 string -> number로 변형된 값
    console.log(commaMoney)
    //위 console.log(event.target.value)에서 설명했듯이 이 함수 내부에서는 아직 state가 업데이트 되지 않았기 때문에
    //1 다섯개를 입력하기 바로 전인 1 네개를 입력했을 때의 commaMoney를 출력한다 => 출력값: 1,111
    console.log(money)
    //위와 마찬가지로 출력값은 1111이 되겠다.
  }
  //함수 내부에서 찍은 콘솔 출력값이 한템포 늦다고 해서 화면에 비춰지는 commaMoney와 계산에 쓰이는 money도
  //한템포 늦지는 않는다. 실제로 숫자를 입력하고 Trans버튼을 눌러 코인갯수로 환산하면
  //정상적으로 입력한 값과 동일하게 코인갯수로 환산된다.
  //그리고 입력값 또한 입력하는 즉시 콤마가 적용되는 것도 확인할 수 있다.

   const onChangeCoin = (event) =>{
    const selectedOption = JSON.parse(event.target.value)
    setSelectedCoin(selectedOption)
    } 

  const onChangeCountry = (event) =>{
    console.log(event.target)
  }
  
  const OnCalculateMoney = () =>{
    console.log(money)
    console.log(commaMoney)
    const piece = money/selectedCoin.quotes.USD.price
    console.log(piece)
    setCalculated(piece);
}//Trans버튼 누르면 입력한 액수를 선택된 코인갯수로 변환해주는 함수

  
  
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
              value={commaMoney}
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
                <div>{calculated}{selectedCoin.symbol}</div>
                </div>
    </div>
    
  );
}//option의 value항목은 string | ReadonlyArray<string> | number | undefined;
//이러한 형태만 가능하다. 때문에 객체로는 담을 수 없는 것. (노션참조)

export default App;