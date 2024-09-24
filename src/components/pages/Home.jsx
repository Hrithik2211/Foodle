import React, { useEffect, useState } from 'react';
import {
  fetchProductsByCategory,
  searchProductsByName,
  fetchCategories,
} from '../../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState(''); 
  const [sortDirection, setSortDirection] = useState(''); 
  const productsPerPage = 6;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('cakes');

  const hardcodedCategories = [
    'Category',
    'Biscuits',
    'Cakes',
    'Drink',
    'Snacks',
    'Sweet Snacks',
    'Biscuits and Cakes',
    'Biscuits and Crackers',
  ];

  useEffect(() => {
    setCategories(hardcodedCategories);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = searchQuery
          ? await searchProductsByName(searchQuery)
          : await fetchProductsByCategory(selectedCategory);
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchQuery, selectedCategory]);

  
  useEffect(() => {
    if (sortOption) {
      const sortedProducts = [...products];
      if (sortOption === 'name') {
        sortedProducts.sort((a, b) => {
          const nameA = a.product_name?.toLowerCase() || '';
          const nameB = b.product_name?.toLowerCase() || '';
          if (sortDirection === 'asc') {
            return nameA.localeCompare(nameB);
          } else {
            return nameB.localeCompare(nameA);
          }
        });
      } else if (sortOption === 'nutrition_grade') {
        sortedProducts.sort((a, b) => {
          const gradeA = a.nutrition_grades || '';
          const gradeB = b.nutrition_grades || '';
          if (sortDirection === 'asc') {
            return gradeA.localeCompare(gradeB);
          } else {
            return gradeB.localeCompare(gradeA);
          }
        });
      }
      setProducts(sortedProducts);
    }
  }, [sortOption, sortDirection, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleNextPage = () => {
    if (indexOfLastProduct < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <input
        type="text"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 mr-8 p-2 border border-gray-300 rounded w-full max-w-md"
      />

      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
      >
        {categories.length > 0 ? (
          categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))
        ) : (
          <option disabled>No categories available</option>
        )}
      </select>

      <div className="mb-4 flex gap-4">
        
        <select
          value={sortOption === 'name' ? sortDirection : ''}
          onChange={(e) => {
            setSortOption('name');
            setSortDirection(e.target.value);
          }}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Sort by Name</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        
        <select
          value={sortOption === 'nutrition_grade' ? sortDirection : ''}
          onChange={(e) => {
            setSortOption('nutrition_grade');
            setSortDirection(e.target.value);
          }}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Sort by Nutrition Grade</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : currentProducts.length ? (
        <>
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-400 text-gray-800 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={indexOfLastProduct >= products.length}
              className="px-4 py-2 bg-blue-400 text-gray-800 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {currentProducts.map((product) => (
              <Link
                key={product.code}
                to={`/product/${product.code}`}
                className="block bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 mx-auto"
                style={{ width: '300px', height: '400px' }} 
              >
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Image not available</span>
                  </div>
                )}
                <div className="p-4 h-32 flex flex-col justify-between">
                  <h3 className="text-lg font-bold text-gray-800">
                    {product.product_name || 'Unnamed Product'}
                  </h3>
                  {product.nutrition_grades && (
                    <p className="text-gray-600">
                      Nutrition Grade: {product.nutrition_grades}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default Home;
