import { useEffect, useState } from "react";

export function useProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {}, [id]);

  return { product, loading, error };
}
// Pakai di component:
function ProductDetails() {
  const { id } = useParams();
  const { product, loading, error } = useProductDetail(id);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  return <ProductDetailDisplay product={product} />;
}
