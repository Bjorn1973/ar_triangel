"use client";

import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const Index = () => {
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    reason: "",
  });
  const [todoList, setTodoList] = useState([]);
  const [isDisabled, setIsDisabled] = useState("disabled");
  const [isMounted, setIsMounted] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setUserInput({
      ...userInput,
      [e.target.name]: value,
    });
    if (
      userInput.firstName !== "" &&
      userInput.lastName !== "" &&
      userInput.reason !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    //console.log(userInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTodoList((todoList) => [
      [
        userInput.firstName,
        userInput.lastName,
        userInput.reason,
        new Date().toLocaleDateString("nl-BE", { dateStyle: "short" }),
        new Date().toLocaleTimeString(),
      ],
      ...todoList,
    ]);
    setUserInput({
      firstName: "",
      lastName: "",
      reason: "",
    });
    setIsDisabled("disabled");
    localStorage.setItem(
      userInput.firstName + userInput.lastName,

      userInput.firstName +
        " " +
        userInput.lastName +
        " " +
        userInput.reason +
        " " +
        new Date().toLocaleDateString("nl-BE", { dateStyle: "short" }) +
        " " +
        new Date().toLocaleTimeString()
    );
  };

  const handleDelete = (todo) => {
    const updatedArr = todoList.filter(
      (todoItem) => todoList.indexOf(todoItem) != todoList.indexOf(todo)
    );
    //console.log(todo);
    setTodoList(updatedArr);
    localStorage.removeItem(todo[0] + todo[1]);
  };

  useEffect(() => {
    setIsMounted(true);
    const savedUserInput = { ...localStorage };

    console.log(savedUserInput);
    if (savedUserInput) {
      const todos = Object.values(savedUserInput);
      console.log(todos);
      const lists = todos.map((todo) => todo.split(" "));
      const list = lists.map((list) => list.join().split(","));
      setTodoList(list);
      console.log(list);
    }
  }, []);

  return (
    <div>
      <div className="header">
        <h3 className="title">Aanwezigheidsregister Triangel</h3>
        <div>
          <img src="/images/logo.png" alt="" />
        </div>
      </div>
      <form className="form" action="">
        <input
          className="inputField"
          type="text"
          name="firstName"
          value={userInput.firstName}
          placeholder="Voornaam"
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          className="inputField"
          type="text"
          name="lastName"
          value={userInput.lastName}
          placeholder="Achternaam"
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          className="inputField"
          type="text"
          name="reason"
          value={userInput.reason}
          placeholder="Reden aanwezigheid"
          onChange={handleChange}
          autoComplete="off"
        />
        <button
          className="addButton"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          Voeg toe
        </button>
      </form>
      <ul className="list">
        <h4 className="listTitle" key="title">
          Bezoekers die momenteel aanwezig zijn op school:
        </h4>

        {todoList.length >= 1 ? (
          todoList.map((todo) => {
            return (
              <div key={nanoid()}>
                <li className="listItem">
                  <span>&#8226; </span>
                  {todo[0]} {todo[1]} - {todo[2]} - {todo[3]} - {todo[4]}
                  <button
                    className="deleteButton"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(todo);
                    }}
                  >
                    <svg className="icon-close">
                      <use xlinkHref="/icons/symbol-defs.svg#icon-close"></use>
                    </svg>
                    {/* Verwijder */}
                  </button>
                </li>
              </div>
            );
          })
        ) : (
          <div className="substitute">Geen bezoekers aanwezig!</div>
        )}
      </ul>
    </div>
  );
};

export default Index;
