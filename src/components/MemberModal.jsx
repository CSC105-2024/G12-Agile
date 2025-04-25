import { useEffect, useState } from "react";

const MemberModal = ({ open, onClose, members, setMembers }) => {
  const [tempMembers, setTempMembers] = useState([]);

  useEffect(() => {
    if (open) {
      setTempMembers(members);
    }
  }, [open, members]);

  const handleAdd = () => {
    const input = document.getElementById("newMemberInput");
    const newMember = input ? input.value.trim() : "";
    if (newMember && !tempMembers.includes(newMember)) {
      setTempMembers([...tempMembers, newMember]);
      input.value = "";
    }
  };

  const handleRemove = (member) => {
    setTempMembers(tempMembers.filter((m) => m !== member));
  };

  const handleSave = () => {
    setMembers(tempMembers);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-[500px] max-h-[80vh] overflow-y-auto shadow-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        <h2 className="text-xl font-bold text-center font-poppins bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent mb-6">
          Team Members
        </h2>

        <div className="flex gap-2">
          <input type="text" id="newMemberInput" placeholder="Add member" className="text-gray-600 flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500" />
          <button onClick={handleAdd} className="bg-gradient-to-r from-[#3F2B96] to-[#A044FF] text-white px-4 py-1 rounded-lg font-semibold font-poppins hover:opacity-90">
            Add
          </button>
        </div>

        <ul className="space-y-2 mt-4 font-poppins text-gray-600 text-sm">
          {tempMembers.map((member, idx) => (
            <li key={idx} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md">
              <span>{member}</span>
              <button onClick={() => handleRemove(member)} className="text-gray-500 hover:text-gray-700 text-lg">&times;</button>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-end gap-3">
          <button className="font-semibold border border-[#7825D1] bg-[#7947F5] hover:opacity-90 text-white font-poppins px-8 py-1 rounded-lg shadow" onClick={handleSave}>
            Save
          </button>
          <button onClick={handleCancel} className="border border-[#BBB4B4] font-semibold text-[#6838DE] hover:bg-gray-100 font-poppins px-8 py-1 rounded-lg shadow">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
