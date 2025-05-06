import { Dialog } from "@headlessui/react";

export default function DeleteSprintDialog({ open, onConfirm, onCancel }) {
  return (
    <Dialog open={open} onClose={onCancel} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Centered Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg w-[400px] relative font-poppins">
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
          <Dialog.Title className="font-poppins text-xl font-bold text-center bg-gradient-to-r from-[#4E1C8B] to-[#8730F1] bg-clip-text text-transparent mb-4">
            Confirm Delete
          </Dialog.Title>
          <Dialog.Description className="font-poppins text-center text-gray-700 mb-6">
            Are you sure you want to delete this sprint?
          </Dialog.Description>
          <div className="flex justify-center gap-4">
            <button
              onClick={onConfirm}
              className="font-semibold border border-[#7825D1] bg-[#7947F5] hover:opacity-90 text-white font-poppins px-8 py-1 rounded-lg shadow"
            >
              Delete
            </button>
            <button
              onClick={onCancel}
              className="border border-[#BBB4B4] font-semibold text-[#6838DE] hover:bg-gray-100 font-poppins px-8 py-1 rounded-lg shadow"
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
