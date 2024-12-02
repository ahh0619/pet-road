import { supabase } from '../supabase/supabase';
import defaultProfileImagePath from '/defaultProfile.png?url';

export const signUp = async (newAuthUser) => {
  const doesUserExist = await fetchUserInfoByUserName(newAuthUser.userName);
  if (doesUserExist) {
    const error = new Error();
    error.code = 'nickname_already_exists';
    throw error;
  }
  const user = await addAuthUser(newAuthUser);
  await addUserInfo({
    id: user.id,
    user_name: newAuthUser.userName,
    profile_image: defaultProfileImagePath,
  });
};

const addAuthUser = async (newAuthUser) => {
  const { data, error } = await supabase.auth.signUp(newAuthUser);
  if (error) throw error;
  return data.user;
};

const addUserInfo = async (userInfo) => {
  const { error } = await supabase.from('users').insert(userInfo);
  if (error) throw error;
};

export const requestLogin = async (authInfo) => {
  const { data, error } = await supabase.auth.signInWithPassword(authInfo);
  if (error) throw error;
  return data.user;
};

export const fetchUserInfoByUserName = async (userName) => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('user_name', userName)
    .maybeSingle();
  console.log('🚀 ~ fetchUserInfoByUserName ~ error:', error);
  if (error) throw error;
  return data;
};

export const fetchUserInfoById = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
};
