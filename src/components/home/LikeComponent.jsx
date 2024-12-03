import React, { useEffect, useState } from 'react'
import useAuthUserStore from '../../stores/useAuthUserStore';
import { supabase } from '../../api/supabase/supabase';
import { toast } from 'react-toastify';
import usePlaceStore from '../../stores/usePlaceStore';

function LikeComponent({ selectedPlaceId }) {
    const [isLiked, setIsLiked] = useState(false);
    const {id} = useAuthUserStore((state) => state.authUser) || "";
    const {selectedPlace} = usePlaceStore();

    /* 좋아요 정보 가져오기 */
    useEffect(() => {
        if (id) {
            const fetchLike = async () => {
                const { data, error } = await supabase.from('bookmarks').select('*').eq('user_id', id).eq('place_id', selectedPlace.id);

                if (error) window.alert('오류가 발생했습니다.', error);
                else setIsLiked(data.length > 0);
            };
            fetchLike();
        }else{ setIsLiked(false); }
    }, [selectedPlace.id]);

    const handleLikeBtn = async () => {
        if(!id){ toast.error("로그인 후 이용해 주세요."); return }
        /* 좋아요 버튼 눌렀을 때 로직 처리 */
        if (isLiked) {
            const { error } = await supabase.from('bookmarks').delete().eq('user_id', id).eq('place_id', selectedPlace.id);
            if (error) console.log(error);
            setIsLiked(false);
        } else {
            const { error } = await supabase.from('bookmarks')
            .insert({ 
                user_id: id, 
                place_id: selectedPlace.id,
                place_name: selectedPlace.place_name,
                address_name: selectedPlace.address_name,
                road_address_name: selectedPlace.road_address_name,
                phone_number: selectedPlace.phone,
                category_group_name: selectedPlace.category_group_name,
                category_name: selectedPlace.category_name,
                location_x: selectedPlace.x,
                location_y: selectedPlace.y
             });
            if (error) console.log(error);
            setIsLiked(true);
        }
    };

    return (
        <img src={isLiked ? 'heart-on.png' : 'heart-off.png'} onClick={handleLikeBtn} />
    )
}

export default LikeComponent