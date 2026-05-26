import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../services/api';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    maxPrice: 5000,
    minRating: 0,
    sort: 'default',
    search: '',
  });

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        category: filters.category !== 'all' ? filters.category : undefined,
        maxPrice: filters.maxPrice < 5000 ? filters.maxPrice : undefined,
        minRating: filters.minRating > 0 ? filters.minRating : undefined,
        sort: filters.sort !== 'default' ? filters.sort : undefined,
        search: filters.search || undefined,
      };
      const { data } = await fetchProducts(params);
      setProducts(data.data);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  const updateFilter = (key, value) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const resetFilters = () =>
    setFilters({ category: 'all', maxPrice: 5000, minRating: 0, sort: 'default', search: '' });

  return { products, loading, error, filters, updateFilter, resetFilters };
};

export default useProducts;
