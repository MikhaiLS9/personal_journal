import style from "./Header.module.css";
import SelectUser from "../SelectUser/SelectUser";
import EnterUserName from "../EnterUserName/EnterUserName";
import logo from '../../assets/logo.svg'

// eslint-disable-next-line react/prop-types
function Header({ onSubmit, addUser }) {
  return (
    <>
      <img src={logo} alt="Лого" className={style.logo} />
      <EnterUserName onSubmit={onSubmit} />
      <SelectUser addUser={addUser} />
    </>
  );
}

export default Header;
