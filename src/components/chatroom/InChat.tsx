const InChat = ({ peopleInChat }) => {
  return (
    <ul>
      {peopleInChat &&
        peopleInChat.map((person) => (
          <li key={person.profile_id}>
            <img
              style={{
                width: '25px',
                height: '25px',
                borderRadius: '50%',
              }}
              src={person.users.avatar_url}
              alt={person.users.username}
            />
            <p>{person.users.username}</p>
          </li>
        ))}
    </ul>
  );
};
export default InChat;
