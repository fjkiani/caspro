import React from 'react';

type Role = { name: string; capabilities: string[] };

type Props = { roles: Role[]; className?: string; title?: string };

const RoleMatrix: React.FC<Props> = ({ roles, className, title = 'Role Matrix' }) => (
  <div className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 ${className || ''}`}>
    <div className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-slate-600 dark:text-slate-300">
            <th className="px-2 py-1">Role</th>
            <th className="px-2 py-1">Capabilities</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((r, i) => (
            <tr key={i} className="border-t border-slate-100 dark:border-slate-700">
              <td className="px-2 py-1 text-slate-800 dark:text-slate-100">{r.name}</td>
              <td className="px-2 py-1 text-slate-700 dark:text-slate-200">{r.capabilities.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RoleMatrix; 