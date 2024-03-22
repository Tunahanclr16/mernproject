import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/userSlice"; 
import { useNavigate } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Kullanıcı bilgilerini al
  const isAuth = useSelector((state) => state.user.isAuth);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutSuccess());
  };

  return (
    <div>
      {isAuth ? (
        <div>
          <h2>Welcome, {user.username}</h2>
          <img src={user.avatar} alt="Avatar" />
          <button onClick={handleLogout}>Çıkış Yap</button>
          Home
        </div>
      ) : (
        <div>
          <h2>Giriş yapın</h2>
          <button onClick={() => navigate("/login")}>Giriş Yap</button>
        </div>
      )}
    </div>
  );
}
