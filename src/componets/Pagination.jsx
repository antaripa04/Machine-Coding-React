import { useEffect, useState } from "react";

export const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(50); // default limit
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (skipVal, limitVal) => {
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/products?limit=${limitVal}&skip=${skipVal}`);
      const data = await res.json();
      setProducts(data.products);
      setTotal(data.total);
      setSkip(data.skip);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(skip, limitPerPage);
  }, [skip, limitPerPage]);

  const totalPages = Math.ceil(total / limitPerPage);
  const currentPage = Math.floor(skip / limitPerPage) + 1;

  const handlePageChange = (page) => {
    const newSkip = (page - 1) * limitPerPage;
    if (newSkip >= 0 && newSkip < total) {
      setSkip(newSkip);
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setLimitPerPage(newLimit);
    setSkip(0); // Reset to first page when limit changes
  };

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    pages.push(1); // Always show first page

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages); // Always show last page
    }

    return pages;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Products</h2>
        <div>
          <label className="mr-2 font-medium">Items per page:</label>
          <select value={limitPerPage} onChange={handleLimitChange} className="px-2 py-1 border rounded">
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={150}>150</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <li key={product.id} className="p-4 bg-gray-100 rounded shadow">
              <p>{product.title}</p>
            </li>
          ))}
        </ul>
      )}
      {/* Pagination Controls */}
      <div className="mt-6 flex justify-end items-center gap-1">
        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="p-0.5 rounded disabled:opacity-50 cursor-pointer disabled:cursor-default">
          ⏮
        </button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-0.5  rounded disabled:opacity-50 cursor-pointer disabled:cursor-default">
          ◀
        </button>
        {/* <span>
          Page {currentPage} of {totalPages}
        </span> */}
        <div className="flex gap-1">
          {getPageNumbers().map((page, idx) => (
            <button
              key={idx}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              disabled={page === "..."}
              className={`px-2 py-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"} ${page === "..." ? "cursor-default" : "cursor-pointer"}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-0.5 rounded disabled:opacity-50 cursor-pointer disabled:cursor-default">
          ▶
        </button>
        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="p-0.5  rounded disabled:opacity-50 cursor-pointer disabled:cursor-default">
          ⏭
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
