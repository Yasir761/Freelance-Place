const TableLoadingPlaceholder = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-6 ">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 mt-3 mb-6 rounded"></div>
        {Array(3)
          .fill(0)
          .map((row) => (
            <div key={row} className="h-4 flex justify-between gap-2 mb-6 rounded">
              {[1, 2, 3, 4, 5].map((col) => (
                  <span key={col} className="inline-block w-40 h-5 bg-gray-300 animate-pulse rounded"></span>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TableLoadingPlaceholder;
