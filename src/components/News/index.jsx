import { useEffect, useState } from "react";
import { Newspaper, AlertCircle, ExternalLink, Loader } from "lucide-react";

export default function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            const url = 'https://climate-news-feed.p.rapidapi.com/';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '142eacc64dmsh675b7f473e8df77p1c8dd8jsn01f8fa70ad9d',
                    'x-rapidapi-host': 'climate-news-feed.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                
                const result = await response.json();
                setNews(result.articles || []);
            } catch (error) {
                console.error("Error al obtener noticias:", error);
                setError("No pudimos cargar las noticias. Por favor, intenta más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        if (!dateString) return "Fecha no disponible";
        
        try {
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            };
            return new Date(dateString).toLocaleDateString('es-ES', options);
        } catch {
            return "Fecha no disponible";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 text-gray-100 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="flex justify-center mb-4">
                        <Newspaper className="h-12 w-12 text-amber-400" />
                    </div>
                    <h2 className="text-4xl font-bold text-amber-300 mb-4">Últimas Noticias Climáticas</h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Mantente informado sobre los avances, desafíos y acontecimientos relacionados con el cambio climático y la sostenibilidad.
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Loader className="h-12 w-12 text-amber-400 animate-spin mb-4" />
                        <p className="text-xl text-gray-300">Cargando las últimas noticias...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-900 bg-opacity-30 rounded-lg p-6 flex items-center max-w-3xl mx-auto">
                        <AlertCircle className="h-8 w-8 text-red-400 mr-4 flex-shrink-0" />
                        <p className="text-red-200">{error}</p>
                    </div>
                )}

                {/* News Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.length > 0 ? (
                            news.map((article, index) => (
                                <div 
                                    key={index} 
                                    className="bg-slate-700 bg-opacity-50 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl"
                                >
                                    {article.thumbnail ? (
                                        <div className="relative h-48 overflow-hidden">
                                            <img 
                                                src={article.thumbnail} 
                                                alt={article.title} 
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "/api/placeholder/400/320";
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70"></div>
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-gradient-to-r from-amber-900 to-amber-800 flex items-center justify-center">
                                            <Newspaper className="h-16 w-16 text-amber-300 opacity-50" />
                                        </div>
                                    )}
                                    
                                    <div className="p-6">
                                        <div className="flex items-center mb-3">
                                            <span className="bg-amber-800 text-amber-200 text-xs font-medium px-2.5 py-0.5 rounded">
                                                {article.source?.name || "Noticia Climática"}
                                            </span>
                                            <span className="ml-auto text-xs text-gray-400">
                                                {formatDate(article.published)}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-gray-100 mb-3 line-clamp-2">
                                            {article.title}
                                        </h3>
                                        
                                        <a 
                                            href={article.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-amber-400 hover:text-amber-300 font-medium"
                                        >
                                            Leer artículo completo
                                            <ExternalLink className="ml-1 h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-xl text-gray-300">No hay noticias disponibles en este momento</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Newsletter Subscription */}
                <footer  className="bg-slate-900/80 border-t border-slate-800 py-10 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                EcoSoluciones ODS
              </h3>
              <p className="text-gray-400 max-w-md">
                Promoviendo prácticas sostenibles para alcanzar los Objetivos de Desarrollo Sostenible 2030.
              </p>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm border-t border-slate-800 pt-6">
            <p>© {new Date().getFullYear()} EcoSoluciones. Todos los derechos reservados.</p>
            <p className="mt-1">
              Desarrollado con 💚 para un futuro más sostenible
            </p>
          </div>
        </div>
      </footer>
            </div>
        </div>
    );
}