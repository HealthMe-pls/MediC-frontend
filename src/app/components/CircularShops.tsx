// components/CircularShops.tsx
import React from 'react';
import styles from '../CircularShops.module.css';

interface CircularShopsProps {
  innerShopCount: number;
  outerShopCount: number;
}

const CircularShops: React.FC<CircularShopsProps> = ({ innerShopCount, outerShopCount }) => {
  const renderShops = (count: number, radius: number) => {
    const angleStep = (2 * Math.PI) / count;
    return Array.from({ length: count }).map((_, index) => {
      const angle = index * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      return (
        <div
          key={index}
          className={styles.shop}
          style={{
            transform: `translate(${x}px, ${y}px)`,
          }}
        >
          {index + 1}
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        {renderShops(innerShopCount, 100)} {/* Inner Circle Radius */}
      </div>
      <div className={styles.circle}>
        {renderShops(outerShopCount, 200)} {/* Outer Circle Radius */}
      </div>
    </div>
  );
};

export default CircularShops;
