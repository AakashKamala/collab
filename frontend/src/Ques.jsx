import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { arr } from './data/arr';

const Ques = () => {
  const [question, setQuestion] = useState('');
  const [socket, setSocket] = useState(null);
  const [answer, setAnswer] = useState('');
  const [index, setIndex] = useState('');

  const handleAnswer = (e) => {
    const userAnswer = e.target.value;
    setAnswer(userAnswer);
    console.log("Answer:", userAnswer);

    socket.emit("sol", userAnswer, index)
  };

  useEffect(() => {
    const currentIndex = window.location.pathname[1];
    console.log("Index:", currentIndex);
    setIndex(currentIndex);
    setQuestion(arr[currentIndex] || "Question not found");
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:5005");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !index) return;

    socket.emit("ques", index);

    socket.on("welcome", (data) => {
      console.log("Welcome:", data.message);
      setAnswer(data.answer)
    });

    socket.on("soln", (data) => {
      console.log("Solution:", data.message);
      setAnswer(data.message)
    });

    return () => {
      socket.off("welcome");
      socket.off("soln");
    };
  }, [socket, index]);

  return (
    <div>
      <h1>{question}</h1>
      <textarea
        rows={20}
        cols={80}
        value={answer}
        onChange={handleAnswer}
      ></textarea>
    </div>
  );
};

export default Ques;
