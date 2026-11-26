import { parseCsvTable } from '@/lib/blog/notebooklm-adapters';

interface BlogNotebookDataTableProps {
  csv: string;
  title?: string;
}

export default function BlogNotebookDataTable({
  csv,
  title = 'Data table',
}: BlogNotebookDataTableProps) {
  const table = parseCsvTable(csv);
  if (!table) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-800/80">
            <tr>
              {table.headers.map((h) => (
                <th
                  key={h}
                  className="px-3 py-2 text-left font-semibold text-slate-700 dark:text-slate-200"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900/40">
            {table.rows.map((row, i) => (
              <tr key={i}>
                {table.headers.map((_, j) => (
                  <td key={j} className="px-3 py-2 text-slate-700 dark:text-slate-300">
                    {row[j] ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
