import supabase from '../config/supabase';
import { useSelector } from 'react-redux';
const acceptFriendRequest = async (profileId) => {
  const { data, error } = await supabase.from('friends').update({ status: 'accepted' }).eq('profile_id', profileId);

  if (error) {
    console.log(error.message);
    return error.message;
  }
};
const declineFriendRequest = async (friendId) => {
  const { data, error } = await supabase
    .from('friends')
    .update({
      status: 'rejected',
    })
    .eq('friend_id', friendId);
  if (error) return error.message;
  return data;
};

export { acceptFriendRequest, declineFriendRequest };
