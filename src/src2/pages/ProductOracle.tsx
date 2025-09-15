import React from 'react';
import OracleProduct from '../components/site/OracleProduct';
import AccessibilityToggle from '../components/AccessibilityToggle';
import { adaptOracleContent } from '../data/adapters/oracleAdapter';

const ProductOracle: React.FC = () => {
  const content = adaptOracleContent();

  return (
    <>
      <AccessibilityToggle />
      <OracleProduct content={content} />
    </>
  );
};

export default ProductOracle; 
 
 

