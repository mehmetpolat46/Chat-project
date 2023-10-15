import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useEffect, useState } from 'react';
import Message from './../components/Message';

const Chat = ({ room, setRoom }) => {
  // günceleyyiceğimiz kolleksiyonun referansını alma
  const messagesCol = collection(db, 'messages');
  const [messages, setMessages] = useState([]);

  // mesajı veritabınına ekler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    // add doc yeni döküman ekler (auto id)
    // iki parametre ister
    // - ekleme yağıcağımız kolleksiyonun referansı
    // - data
    await addDoc(messagesCol, {
      text,
      room,
      user: {
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      },
      // server'ın zamanı oluşturmasnı sağlar
      createdAt: serverTimestamp(),
    });
  };

  useEffect(() => {
    //  filtreme ayarlarını tanımlama
    const queryOptions = query(
      messagesCol,
      where('room', '==', room),
      orderBy('createdAt', 'asc')
    );

    // on snaphot kollekisyon her değiştiğinde
    // bir fonksiyon çalışıtırıp fonksiyona güncel
    // dökümanalrı parametre olarak gönderirir
    onSnapshot(queryOptions, (snapshot) => {
      let tempMessages = [];
      // dökümanları dönüp  içerisindeki data() methodu
      // ile verilere erişip + dökümnanın id'sini ekleyip
      // yeni diziye aktarma
      snapshot.docs.forEach((doc) =>
        tempMessages.push({ id: doc.id, ...doc.data() })
      );
      // state'i güncelleme
      setMessages(tempMessages);
    });
  }, []);

  return (
    <div className="chat">
      <header>
        <p className="user">{auth?.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <main>
        {messages?.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
      </main>

      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="mesajınızı yazınız..."
        />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default Chat;
