import React from 'react';
import { auth } from './../firebase/config';

const Message = ({ msg }) => {
  // mesajı gönderern kişinin id'si
  // oturmu açık olan kullaıcın id'sine eşitse
  if (msg.user.uid === auth.currentUser.uid) {
    return <p className="msg-user">{msg.text}</p>;
  }

  //   mesajı başka bir kullanıcı gönderdiyse
  return (
    <div className="msg-other">
      <p className="user-info">
        <img src={msg.user.photo} />
        <span>{msg.user.name}: </span>
      </p>

      <p className="msg-text">{msg.text}</p>
    </div>
  );
};

export default Message;
