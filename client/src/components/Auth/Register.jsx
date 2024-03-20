import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // axios kütüphanesini ekleyin

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    avatar: "",
  });

  const onChangeFunc = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setData((prev) => ({ ...prev, avatar: reader.result }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const registerFunc = async (e) => {
    e.preventDefault();
    try {
      // Sunucuya post isteği gönder
      const response = await axios.post('http://localhost:5000/register', data);
      console.log(response.data); // Başarılı bir şekilde kaydedildiğinde gelen cevabı konsola yazdırabilirsiniz
      navigate("/login"); // Başarılı kayıt olduktan sonra login sayfasına yönlendirme
    } catch (error) {
      console.error("Kayıt işlemi başarısız oldu:", error);
    }
  };

  console.log(data);

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
              name="name"
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
            <input
              type="file"
              placeholder="file"
              name="avatar"
              onChange={onChangeFunc}
              className="border p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Kayıt Ol
          </button>
          <div
            onClick={() => navigate("/login")}
            className="text-sm text-blue-300 font-semibold cursor-pointer underline"
          >
            hesabın varsa giriş yap
          </div>
        </form>
      </div>
    </div>
  );
}
