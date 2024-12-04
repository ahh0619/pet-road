export const createInfoWindowContent = (place) => {
  const iconClass = place.category_name?.includes('카페')
    ? 'fa-mug-saucer'
    : 'fa-hotel';
  return `
      <div style="
        padding: 10px; 
        font-size: 14px; 
        line-height: 1.6; 
        display: flex; 
        align-items: flex-start; 
        gap: 10px; 
        max-width: 250px; 
        width: auto; 
    
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
        background-color: #fff; 
        color: #333;

      ">
        <!-- 아이콘 -->
        <div style="flex-shrink: 0; font-size: 20px;">
          <i class="fa-solid ${iconClass}" style="color: #ff6732;"></i>
        </div>
        <!-- 텍스트 -->
        <div>
          <strong style="font-size: 16px; color: #4b74c6; font-weight:bold; display: block; margin-bottom: 5px;">
            ${place.place_name}
          </strong>
          <span style="font-size: 14px; color: #555; display: block; margin-bottom: 3px;">
            ${place.road_address_name || place.address_name}
          </span>
          <span style="font-size: 13px; color: #999;">
            ${place.phone || '전화번호 없음'}
          </span>
        </div>
      </div>
    `;
};
