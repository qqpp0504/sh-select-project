import { useSelector, useDispatch } from "react-redux";

import Modal from "../UI/Modal.jsx";
import { modalActions } from "@/store/modal-slice.js";
import closeIcon from "@/assets/close-icon.png";

export default function SizeDetailModal({ productSizeInfo }) {
  const { isShowing } = useSelector((state) => state.modal.sizeModal);
  const dispatch = useDispatch();

  function handleCloseSizeDetail() {
    dispatch(modalActions.closeModal({ modalType: "sizeModal" }));
  }

  return (
    <Modal open={isShowing} onClose={handleCloseSizeDetail}>
      <section className="p-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-500">尺寸資訊</h3>
          <button
            onClick={handleCloseSizeDetail}
            className="p-[0.3rem] bg-gray-100 rounded-full hover:bg-gray-300 w-9 h-9"
          >
            <img src={closeIcon} alt="Close icon" className="w-full h-full" />
          </button>
        </div>

        {productSizeInfo.sizes && (
          <div className="flex flex-col overflow-x-auto">
            <table className="min-w-[25rem] text-center table-fixed">
              <thead>
                <tr>
                  {productSizeInfo.sizes.name.map((header) => (
                    <th
                      key={header}
                      className="border-[1px] border-gray-200 px-6 py-3 font-400 bg-gray-100"
                      style={{
                        width: `calc(100% / ${productSizeInfo.sizes.name.length})`,
                        minWidth: "120px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productSizeInfo.sizes.info.map((size, index) => (
                  <tr key={index}>
                    {size.map((data, index) => (
                      <td
                        key={`${data}-${index}`}
                        className="border-[1px] border-gray-200 px-8 py-3"
                      >
                        {data}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <span className="text-xs flex justify-end mt-1">
              &#8251; 單位：公分 (CM)
            </span>
          </div>
        )}

        <div className="mt-5">
          <ul className="marker:text-lg pl-4 list-disc">
            <li>{productSizeInfo.note}</li>
          </ul>
        </div>
      </section>
    </Modal>
  );
}
