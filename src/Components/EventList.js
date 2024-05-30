import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, arrayUnion, addDoc, query, where, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import './EventList.scss';
import { Link, useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userEventParticipation, setUserEventParticipation] = useState({});
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");



  useEffect(() => {
    const fetchEvents = async () => {
      const eventCollection = collection(db, 'events');
      const eventSnapshot = await getDocs(eventCollection);
      const eventList = eventSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEvents(eventList);
    };

    const fetchUserEventParticipation = async (userId) => {
      const eventMembersQuery = query(
        collection(db, 'event_members'),
        where('memberId', '==', userId)
      );
      const eventMembersSnapshot = await getDocs(eventMembersQuery);
      const userParticipation = eventMembersSnapshot.docs.reduce((acc, doc) => {
        acc[doc.data().eventId] = true;
        return acc;
      }, {});
      setUserEventParticipation(userParticipation);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        fetchUserEventParticipation(user.uid);
      }
    });

    fetchEvents();

    return unsubscribe;
  }, []);

  const handleJoinEvent = async (eventId) => {
    if (!currentUser) {
      console.log('User is not logged in');
      alert('ログインしてください');
      navigate('/login');
      return;
    }

    const eventRef = doc(db, 'events', eventId);
    await updateDoc(eventRef, {
      participants: arrayUnion(currentUser.uid)
    });

    await addDoc(collection(db, 'event_members'), {
      eventId: eventId,
      memberId: currentUser.uid
    });

    // リロードしても表示が変わらないので、一旦、別のページに行って戻ってきます。
    navigate('/confirmation');
  };

  /** イベントを削除する。
   * 
   * @param {*} id 
   */
  const handleEditClick = async (id) => {
    console.log("きてtrue" + id);
    await deleteDoc(doc(db, "events", id));
    window.location.href = "/eventedit";
  };

    /** イベントを編集する。
   * 
   * @param {*} id 
   */
    const handleDelete = async (id) => {
      console.log("きてtrue" + id);
      await deleteDoc(doc(db, "events", id));
      window.location.href = "/eventlist";
    };
  

  return (
    <div className="eventListContainer">
      <h1>イベント一覧</h1>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>開催場所</th>
            <th>コート数</th>
            <th>定員</th>
            <th>コート面</th>         
            <th>参加者</th>
            <th>参加</th>
            <th>編集</th>
            <th>編集</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.title}</td>
              <td>{event.site_region}</td>
              <td>{event.court_count}</td>
              <td>{event.capacity}</td>
              <td>{event.court_surface}</td>
              <td>
                <ParticipantList key={event.id} eventId={event.id} />
              </td>
              <td>
                {userEventParticipation[event.id] ? (
                  <span className='sankasumi'>参加表明済みです</span>
                ) : (
                  <button onClick={() => handleJoinEvent(event.id)}>
                    参加する
                  </button>
                )}
              </td>
              <td>
              <button onClick={() => handleDelete(event.id)}>削除</button>
              </td>
              <td>
              <Link to={`/eventedit/${event.id}`}>編集する</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ParticipantList = ({ eventId }) => {
  const [participantNames, setParticipantNames] = useState([]);
  const navigate = useNavigate();

  const fetchParticipants = async () => {
    const eventMembersQuery = query(
      collection(db, 'event_members'),
      where('eventId', '==', eventId)
    );
    const eventMembersSnapshot = await getDocs(eventMembersQuery);

    const ids = eventMembersSnapshot.docs.map((doc) => doc.data().memberId);
    console.log("お名前の前",ids);
    const names = await Promise.all(ids.map(async (memberId) => {
      const membersQuery = query(collection(db, 'members'), where('author.id', '==', memberId));
      const membersSnapshot = await getDocs(membersQuery);
   console.log("お名前がない",membersSnapshot);
      if (!membersSnapshot.empty) {
        const userDoc = membersSnapshot.docs[0]; // Assuming there's only one matching document
        const userData = userDoc.data();
        const accountname = userData.accountname;
        return accountname;
      } else {
 
        return 'あなたはメンバー名が未登録ですメンバー登録でお名前を登録してください。';
      }
    }));

    setParticipantNames(names);
  };

  useEffect(() => {
    fetchParticipants();
  }, [eventId]);

  return (
    <ul>
      {participantNames.map((name, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  );
};

export default EventList;
