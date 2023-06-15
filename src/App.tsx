import { useState } from "react";
import { useCustomDispatch, useCustomSelector } from "./hooks/redux";
import { getPost } from "./store/post";

interface IUser {
  email: string;
  number: string;
}

function App() {
  const dispatch = useCustomDispatch();
  const state = useCustomSelector((state) => state);

  const [email, setEamil] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [checkNumber, setCheckNumber] = useState<boolean>(true);

  const user: IUser = {
    email,
    number: number.split("-").join(""),
  };

  const getUser = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkNumber === false) {
      return;
    }
    dispatch(
      getPost({ post: user, result: state.result, state: state.state })
    );

    setCheckNumber(true);
  };

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let text: string = e.target.value;
    const mask = () => {
      let finnaly: string = text
        .split("")
        .reduce((accumulator, currentValue, index) =>
          index % 2 === 0 || index === 0
            ? (accumulator += `-${currentValue}`)
            : (accumulator += `${currentValue}`)
        );
      return setNumber(finnaly);
    };
    if (text.length > 0) {
      text = text.split("-").join("");
      if (!!Number(text) === true) {
        mask();
        setCheckNumber(true);
      } else {
        mask();
        setCheckNumber(false);
      }
    } else {
      setNumber(text);
      setCheckNumber(true);
    }
  };
  return (
    <div className="wrapper">
      <form onSubmit={getUser}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEamil(e.target.value)}
          placeholder="email"
        />
        <input
          type="tel"
          value={number}
          onChange={onChangeNumber}
          placeholder="number"
        />
        {checkNumber ? null : (
          <p className="check_error">Вы ввели не правильный формат номера</p>
        )}
        <input
          type="submit"
          className={checkNumber ? undefined : "no_submit"}
        />
      </form>
      {state.state === "" ? null : state.state === "loading" ? (
        <div className="block">
          <div className="circle"></div>
        </div>
      ) : state.state === "finish" ? (
        <div className="block">
          <p className="ok_result">{state.result}</p>
        </div>
      ) : (
        <div className="block">
          <p className="error_result">{state.result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
