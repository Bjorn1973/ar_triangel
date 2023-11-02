import { useState } from "react";

const Index = () => {
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    reason: "",
  });
  const [todoList, setTodoList] = useState([]);
  const [isDisabled, setIsDisabled] = useState("disabled");

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

    console.log(userInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTodoList((todoList) => [
      [
        userInput.firstName,
        userInput.lastName,
        userInput.reason,
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
  };

  const handleDelete = (todo) => {
    const updatedArr = todoList.filter(
      (todoItem) => todoList.indexOf(todoItem) != todoList.indexOf(todo)
    );

    setTodoList(updatedArr);
  };

  return (
    <div>
      <div className="header">
        <h3 className="title">Aanwezigheidsregister Triangel</h3>
        <div>
          <img src="/logo.png" alt="" />
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
        <h4 className="listTitle">
          Bezoekers die momenteel aanwezig zijn op school:
        </h4>
        {todoList.length >= 1 ? (
          todoList.map((todo, idx) => {
            return (
              <div>
                <li className="listItem" key={idx}>
                  <span>&#8226;</span>
                  {todo[0]} {todo[1]} - {todo[2]} - {todo[3]}
                  <button
                    className="deleteButton"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(todo);
                    }}
                  >
                    Verwijder
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
