import supabase from '../config/supabase';

const acceptFriendRequest = async (friendId) => {
  const { data, error } = await supabase.from('friends').update({ status: 'ACCEPTED' }).eq('friend_id', friendId);
  if (error) return error.message;
  return data;
};
const declineFriendRequest = async (friendId) => {};

export { acceptFriendRequest, declineFriendRequest };
