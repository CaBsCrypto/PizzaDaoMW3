'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db as firestoreDb } from '@/lib/firebase'
import { useLang } from '@/context/LangContext'
import Link from 'next/link'

interface Submission {
  id: string
  artist_name: string
  youtube_url: string
  created_at: unknown
}

export default function VotarPage() {
  const { t } = useLang()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSubmissions() {
      console.log("VotarPage: Iniciando carga de canciones...")
      try {
        const q = query(collection(firestoreDb, 'submissions'), orderBy('created_at', 'desc'))
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Submission[]
        console.log(`VotarPage: ${data.length} canciones encontradas.`)
        setSubmissions(data)
      } catch (err: unknown) {
        console.error("VotarPage Error:", err)
        const error = err as Error;
        setError(`No se pudieron cargar las canciones: ${error.message || 'Error desconocido'}. Revisa la consola de Vercel.`)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  return (
    <main className="min-h-screen bg-[#1A1208] text-white p-6 sm:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <Link href="/" className="text-yellow-400 hover:text-yellow-300 transition-colors font-black flex items-center gap-2">
            ← {t.nav.home}
          </Link>
          <div className="bg-purple-600/20 border border-purple-500/30 rounded-full px-4 py-1">
            <span className="text-purple-400 font-black text-sm uppercase tracking-widest">Fase de Votaciones</span>
          </div>
        </header>

        <section className="text-center mb-16">
          <h1 className="text-5xl sm:text-7xl font-black mb-4">VOTACIONES</h1>
          <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto">
            Escucha las propuestas y elige tus favoritas para el primer álbum de PizzaDAO en Español.
          </p>
        </section>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin" />
            <p className="text-white/40 font-mono text-sm">Cargando canciones...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center">
            <p className="text-red-400 font-mono text-sm mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-6 py-2 rounded-full text-xs font-black transition-all"
            >
              REINTENTAR
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {submissions.map((sub) => (
              <div 
                key={sub.id} 
                className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-yellow-400/40 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    💿
                  </div>
                  <a 
                    href={sub.youtube_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-red-600/80 hover:bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full transition-colors"
                  >
                    VER EN YOUTUBE
                  </a>
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-yellow-400 transition-colors mb-1">
                  {sub.artist_name}
                </h3>
                <p className="text-white/40 text-xs font-mono">ID: {sub.id.slice(0, 8)}...</p>
                
                <button className="w-full mt-6 bg-white/10 hover:bg-yellow-400 hover:text-black text-white font-black py-3 rounded-2xl transition-all">
                  VOTAR
                </button>
              </div>
            ))}
            
            {submissions.length === 0 && (
              <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <p className="text-white/40">No hay canciones postuladas aún.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        main {
          background-image: radial-gradient(circle at top right, rgba(250,204,21,0.05) 0%, transparent 50%),
                            radial-gradient(circle at bottom left, rgba(168,85,247,0.05) 0%, transparent 50%);
        }
      `}</style>
    </main>
  )
}
