import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [data,setData]=useState({email:"",password:""})
  const navigate=useNavigate()

  const onChangeFunc=(e)=>{
    setData({...data,  [e.target.name] : e.target.value })
  }
  return (
    <div className="flex items-center justify-center h-screen -mt-[80px]">
      <div className="w-80">
        <h2 className="text-2xl font-bold mb-4">Giriş yap</h2>
        <form>
          <div className="mb-4">
            <input
              type="email"
              placeholder="E-posta"
              value={data.email}
              onChange={onChangeFunc}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Şifre"
              value={data.password}
              onChange={onChangeFunc}
              className="border p-2 w-full"
            />
          </div>
       
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
           Giriş yap
          </button>
          <div onClick={()=>navigate('/register')} className="text-sm text-blue-300 font-semibold cursor-pointer underline">
          Hesap olusturmadım
          </div>
        </form>
      </div>
    </div>
  )
}

