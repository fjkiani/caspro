import React, { Suspense, isValidElement } from 'react';

interface CustomReactContentProps {
  data: {
    component?: any;
    importer?: () => Promise<{ default: React.ComponentType<any> } | any>;
  };
  layout?: string;
}

const CustomReactContent: React.FC<CustomReactContentProps> = ({ data }) => {
  const { component: MaybeComponent, importer } = data;

  if (importer) {
    const LazyComp = React.lazy(async () => {
      const mod = await importer();
      const Comp = (mod && (mod.default || mod)) as React.ComponentType<any>;
      return { default: Comp };
    });
    return (
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-slate-400">Loading…</div>}>
        <LazyComp />
      </Suspense>
    );
  }

  // Eager path: handle module object vs component function vs element
  const Resolved = (MaybeComponent && (MaybeComponent.default || MaybeComponent)) as any;

  if (!Resolved) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl mb-4">🤷‍♂️ No component found</h2>
          <p>Provide a component or importer to render</p>
        </div>
      </div>
    );
  }

  if (isValidElement(Resolved)) {
    return Resolved as React.ReactElement;
  }

  return <Resolved />;
};

export default CustomReactContent; 