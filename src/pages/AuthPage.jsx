import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './../firebase/config';

const AuthPage = ({ setIsAuth }) => {
  // giriş yapma fonk.
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
        // oturumunun açık olduğunu bildiren token'ı lokal'de saklama
        localStorage.setItem('token', res.user.refreshToken);
        // yetkiyi true'ya çek
        setIsAuth(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Odası</h1>
        <p>Devam etmek için Griş Yapın</p>
        <button onClick={handleClick}>
          <img src="/g-logo.png" />
          <span>Google ile gir</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
