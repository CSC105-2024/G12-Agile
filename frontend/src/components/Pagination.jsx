const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
      <div className="flex justify-center mt-9 space-x-2 font-poppins text-sm items-center mb-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-lg border border-gray-300 ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          Previous
        </button>
  
        {[...Array(totalPages)].map((_, page) => (
          <button
            key={page + 1}
            onClick={() => setCurrentPage(page + 1)}
            className={`w-8 h-8 rounded-lg border text-sm font-semibold ${
              page + 1 === currentPage
                ? "bg-[#6837DE] text-white border-[#6837DE]"
                : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page + 1}
          </button>
        ))}
  
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-lg border border-gray-300 ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  