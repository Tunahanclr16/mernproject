import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, registerSuccess } from "../../redux/userSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({email:"",password:"",avatar:""});
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loading); // Redux store'dan loading durumunu al
  const [preview,setPreview] = useState('https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D')

  const onChangeFunc = (e) => {
    if (e.target.name == "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setData((prev) => ({ ...prev, avatar: reader.result }));
          setPreview(reader.result)
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const registerFunc = (e) => {
    e.preventDefault();
    dispatch(register(data))
      .then((response) => {
        dispatch(registerSuccess(response.meta.arg)); // Kullanıcı bilgilerini Redux store'a ekle
        toast.success("Kayıt işlemi başarıyla tamamlandı");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Kayıt işlemi başarısız oldu: " + error);
      });
  };
  

  return (
    <div className="flex items-center justify-center h-screen -mt-[80px]">
      <div className="w-80">
        <h2 className="text-2xl font-bold mb-4">Kayıt Ol</h2>
        <form onSubmit={registerFunc}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              onChange={onChangeFunc}
              value={data.name}
              name="username"
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              onChange={onChangeFunc}
              placeholder="E-posta"
              value={data.email}
              name="email"
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Şifre"
              value={data.password}
              onChange={onChangeFunc}
              name="password"
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <img src={preview} alt="" />
            <input
              type="file"
              placeholder="file"
              onChange={onChangeFunc}
              name="avatar"
              className="border p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            disabled={isLoading} // Kayıt işlemi devam ederken butonu devre dışı bırak
          >
            {isLoading ? "Kaydediliyor..." : "Kayıt Ol"} {/* Loading durumunda uygun mesaj */}
          </button>
          <div
            onClick={() => navigate("/login")}
            className="text-sm text-blue-300 font-semibold cursor-pointer underline"
          >
            hesabın varsa giriş yap
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        trans
      />
    </div>
  );
}
