import React, { useState, useEffect } from 'react';
import { Switch, Route, } from 'react-router-dom';
import useFireStoreToGet from '../firebase/hooks/useFirestoreToGet';

import Tab from '../components/navigations/Tab';
import Error from './Error';
import Preloader from '../components/Preloader/Preloader';
import MessageModal from '../components/Modals/MessageModal';

import { faMailBulk, faEnvelope, faEnvelopeOpen, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MessageView = () => {
  const { docs, error } = useFireStoreToGet('messages');
  const [messages, setMessages] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState([])
  const [readMessages, setReadMessages] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState('');
  
  useEffect(() => {
    setErrors(error);
    setMessages(docs);
    setUnreadMessages([]);
    setReadMessages([]);

    docs.forEach((doc) => {
      if (doc.read) {
        setReadMessages(messages => [...messages, doc]);
      }else {
        setUnreadMessages(messages => [...messages, doc]);
      }
    })
    setTimeout(() => setLoading(false), 1000);
  }, [docs, error])

  // functions
  const handleMessageClick = (message) => {
    // set the selected message id
    setSelectedMessage(message);

    // open the modal
    setModalOpen(true);
  }

  const tabs = [
    { tab: 'all', route: '', icon:faMailBulk, badgeNo:0 },
    { tab: 'unread', route: '/unread', icon:faEnvelope, badgeNo: unreadMessages.length },
    { tab: 'read', route: '/read', icon:faEnvelopeOpen, badgeNo:0 },
  ]
  return (
    <main className="message-view">
      <Tab tabs={tabs}/>
      <Switch>
        <Route exact path="/dashboard/messages" component={() => <MessageList filter='' messageList={messages} errors={errors} loading={loading} onMessageClick={handleMessageClick}/>}/>
        <Route path="/dashboard/messages/unread" component={() => <MessageList filter="unread" messageList={unreadMessages} errors={errors} loading={loading} onMessageClick={handleMessageClick}/>}/>
        <Route path="/dashboard/messages/read" component={() => <MessageList filter="read" messageList={readMessages} errors={errors} loading={loading} onMessageClick={handleMessageClick}/>}/>
      </Switch>
      {modalOpen && <MessageModal modalOpen={modalOpen} setModalOpen={setModalOpen} selectedMessage={selectedMessage}/>}
    </main>
  )
}

const MessageList = ({ filter, messageList, errors, loading, onMessageClick }) => {
  return (
    <div className="message-body">
      <section className="message-list">
        {
          messageList.map(message => {
            return <MessageItem  key={message.id} message={message} onClick={onMessageClick}/>
          })
        }
        {/* for errors */}
        {(errors && !loading && !messageList[0]) && <Error message={errors} title="Oops!!!" mood=":("/> }
        {/* for empty inboxes */}
        {(!errors && !loading && !messageList[0]) && <Error message={`You have no ${filter} messages...`} mood="" title={<FontAwesomeIcon icon={faFolderOpen} />} /> }
        {/* while loading */}
        {loading && <Preloader size={100} border={10} color='#446df6d6'/>}
      </section>
    </div>
  );
}

const MessageItem = ({ message, onClick }) => {
  const [messageState, setMessageState] = useState({})
  const { createdAt, email, messageText, name, read } = messageState;

  const className = read ? 'message-item' : 'message-item unread';



  // functions
  const evalTime = (dateObject) => {
    let hours =  dateObject.getHours();
    const minutes = dateObject.getMinutes();
    let timeSuffix;

    if (hours >= 12) {
      timeSuffix = 'PM';
      hours = hours - 12 || hours;
    }else{
      timeSuffix = 'AM';
    }

    return `${hours}:${minutes}${timeSuffix}`;
  }

  useEffect(() => {
    const createdAt = {
      date: new Date(message.createdAt.toDate()).toLocaleDateString('default', {year:"2-digit", month:"short", day: "numeric"} ),
      time: evalTime(new Date(message.createdAt.toDate()))
    }
    
    const newMessageObject = {...message, createdAt};
    setMessageState(newMessageObject);
  }, [message])

  return (
    <div className={className} onClick={() => onClick(messageState)}>
      {
        createdAt 
        ? <>
            <div className="left">
              <h3 className="sender-name">{name}</h3>
              <p className="sender-email">{email}</p>
              <p className="message">{messageText}</p>
            </div>
            <div className="right">
              <p className="date">{createdAt.date}</p>
              <p className="time">{createdAt.time}</p>
            </div>
          </>
        : null
      }
    </div>
  )
}
export default MessageView