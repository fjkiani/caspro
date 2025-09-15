import React from 'react';
import { ShieldCheck, Fingerprint } from 'lucide-react';

export type IdentityIntegrationsProps = {
  auth0: { title: string; text: string; logo?: React.ReactNode };
  blockchain: { title: string; text: string; icon?: React.ReactNode };
  strategic?: { title: string; points: { icon?: React.ReactNode; title: string; text: string }[] };
  className?: string;
};

const Card: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="flex flex-col items-center space-y-2 p-6 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
    <div className="text-4xl">{icon}</div>
    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h3>
    <p className="text-slate-600 dark:text-slate-300 max-w-xs">{text}</p>
  </div>
);

const IdentityIntegrations: React.FC<IdentityIntegrationsProps> = ({ auth0, blockchain, strategic, className = '' }) => (
  <section className={className}>
    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-8">
      <Card icon={auth0.logo || <div className="p-3 bg-white rounded-lg border border-orange-500/30"><span className="text-orange-500 font-bold">Auth0</span></div>} title={auth0.title} text={auth0.text} />
      <div className="text-4xl text-slate-400">+</div>
      <Card icon={blockchain.icon || <Fingerprint className="text-teal-400" />} title={blockchain.title} text={blockchain.text} />
    </div>
    {strategic && (
      <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-purple-200 dark:border-purple-500/50">
        <h3 className="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-400 mb-4">{strategic.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {strategic.points.map((p, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="text-purple-500">{p.icon || <ShieldCheck className="w-5 h-5" />}</div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">{p.title}</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">{p.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </section>
);

export default IdentityIntegrations; 