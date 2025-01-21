import { useDispatch } from "react-redux";

import { cartActions } from "../../store/cart-slice.js";

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// 更新滾動位置
export function updateScrollPosition(dispatch) {
  dispatch(cartActions.updatedScrollPosition(window.scrollY));
}

// 顯示通知
export function showNotification(dispatch, type) {
  dispatch(cartActions.showNotification(type));
}

// 主函數：組織各功能
export function addNotification(dispatch, data, type) {
  dispatch(cartActions.checkItemStatus(data));
  updateScrollPosition(dispatch);
  scrollToTop();
  showNotification(dispatch, type);
}

export function useAddNotification() {
  const dispatch = useDispatch();

  return (data, type) => {
    addNotification(dispatch, data, type);
  };
}
