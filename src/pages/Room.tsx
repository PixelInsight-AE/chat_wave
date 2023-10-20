import { useCallback, useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import supabase from '../config/supabase.js';
import Header from '../components/shared/Header.js';
import Footer from '../components/shared/Footer.js';
import SideNav from '../components/menu/Sidenav.js';
import useConverse from '../hooks/useConverse.js';
import InChat from '../components/chatroom/InChat.js';
import FriendsList from '../components/chatroom/FriendsList.js';
import useChatRoom from '../hooks/useChatRoom.js';
import { useSelector } from 'react-redux';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { ClientConfig, IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';

import { AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

const APP_ID = '446c8e0709df46e38eb760c0b4abac49';
const TOKEN = '007eJxTYLBxcRBuKAp1uPB2mgD//75ZpuKyVy4L/7r6Nmx7AG8N+0wFBhMTs2SLVANzA8uUNBOzVGOL1CRzM4NkgySTxKTEZBNLoc1GqQ2BjAwCT5NZGRkgEMRnYchNzMxjYAAAxWUdlg==';
const CHANNEL = 'main';
const config: ClientConfig = { mode: 'rtc', codec: 'vp8' };

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const Controls = ({ tracks, setStart, setInCall }) => {
  const client = useClient();
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === 'audio') {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === 'video') {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };
  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="controls">
      <p className={trackState.audio ? 'on' : ''} onClick={() => mute('audio')}>
        {trackState.audio ? 'MuteAudio' : 'UnmuteAudio'}
      </p>
      <p className={trackState.video ? 'on' : ''} onClick={() => mute('video')}>
        {trackState.video ? 'MuteVideo' : 'UnmuteVideo'}
      </p>
      {<p onClick={() => leaveChannel()}>Leave</p>}
    </div>
  );
};

const Videos = ({ users, tracks }) => {
  return (
    <div>
      <div id="videos">
        <AgoraVideoPlayer className="vid" videoTrack={tracks[1]} />
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return <AgoraVideoPlayer className="vid" videoTrack={user.videoTrack} key={user.uid} />;
            } else return null;
          })}
      </div>
    </div>
  );
};

const VideoCall = ({ setInCall, roomName, roomToken }) => {
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    // function to initialise the SDK
    let init = async (roomName) => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log('subscribe success');
        if (mediaType === 'video') {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === 'audio') {
          user.audioTrack?.play();
        }
      });

      client.on('user-unpublished', (user, type) => {
        console.log('unpublished', user, type);
        if (type === 'audio') {
          user.audioTrack?.stop();
        }
        if (type === 'video') {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on('user-left', (user) => {
        console.log('leaving', user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(APP_ID, roomName, roomToken, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log('init ready');
      init(roomName);
    }
  }, [roomName, client, ready, tracks]);

  return (
    <div>
      {start && tracks && <Videos users={users} tracks={tracks} />}
      {ready && tracks && <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />}
    </div>
  );
};

const Room = () => {
  const { id } = useParams();
  const userId = useSelector((state) => state.auth.id);
  const { peopleInChat, enterChat, leaveChat, fetchConversations, fetchPeopleInChat, conversations, formatDateTime, roomToken } = useChatRoom(id);
  const { message, handleInput, sendMessage } = useConverse(id);

  const [inCall, setInCall] = useState(false);
  const [inChat, setInChat] = useState(true);
  const [roomName, setRoomName] = useState('');
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      const data = await supabase.from('rooms').select('*, conversations(*),in_chat(*)').eq('id', id);
      setRoom(data);
      setRoomName(data.data[0].name);
    };
    fetchRoom();
    fetchConversations();
    enterChat();
  }, [id]);

  useEffect(() => {
    const channel = supabase.channel(`room:${id}`).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'conversations' }, fetchConversations).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'in_chat' }, fetchPeopleInChat).on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'in_chat' }, fetchPeopleInChat).subscribe();

    const handleUnload = () => {
      setInCall(false);
      leaveChat();
      channel.unsubscribe();
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      leaveChat();
      channel.unsubscribe();
    };
  }, [id]);

  useEffect(() => {
    const chatArea = document.querySelector('.chat-area');
    chatArea.scrollTop = chatArea.scrollHeight;
  }, [conversations]);

  const inChatSwitch = () => {
    switch (inChat) {
      case true:
        return <InChat peopleInChat={peopleInChat} />;
      case false:
        return <FriendsList />;
      default:
        return <InChat peopleInChat={peopleInChat} />;
    }
  };

  return (
    <>
      <Header />
      <div className="room">
        <SideNav />
        <div className="chat-room">
          <section className="chat-room__header">
            <section className="chat-room__header--bookmark">
              <img src="/assets/svg/bookmark.svg" alt="" />

              <h1 className="chat-room__header--name">{roomName}</h1>
            </section>
            <p className="chat-room__header--capacity">{room && room.data[0].capacity}/30</p>
          </section>

          <div style={{ height: '50vh' }}>
            {inCall ? (
              <VideoCall setInCall={setInCall} roomName={roomName} roomToken={roomToken} />
            ) : (
              <h2
                style={{
                  position: 'absolute',
                  top: '30%',
                  left: '30%',
                  color: '#7ad7ff',
                  fontSize: '3rem',
                }}
              >
                Join To See others Video!
              </h2>
            )}
          </div>
          {inCall ? null : (
            <button
              onClick={(e) => {
                e.preventDefault();
                setInCall(true);
              }}
            >
              Join Video
            </button>
          )}
          <ul className="chat-area">
            {conversations ? (
              conversations.map((conversation, i) => {
                return (
                  <li key={i} className="chat-area__message">
                    <section className="chat-area__message--wrapper">
                      <img
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          marginRight: '10px',
                        }}
                        src={conversation.sender.avatar_url}
                        alt=""
                      />
                      <p className="chat-area__message--name">{conversation.sender.username}</p>
                      <p className="chat-area__message--time">{formatDateTime(conversation.sent_at)}</p>
                    </section>
                    <p className="chat-area__message--text">{conversation.message}</p>
                  </li>
                );
              })
            ) : (
              <p>No messages yet</p>
            )}
          </ul>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="chat-room__input"
          >
            <input type="text" placeholder="Express yourself" onChange={handleInput} value={message} />
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="in-chat">
          <section className="in-chat__header">
            <button onClick={() => setInChat(true)}>inchat</button> <button onClick={() => setInChat(false)}>friends</button>
          </section>
          <section className={inChat ? 'in-chat__in-chat' : 'in-chat__friends-list'}>{inChatSwitch()}</section>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Room;
