import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login, loginSuccess } from "../../redux/userSlice"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  const [data, setData] = useState({email:"",password:"",username:""});
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.user.loading) // Redux store'dan loading durumunu al

  const onChangeFunc=(e)=>{
    setData({...data,  [e.target.name] : e.target.value })
  }

  const loginFunc = (e) => {
    e.preventDefault();
    dispatch(login(data))
      .then((response) => {
        dispatch(loginSuccess(response.meta.arg)); // Kullanıcı bilgilerini Redux store'a ekle
        toast.success("Giriş işlemi başarıyla tamamlandı");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        toast.error("Giriş işlemi başarısız oldu: " + error);
      });
  };
  

  return (
    <div className="flex items-center justify-center h-screen -mt-[80px]">
      <div className="w-80">
        <h2 className="text-2xl font-bold mb-4">Giriş yap</h2>
        <form onSubmit={loginFunc}>
          <div className="mb-4">
          <input
              type="name"
              placeholder="username"
              value={data.username}
              onChange={onChangeFunc}
              name="username"
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
        
            <input
              type="email"
              placeholder="E-posta"
              value={data.email}
              onChange={onChangeFunc}
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
       
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            disabled={isLoading} // Giriş işlemi devam ederken butonu devre dışı bırak
          >
            {isLoading ? "Giriş yapılıyor..." : "Giriş yap"} {/* Loading durumunda uygun mesaj */}
          </button>
          <div onClick={()=>navigate('/register')} className="text-sm text-blue-300 font-semibold cursor-pointer underline">
            Hesap oluşturmadım
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
  )
}
