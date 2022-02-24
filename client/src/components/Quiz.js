import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Quiz = () => {
  // Create a quiz
  const [quiz, setQuiz] = useState({ Questions: [] });
  const params = useParams();

  // Get Quiz
  useEffect(() => {
    async function fetchQuiz() {
      const q = await axios(`http://localhost:3000/quizzes/${params.id}`, {
        headers: {
          token: localStorage.token,
        },
      });
      console.log(q);
      setQuiz(q.data);
    }
    fetchQuiz();
  }, [params.id]);

  // Return quiz with questions and choices.
  // if they don't choose an option for each question it wont submit.

  return (
    <div className="bg-slate-900 p-8 h-screen text-white w-full">
      <h1 className="text-4xl text-center mb-5">{quiz.name} Quiz</h1>
      <form
        action="http://localhost:3000/auth/success"
        id="quiz"
        method="POST"
        className="p-8 mt-8 w-3/4 mx-auto bg-slate-800 text-left rounded-xl shadow-xl lg:max-w-max"
      >
        <ul>
          {quiz.Questions.map((q) => (
            <li>
              <h3 className="mb-4 text-xl">{q.question}</h3>
              <ul>
                <li>
                  {q.Choices.map((c) => (
                    <div className="border border-blue-400 border-[2px] rounded-full flex items-center mb-3 w-max cu relative overflow-hidden cursor-pointer">
                      <input
                        className="appearance-none ease-in origin-left bg-white duration-300 w-full absolute z-0 scale-x-0 checked:bg-blue-500 p-3 rounded checked:scale-x-100 cursor-pointer"
                        type="radio"
                        name={"question_" + q.id}
                        required
                        id={c.id}
                        value={c.label}
                      />
                      <label
                        for={c.id}
                        className="mx-3 cursor-pointer relative z-10 text-white w-fit"
                      >
                        {c.label}
                      </label>
                    </div>
                  ))}
                </li>
              </ul>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <button
            className="p-3 my-3 bg-blue-300 w-[500px] mx-auto rounded-lg shadow-lg ease-in duration-300 cursor-pointer text-blue-900 origin-left hover:bg-slate-500 hover:text-white"
            type="submit"
          >
            Submit Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default Quiz;
