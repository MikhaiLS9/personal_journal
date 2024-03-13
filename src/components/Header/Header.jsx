import style from "./Header.module.css";
import SelectUser from "../SelectUser/SelectUser";
import EnterUserName from "../EnterUserName/EnterUserName";

// eslint-disable-next-line react/prop-types
function Header({ onSubmit, addUser }) {
  return (
    <>
      <img src=".\src\assets\logo.svg" alt="Лого" className={style.logo} />
      <EnterUserName onSubmit={onSubmit} />
      <SelectUser addUser={addUser} />
    </>
  );
}

export default Header;
