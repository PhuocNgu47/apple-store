/**
 * Skeleton Component
 * Component skeleton loading với nhiều biến thể
 * Sử dụng react-loading-skeleton
 */

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * ProductCardSkeleton
 * Skeleton cho ProductCard
 */
export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      {/* Image skeleton */}
      <Skeleton height={224} borderRadius={16} />
      
      {/* Category skeleton */}
      <Skeleton width={80} height={12} />
      
      {/* Title skeleton */}
      <Skeleton height={20} count={2} />
      
      {/* Rating skeleton */}
      <Skeleton width={100} height={16} />
      
      {/* Price skeleton */}
      <Skeleton width={80} height={24} />
    </div>
  );
}

/**
 * ProductGridSkeleton
 * Skeleton cho grid sản phẩm
 */
export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

/**
 * ProductDetailSkeleton
 * Skeleton cho ProductDetail page
 */
export function ProductDetailSkeleton() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Image */}
        <div>
          <Skeleton height={500} borderRadius={16} />
          <div className="flex gap-4 mt-4">
            <Skeleton width={100} height={100} borderRadius={8} />
            <Skeleton width={100} height={100} borderRadius={8} />
            <Skeleton width={100} height={100} borderRadius={8} />
          </div>
        </div>
        
        {/* Right: Info */}
        <div className="space-y-6">
          <Skeleton width={200} height={12} />
          <Skeleton height={32} count={2} />
          <Skeleton width={150} height={40} />
          <Skeleton height={60} />
          <Skeleton width={100} height={20} />
          <Skeleton height={50} />
        </div>
      </div>
    </div>
  );
}

/**
 * CartItemSkeleton
 * Skeleton cho cart item
 */
export function CartItemSkeleton() {
  return (
    <div className="flex gap-4 pb-4 border-b">
      <Skeleton width={96} height={96} borderRadius={8} />
      <div className="flex-1 space-y-2">
        <Skeleton height={20} width="60%" />
        <Skeleton height={16} width="40%" />
        <Skeleton height={32} width={100} />
      </div>
    </div>
  );
}

/**
 * TextSkeleton
 * Skeleton cho text content
 */
export function TextSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={className}>
      <Skeleton height={20} count={lines} />
    </div>
  );
}

/**
 * TableSkeleton
 * Skeleton cho table
 */
export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} height={20} className="flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={colIndex} height={40} className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default {
  ProductCardSkeleton,
  ProductGridSkeleton,
  ProductDetailSkeleton,
  CartItemSkeleton,
  TextSkeleton,
  TableSkeleton
};

