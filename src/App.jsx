import { useState } from 'react';
import AuthPage from './pages/AuthPage';
import Chat from './pages/Chat';
import './style.scss';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/config';

function App() {
  // kullanıcı yetkili mi state'ini tutuyoruz
  // state'in ilk değeri local'deki token'a göre belirlernir
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token'));

  // kulanıcnın girdiği odanın state'i
  const [room, setRoom] = useState(null);

  // form gönderildiğini odayı belirler
  const handleSubmit = (e) => {
    e.preventDefault();
    setRoom(e.target[0].value);
  };

  // yetkisi yoksa > giriş
  if (!isAuth) {
    return <AuthPage setIsAuth={setIsAuth} />;
  }

  // yetkisi varsa
  return (
    <div className="container">
      {room ? (
        // odayı belirlediyse > sohbet
        <Chat room={room} setRoom={setRoom} />
      ) : (
        // odayı belirlemediyse > oda seçme
        <form onSubmit={handleSubmit} className="room-page">
          <h1>Chat Odası</h1>
          <p>Hangi Odaya Gireceksiniz</p>

          <input type="text" placeholder="örn:haftaiçi" />

          <button type="submit">Odaya Gir</button>
          <button
            onClick={() => {
              signOut(auth)
                .then(() => {
                  // lokal'den token'ı kaldırma
                  localStorage.removeItem('token');
                  // yetkili state'ini false'a çek
                  setIsAuth(false);
                })
                .catch((err) => console.log(err));
            }}
            id="logout"
            type="button"
          >
            Çıkış Yap
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
