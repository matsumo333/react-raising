import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc, arrayUnion, addDoc, query, where, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase"; 
import "./EventList.scss";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventCollection = collection(db, "events");
      const eventSnapshot = await getDocs(eventCollection);
      const eventList = eventSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEvents(eventList);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    fetchEvents();

    return unsubscribe;
  }, []);

  const handleJoinEvent = async (eventId) => {
    if (!currentUser) {
      console.log("User is not logged in");
      return;
    }
    
    const eventRef = doc(db, "events", eventId);
    await updateDoc(eventRef, {
      participants: arrayUnion(currentUser.uid)
    });

    await addDoc(collection(db, "event_members"), {
      eventId: eventId,
      memberId: currentUser.uid
    });

    // データを再取得して再表示
    const eventCollection = collection(db, "events");
    const eventSnapshot = await getDocs(eventCollection);
    const updatedEventList = eventSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setEvents(updatedEventList);
    console.log("再表示してよ");
  };

  return (
    <div className="eventListContainer">
      <h1>イベント一覧</h1>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>参加者</th>
            <th>参加</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.title}</td>
              <td>
                <ParticipantList eventId={event.id} />
              </td>
              <td>
                <button onClick={() => handleJoinEvent(event.id)}>
                  参加する
                </button>
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

  useEffect(() => {
    const getEventParticipants = async () => {
      const eventMembersQuery = query(
        collection(db, "event_members"),
        where("eventId", "==", eventId)
      );
      const eventMembersSnapshot = await getDocs(eventMembersQuery);
      
      const ids = eventMembersSnapshot.docs.map((doc) => doc.data().memberId);

      const names = await Promise.all(ids.map(async (memberId) => {
        const membersQuery = query(collection(db, "members"), where("author.id", "==", memberId));
        const membersSnapshot = await getDocs(membersQuery);
        
        if (!membersSnapshot.empty) {
          const userDoc = membersSnapshot.docs[0]; // Assuming there's only one matching document
          const userData = userDoc.data();
          const accountname = userData.accountname;
          return accountname;
        } else {
          console.log("メンバーが見つかりませんでした。");
          return "Unknown User";
        }
      }));

      setParticipantNames(names);
      console.log("お名前",setParticipantNames);
    };

    getEventParticipants();
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
