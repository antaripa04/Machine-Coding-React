import { useCallback, useEffect, useState } from "react";
import "./InfiniteScroll.css";
const THRESHOLD = 20;
export const InfiniteScroll = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchProducts = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      //   console.log({ page });

      const res = await fetch(`https://dummyjson.com/products?limit=25&skip=${(page - 1) * 25}`);
      const data = await res.json();
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      if (page === 1) setTotalPage(Math.ceil(data.total / 25));
      setPage((prevPage) => prevPage + 1);

      //   setTotal(data.total);
      //   setSkip(data.skip);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  }, [loading, page]);

  useEffect(() => {
    console.log("in useEffect");
    fetchProducts();
  }, []);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;
    const scrollHeight = e.target.scrollHeight;
    const remainingScroll = scrollHeight - (scrollTop + clientHeight);

    if (!loading && page <= totalPage && remainingScroll < THRESHOLD) {
      console.log({ page });
      fetchProducts();
    }
  };

  return (
    <div onScroll={handleScroll} className="h-screen overflow-y-auto no-scrollbar ">
      {products.map((product) => (
        <div key={product.id} className="text-center mb-3 py-3 px-2 rounded-2xl bg-gray-100 font-bold">
          {product.id}. {product.title}
        </div>
      ))}
      {loading && (
        <div class="flex space-x-2 justify-center items-center bg-white ">
          <span class="sr-only">Loading...</span>
          <div class="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div class="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div class="h-2 w-2 bg-black rounded-full animate-bounce"></div>
        </div>
      )}
      {error && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
          <span className="font-medium">{error}</span>
        </div>
      )}
    </div>
  );
};
