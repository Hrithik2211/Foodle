
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductByBarcode } from '../../services/api';

const ProductDetail = () => {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductByBarcode(barcode);
        setProduct(data);
      } catch (error) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [barcode]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      {product ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            {product.product_name || 'Unnamed Product'}
          </h1>
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-90 h-64 object-cover mb-4"
            />
          )}
          <h2 className="text-xl font-semibold">Ingredients:</h2>
          <p>{product.ingredients_text || 'No ingredients available.'}</p>
          <h2 className="text-xl font-semibold mt-4">Nutrition:</h2>
          <ul>
            {product.nutriments ? (
              <>
                <li>Energy: {product.nutriments['energy']} kcal</li>
                <li>Fat: {product.nutriments['fat']} g</li>
                <li>Carbohydrates: {product.nutriments['carbohydrates']} g</li>
                <li>Proteins: {product.nutriments['proteins']} g</li>
              </>
            ) : (
              <li>No nutritional information available.</li>
            )}
          </ul>
          <h2 className="text-xl font-semibold mt-4">Labels:</h2>
          <p>
            {product.labels_tags && product.labels_tags.length > 0
              ? product.labels_tags.join(', ')
              : 'No labels available.'}
          </p>
        </>
      ) : (
        <p>No product details available.</p>
      )}
    </div>
  );
};

export default ProductDetail;
