"use client";

import React from 'react';
import Link from 'next/link'; // Changed from react-router-dom

// Removed useEffect, useState, and getCategories import as data will be passed via props

const CategoriesWidget = ({ categories }) => { // Renamed component and receives categories as prop
  if (!categories || categories.length === 0) {
    return null; // Don't render if no categories
  }

  return (
    <div className="bg-slate-800/50 shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-slate-100 border-b border-slate-700 pb-4 mb-6">Categories</h3>
      <div className="space-y-3">
        {categories.map((category, index) => (
          <Link key={category.slug || index} href={`/blog/category/${category.slug}`} className="block text-slate-300 hover:text-primary transition duration-300">
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesWidget;
