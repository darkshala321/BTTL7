import React, { useState } from 'react';
import { product } from './components/data';
import Product from './components/Product';
import './App.css';

const App = () => {
  // Sử dụng React State để theo dõi trạng thái hiệu ứng
  const [zoomed, setZoomed] = useState(false);

  // Hàm xử lý sự kiện khi nhấp vào hình ảnh để thay đổi trạng thái hiệu ứng
  const handleImageClick = () => {
    setZoomed(!zoomed); // Thay đổi trạng thái
  };

  return (
    <div className='product-list'>
      {product.map((item) => (
        <Product key={item.id} product={item} />
      ))}
    </div>
  );
};

export default App;
