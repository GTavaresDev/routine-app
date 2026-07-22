export default function Dashbaord() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full p-6 border border-[var(--border-bordas)] rounded-lg shadow-sm bg-[var(--bg-cards)]">
        <h1 className="text-xl font-bold mb-2">routine-app</h1>
        <p className="text-sm text-[var(--text-texto-secundario)] mb-4">
          App para controle de suas atividades e rotina.
        </p>
        <div className="text-xs text-white bg-slate-500 dark:bg-slate-800 p-3 rounded font-mono">
          Bem vindo
        </div>
      </div>
    </main>
  );
}
