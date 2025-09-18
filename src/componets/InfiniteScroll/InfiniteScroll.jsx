import { useState, useEffect, useRef, useCallback } from "react";
import "./InfiniteScroll.css";

export const InfiniteScroll = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  // const refList = useRef([]);
  const refItemLast = useRef();

  const fetchProducts = useCallback(async () => {
    if (!hasMore || loading) return;
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/products?limit=25&skip=${(page - 1) * 25}`);
      const data = await res.json();
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(data.products.length > 0);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, page]);

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  // Observe last element after each data update
  useEffect(() => {
    if (!hasMore || !refItemLast.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.unobserve(entries[0].target);
        fetchProducts();
      }
      // console.log("Observed Element Text:", entries[0].target.textContent);
    });

    observer.observe(refItemLast.current);

    return () => observer.disconnect();
  }, [products, hasMore, fetchProducts]);

  return (
    <div>
      <h1>Infinite Scroll Demo</h1>
      {products.map((product, index) => {
        const isLastItem = index === products.length - 1;
        return (
          <div ref={isLastItem ? refItemLast : null} key={product.id} className="text-center mb-3 py-3 px-2 rounded-2xl bg-gray-100 font-bold">
            {product.id}. {product.title}
          </div>
        );
      })}

      {loading && (
        <div className="flex space-x-2 justify-center items-center bg-white ">
          <span className="sr-only">Loading...</span>
          <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
        </div>
      )}
      {error && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
          <span className="font-medium">{error}</span>
        </div>
      )}
      {!hasMore && <div className="text-center mt-2">No more items</div>}
    </div>
  );
};
export const InfiniteScrol2 = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // Fetch data from dummy API (JSONPlaceholder)
  const fetchItems = useCallback(async () => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      const newItems = await response.json();

      setItems((prevItems) => [...prevItems, ...newItems]);
      setHasMore(newItems.length > 0);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]);

  // Intersection Observer callback
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchItems();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchItems]
  );

  // Initial fetch
  useEffect(() => {
    fetchItems();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="infinite-scroll-container">
      <h1>Infinite Scroll Demo</h1>
      <div className="items-list">
        {items.map((item, index) => {
          if (items.length === index + 1) {
            return (
              <div ref={lastItemRef} key={item.id} className="item">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            );
          } else {
            return (
              <div key={item.id} className="item">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            );
          }
        })}
      </div>
      {loading && <div className="loading">Loading more items...</div>}
      {!hasMore && <div className="no-more">No more items to load</div>}
    </div>
  );
};
