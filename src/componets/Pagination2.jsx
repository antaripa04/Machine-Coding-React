import { useEffect, useState } from "react";

export const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(50);

  const fetchProducts = async (limitVal, skipVal) => {
    console.log("here");

    try {
      const res = await fetch(`https://dummyjson.com/products?limit=${limitVal}&skip=${skipVal}`);
      const data = await res.json();
      setProducts(data.products);
      setTotal(data.total);
      setSkip(data.skip);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handlePageChange = (page) => {
    const newSkip = (page - 1) * limitPerPage;
    setSkip(newSkip);
  };

  const handleLimitChange = (e) => {
    setLimitPerPage(parseInt(e.target.value));
    setSkip(0);
  };

  const totalNoPage = Math.ceil(total / limitPerPage);
  const currentPage = Math.floor(skip / limitPerPage) + 1;
  useEffect(() => {
    fetchProducts(limitPerPage, skip);
  }, [skip, limitPerPage]);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Products</h2>
        <select name="limitPerPage" id="limitPerPage" onChange={handleLimitChange} value={limitPerPage}>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="150">150</option>
        </select>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <li key={product.id} className="p-4 bg-gray-100 rounded shadow">
            <p>
              {product.id} {product.title}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex justify-end items-center gap-2">
        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="cursor-pointer font-bold disabled:cursor-not-allowed">
          &lt;&lt;
        </button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="cursor-pointer font-bold disabled:cursor-not-allowed">
          &lt;
        </button>
        <p>
          Page {currentPage} of {totalNoPage}
        </p>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalNoPage} className="cursor-pointer font-bold disabled:cursor-not-allowed">
          &gt;
        </button>

        <button onClick={() => handlePageChange(totalNoPage)} disabled={currentPage === totalNoPage} className="cursor-pointer font-bold disabled:cursor-not-allowed">
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};
