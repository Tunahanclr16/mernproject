// ToastContainer.jsx
import { useSelector } from 'react-redux';
import Toast from './Toast'; // Toast bileşeni

const ToastContainer = () => {
  const error = useSelector(state => state.user.error); // Redux store'daki hata mesajını al

  return (
    <div className="toast-container">
      {error && <Toast message={error} />} {/* Hata mesajı varsa Toast bileşeniyle göster */}
    </div>
  );
}

export default ToastContainer;
