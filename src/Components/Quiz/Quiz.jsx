import { useState, useRef } from "react";
import { data } from "../../assets/data";
import "./Quiz.css";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(index + 1);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setLock(false);
    setScore(0);
    setResult(false);
    // setResult(false);
  };

  return (
    <div className="w-1/2 m-auto mt-8 bg-white text-neutral-700 flex flex-col gap-5 rounded-lg px-12 py-11">
      <h1 className="text-lg font-extrabold text-center underline">Quiz App</h1>
      <hr className="h-1 border-none bg-gray-800" />
      {result ? (
        <></>
      ) : (
        <>
          {" "}
          <h2 className="text-lg font-medium">
            {index + 1}.{question.question}
          </h2>
          <ul>
            <li
              ref={option1}
              onClick={(e) => {
                checkAns(e, 1);
              }}
              className="flex items-center h-10 pl-4 border-2 border-solid border-gray-500 mb-5 text-xl cursor-pointer"
            >
              {question.option1}
            </li>
            <li
              ref={option2}
              onClick={(e) => {
                checkAns(e, 2);
              }}
              className="flex items-center h-10 pl-4 border-2 border-solid border-gray-500 mb-5 text-xl cursor-pointer"
            >
              {question.option2}
            </li>
            <li
              ref={option3}
              onClick={(e) => {
                checkAns(e, 3);
              }}
              className="flex items-center h-10 pl-4 border-2 border-solid border-gray-500 mb-5 text-xl cursor-pointer"
            >
              {question.option3}
            </li>
            <li
              ref={option4}
              onClick={(e) => {
                checkAns(e, 4);
              }}
              className="flex items-center h-10 pl-4 border-2 border-solid border-gray-500 mb-5 text-xl cursor-pointer"
            >
              {question.option4}
            </li>
          </ul>
          <button
            onClick={next}
            className="m-auto w-64 h-12 bg-blue-500 text-white text-xl font-bold rounded-lg cursor-pointer"
          >
            Next
          </button>
          <div className="text-center font-bold">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
      {result ? (
        <>
          <h2 className="text-center text-2xl">
            Your score {score} out of {data.length}
          </h2>
          <button
            onClick={reset}
            className="m-auto w-64 h-12 bg-blue-500 text-white text-xl font-bold rounded-lg cursor-pointer"
          >
            Reset
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
