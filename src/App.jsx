import { useEffect, useState } from "react";
import "./App.css";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);
  const [swapCheck, setSwapCheck] = useState(false);
  const swap = () => {
    setFrom(to);
    setTo(from);
    setSwapCheck(true);
  };

  // Log state changes only when they occur
  useEffect(() => {
    if (swapCheck) {
      setAmount(convertedAmount);
      setConvertedAmount(amount);
      setSwapCheck(false);
    }
    console.log("Amount:", amount);
    console.log("Converted Amount:", convertedAmount);
  }, [swapCheck]);

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <>
      <div className="p-4 m-0 w-full flex flex-wrap justify-center items-center h-screen bg-cover bg-center relative bg-[url(https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)]">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="flex-col gap-y-4 w-1/2 p-4 justify-self-center backdrop-blur-sm rounded-md border-white border-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                onAmountChange={(amount) => setAmount(amount)}
                onCurrencyChange={(currency) => setFrom(currency)}
                currencyOptions={options}
                selectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 px-4 py-2 rounded-md text-white"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectCurrency={to}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
