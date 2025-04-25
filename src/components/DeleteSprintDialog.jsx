import { Dialog } from "@headlessui/react";

export default function DeleteSprintDialog({ onConfirm, onCancel }) {
  return (
    <Dialog open={true} onClose={onCancel} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Delete this sprint?</h2>
          <div className="flex justify-end gap-4">
            <button onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
