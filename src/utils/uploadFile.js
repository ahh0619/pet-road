import { supabase } from '../api/supabase/supabase';
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (storageName, file) => {
  const { data, uploadError } = await supabase.storage
    .from(storageName)
    .upload(`${storageName}/${uuidv4()}`, file);

  if (uploadError) throw uploadError;

  return supabase.storage.from(storageName).getPublicUrl(data.path).data
    .publicUrl;
};
