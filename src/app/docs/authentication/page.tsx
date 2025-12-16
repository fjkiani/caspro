export default function AuthenticationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Authentication</h1>
        <p className="text-xl text-slate-400">
          Learn how to authenticate your API requests
        </p>
      </div>

      <div className="space-y-6">
        <section className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">API Key Authentication</h2>
          <p className="text-slate-300 mb-4">
            All API requests require authentication using a Bearer token in the Authorization header.
          </p>
          <div className="p-4 bg-slate-900 rounded-lg">
            <pre className="text-sm text-slate-300">
{`Authorization: Bearer YOUR_API_KEY`}
            </pre>
          </div>
        </section>

        <section className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Getting Your API Key</h2>
          <ol className="list-decimal list-inside space-y-3 text-slate-300">
            <li>Sign up for a CrisPRO.ai account</li>
            <li>Navigate to your dashboard</li>
            <li>Generate a new API key</li>
            <li>Copy and securely store your key</li>
          </ol>
        </section>

        <section className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Example Request</h2>
          <div className="p-4 bg-slate-900 rounded-lg overflow-x-auto">
            <pre className="text-sm text-slate-300">
{`curl -X POST https://api.crispro.ai/predict_variant_impact \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "task": "predict_variant_impact",
    "variant": "chr17:43044295:A>T"
  }'`}
            </pre>
          </div>
        </section>

        <section className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Security Best Practices</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Never commit API keys to version control</li>
            <li>Use environment variables to store keys</li>
            <li>Rotate keys regularly</li>
            <li>Use different keys for development and production</li>
          </ul>
        </section>
      </div>
    </div>
  );
}



