import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Activity } from 'lucide-react';

export default function PredictResistancePlaceholder() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/products" className="hover:text-blue-600 transition-colors">
              Products
            </Link>
            <span>/</span>
            <Link href="/products/oncology" className="hover:text-blue-600 transition-colors">
              Oncology
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Predict Resistance</span>
          </div>
        </nav>
        
        {/* Back Button */}
        <Link
          href="/products/oncology"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Oncology</span>
        </Link>
        
        {/* Coming Soon Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Predict Resistance Before It Happens
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              3-6 Weeks Early Detection
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 mb-8 border border-orange-200">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-orange-900">Coming Soon</h2>
            </div>
            <p className="text-slate-700 text-lg mb-4">
              We're building the first system that can predict treatment resistance 3-6 weeks earlier than imaging.
            </p>
            <div className="bg-white rounded-lg p-6 text-left max-w-2xl mx-auto">
              <h3 className="font-semibold text-slate-900 mb-3">What's Coming:</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>CA-125 Intelligence:</strong> Kinetics forecasting enables early intervention before treatment failure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Proactive Detection:</strong> 3-6 weeks faster than traditional imaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Early Intervention:</strong> Preserve therapeutic windows and prevent treatment failures</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-sm text-slate-500">
            <p>This capability is currently in development. Check back soon for updates!</p>
          </div>
        </div>
      </div>
    </main>
  );
}
