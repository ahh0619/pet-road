import { useEffect } from 'react';
import useAuthUserStore from '../../stores/useAuthUserStore';
import { supabase } from '../../api/supabase/supabase';
import { toast } from 'react-toastify';
import usePlaceStore from '../../stores/usePlaceStore';
import { useQueryClient } from '@tanstack/react-query';

function LikeComponent() {
  //   const [isLiked, setIsLiked] = useState(false);
  const { id } = useAuthUserStore((state) => state.authUser) || '';
  const { selectedPlace, isLiked, setIsLiked } = usePlaceStore();
  const queryClient = useQueryClient();

  /* 좋아요 정보 가져오기 */
  useEffect(() => {
    if (selectedPlace && id) {
      const fetchLike = async () => {
        const { data, error } = await supabase
          .from('bookmarks')
          .select('*')
          .eq('user_id', id)
          .eq('place_id', selectedPlace.id);

        if (error) {
          console.error('Error fetching like status:', error);
        } else {
          setIsLiked(data.length > 0);
        }
      };
      fetchLike();
    }
  }, [selectedPlace, id]);

  const handleLikeBtn = async () => {
    if (!id) {
      toast.error('로그인 후 이용해 주세요.');
      return;
    }

    if (isLiked) {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', id)
        .eq('place_id', selectedPlace.id);

      if (!error) {
        setIsLiked(false);
        queryClient.invalidateQueries(['bookmarks', id]);
      }
    } else {
      const { error } = await supabase.from('bookmarks').insert({
        user_id: id,
        place_id: selectedPlace.id,
        place_name: selectedPlace.place_name,
        address_name: selectedPlace.address_name,
        road_address_name: selectedPlace.road_address_name,
        phone_number: selectedPlace.phone,
        category_group_name: selectedPlace.category_group_name,
        category_name: selectedPlace.category_name,
        location_x: selectedPlace.x,
        location_y: selectedPlace.y,
      });

      if (!error) {
        setIsLiked(true);
        queryClient.invalidateQueries(['bookmarks', id]);
      }
    }
  };

  return (
    <img
      src={isLiked ? 'heart-on.png' : 'heart-off.png'}
      onClick={handleLikeBtn}
    />
  );
}

export default LikeComponent;
