import { useState } from "react";
import { Globe, ExternalLink, Info, X, ArrowLeft, ArrowRight } from "lucide-react";

// Datos de los objetivos con colores específicos para cada ODS
const objectives = [
  {
    id: 1,
    title: "Fin de la pobreza",
    description: "Erradicar la pobreza en todas sus formas en todo el mundo.",
    link: "https://www.un.org/sustainabledevelopment/poverty/",
    color: "bg-red-700",
    textColor: "text-red-200",
    borderColor: "border-red-600",
    gradient: "from-red-900 to-red-700",
    icon: "💰"
  },
  {
    id: 2,
    title: "Hambre cero",
    description: "Poner fin al hambre, lograr la seguridad alimentaria y promover la agricultura sostenible.",
    link: "https://www.un.org/sustainabledevelopment/hunger/",
    color: "bg-amber-700",
    textColor: "text-amber-200",
    borderColor: "border-amber-600",
    gradient: "from-amber-900 to-amber-700",
    icon: "🌾"
  },
  {
    id: 3, 
    title: "Salud y bienestar",
    description: "Garantizar una vida sana y promover el bienestar para todos en todas las edades.",
    link: "https://www.un.org/sustainabledevelopment/health/",
    color: "bg-green-700",
    textColor: "text-green-200",
    borderColor: "border-green-600",
    gradient: "from-green-900 to-green-700",
    icon: "❤️"
  },
  {
    id: 4,
    title: "Educación de calidad",
    description: "La educación es la base para mejorar nuestra vida y el desarrollo sostenible.",
    link: "https://www.un.org/sustainabledevelopment/education/",
    color: "bg-rose-700",
    textColor: "text-rose-200",
    borderColor: "border-rose-600",
    gradient: "from-rose-900 to-rose-700",
    icon: "📚"
  },
  {
    id: 5,
    title: "Igualdad de género",
    description: "La igualdad entre los géneros es fundamental para conseguir un mundo pacífico, próspero y sostenible.",
    link: "https://www.un.org/sustainabledevelopment/gender-equality/",
    color: "bg-orange-700",
    textColor: "text-orange-200",
    borderColor: "border-orange-600",
    gradient: "from-orange-900 to-orange-700",
    icon: "⚖️"
  },
  {
    id: 6,
    title: "Agua limpia y saneamiento",
    description: "El agua libre de impurezas y accesible para todos es parte esencial del mundo en que queremos vivir.",
    link: "https://www.un.org/sustainabledevelopment/water-and-sanitation/",
    color: "bg-blue-700",
    textColor: "text-blue-200",
    borderColor: "border-blue-600",
    gradient: "from-blue-900 to-blue-700",
    icon: "💧"
  },
  {
    id: 7,
    title: "Energía asequible y no contaminante",
    description: "El acceso a una energía asequible, segura, sostenible y moderna para todos.",
    link: "https://www.un.org/sustainabledevelopment/energy/",
    color: "bg-yellow-700",
    textColor: "text-yellow-200",
    borderColor: "border-yellow-600",
    gradient: "from-yellow-900 to-yellow-700",
    icon: "⚡"
  },
  {
    id: 8,
    title: "Trabajo decente y crecimiento económico",
    description: "Promover el crecimiento económico inclusivo y sostenible, el empleo y el trabajo decente para todos.",
    link: "https://www.un.org/sustainabledevelopment/economic-growth/",
    color: "bg-purple-700",
    textColor: "text-purple-200",
    borderColor: "border-purple-600",
    gradient: "from-purple-900 to-purple-700",
    icon: "📈"
  },
  {
    id: 9,
    title: "Industria, innovación e infraestructuras",
    description: "Construir infraestructuras resilientes, promover la industrialización sostenible y fomentar la innovación.",
    link: "https://www.un.org/sustainabledevelopment/infrastructure-industrialization/",
    color: "bg-indigo-700",
    textColor: "text-indigo-200",
    borderColor: "border-indigo-600",
    gradient: "from-indigo-900 to-indigo-700",
    icon: "🏭"
  },
  {
    id: 10,
    title: "Reducción de las desigualdades",
    description: "Reducir la desigualdad en y entre los países para un desarrollo social y económico sostenible.",
    link: "https://www.un.org/sustainabledevelopment/inequality/",
    color: "bg-pink-700",
    textColor: "text-pink-200",
    borderColor: "border-pink-600",
    gradient: "from-pink-900 to-pink-700",
    icon: "🤝"
  },
  {
    id: 11,
    title: "Ciudades y comunidades sostenibles",
    description: "Lograr que las ciudades sean más inclusivas, seguras, resilientes y sostenibles.",
    link: "https://www.un.org/sustainabledevelopment/cities/",
    color: "bg-amber-700",
    textColor: "text-amber-200",
    borderColor: "border-amber-600",
    gradient: "from-amber-900 to-amber-700",
    icon: "🏙️"
  },
  {
    id: 12,
    title: "Producción y consumo responsables",
    description: "Garantizar modalidades de consumo y producción sostenibles para el futuro del planeta.",
    link: "https://www.un.org/sustainabledevelopment/sustainable-consumption-production/",
    color: "bg-emerald-700",
    textColor: "text-emerald-200",
    borderColor: "border-emerald-600",
    gradient: "from-emerald-900 to-emerald-700",
    icon: "♻️"
  },
  {
    id: 13,
    title: "Acción por el clima",
    description: "Adoptar medidas urgentes para combatir el cambio climático y sus efectos.",
    link: "https://www.un.org/sustainabledevelopment/climate-change/",
    color: "bg-teal-700",
    textColor: "text-teal-200",
    borderColor: "border-teal-600",
    gradient: "from-teal-900 to-teal-700",
    icon: "🌍"
  },
  {
    id: 14,
    title: "Vida submarina",
    description: "Conservar y utilizar de forma sostenible los océanos, los mares y los recursos marinos.",
    link: "https://www.un.org/sustainabledevelopment/oceans/",
    color: "bg-cyan-700",
    textColor: "text-cyan-200",
    borderColor: "border-cyan-600",
    gradient: "from-cyan-900 to-cyan-700",
    icon: "🐋"
  },
  {
    id: 15,
    title: "Vida de ecosistemas terrestres",
    description: "Gestionar sosteniblemente los bosques, luchar contra la desertificación y detener la pérdida de biodiversidad.",
    link: "https://www.un.org/sustainabledevelopment/biodiversity/",
    color: "bg-lime-700",
    textColor: "text-lime-200",
    borderColor: "border-lime-600",
    gradient: "from-lime-900 to-lime-700",
    icon: "🌳"
  },
  {
    id: 16,
    title: "Paz, justicia e instituciones sólidas",
    description: "Promover sociedades justas, pacíficas e inclusivas para el desarrollo sostenible.",
    link: "https://www.un.org/sustainabledevelopment/peace-justice/",
    color: "bg-blue-700",
    textColor: "text-blue-200",
    borderColor: "border-blue-600",
    gradient: "from-blue-900 to-blue-700",
    icon: "☮️"
  },
  {
    id: 17,
    title: "Alianzas para lograr los objetivos",
    description: "Revitalizar la Alianza Mundial para el Desarrollo Sostenible.",
    link: "https://www.un.org/sustainabledevelopment/globalpartnerships/",
    color: "bg-violet-700",
    textColor: "text-violet-200",
    borderColor: "border-violet-600",
    gradient: "from-violet-900 to-violet-700",
    icon: "🤲"
  },
];

const ObjetivosDesarrolloSostenible = () => {
  const [selectedObjective, setSelectedObjective] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const objectivesPerPage = 6;

  // Calcular el índice inicial y final de los objetivos a mostrar
  const indexOfLastObjective = currentPage * objectivesPerPage;
  const indexOfFirstObjective = indexOfLastObjective - objectivesPerPage;
  const currentObjectives = objectives.slice(indexOfFirstObjective, indexOfLastObjective);
  
  // Calcular el número total de páginas
  const totalPages = Math.ceil(objectives.length / objectivesPerPage);

  const openModal = (objective) => {
    setSelectedObjective(objective);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleExternalLink = (e, url) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 relative overflow-x-hidden">
      {/* Partículas de fondo (simuladas con elementos fijos) */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`
            }}
          />
        ))}
      </div>
      
      {/* Encabezado */}
      <div className="container mx-auto z-10 relative">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 shadow-lg">
              <Globe className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 mb-6">
            Objetivos de Desarrollo Sostenible
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Los 17 Objetivos de Desarrollo Sostenible (ODS) de la ONU representan un llamado universal 
            a la acción para poner fin a la pobreza, proteger el planeta y mejorar las vidas 
            y las perspectivas de las personas en todo el mundo.
          </p>
        </div>

        {/* Filtros (versión simplificada) */}
        <div className="mb-12 flex justify-center">
          <button 
            className={`px-6 py-3 rounded-full transition-all duration-300 font-medium mx-2 
            ${filter === "todos" ? "bg-teal-600 text-white shadow-lg" : "bg-gray-700 hover:bg-gray-600 text-gray-300"}`}
            onClick={() => setFilter("todos")}
          >
            Todos los ODS
          </button>
        </div>

        {/* Tarjetas de objetivos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentObjectives.map((objective) => (
            <div 
              key={objective.id}
              onClick={() => openModal(objective)}
              className={`rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer bg-gradient-to-br ${objective.gradient} border-2 ${objective.borderColor}`}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{objective.icon}</div>
                  <h3 className="text-xl font-bold">
                    Objetivo {objective.id}
                  </h3>
                </div>
                
                <h4 className="text-lg font-semibold mb-3">{objective.title}</h4>
                <p className="text-sm opacity-90 mb-6 line-clamp-3">{objective.description}</p>
                
                <div className="flex justify-between items-center">
                  <button 
                    className="flex items-center text-sm font-medium bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(objective);
                    }}
                  >
                    <Info className="w-4 h-4 mr-1" />
                    Más información
                  </button>
                  
                  <button
                    className="flex items-center text-sm font-medium bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors"
                    onClick={(e) => handleExternalLink(e, objective.link)}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Sitio web
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Paginación */}
        <div className="flex justify-center mt-12 space-x-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-gray-300">{currentPage}</span>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-300">{totalPages}</span>
          </div>
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Llamada a la acción */}
      </div>
       {/* Footer */}
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

      {/* Modal detallado */}
      {modalOpen && selectedObjective && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div 
            className={`bg-gradient-to-br ${selectedObjective.gradient} max-w-2xl w-full rounded-xl shadow-2xl overflow-hidden relative animate-fadeIn`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 transition-colors"
              onClick={closeModal}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <div className="p-8">
              <div className="flex items-center mb-6">
                <span className="text-5xl mr-4">{selectedObjective.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Objetivo {selectedObjective.id}: {selectedObjective.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-lg mb-8 text-white/90">{selectedObjective.description}</p>
              
              <div className="bg-black bg-opacity-20 p-5 rounded-lg mb-8">
                <h4 className="font-semibold mb-3 text-white">Metas importantes:</h4>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    <span>Implementar medidas específicas para {selectedObjective.id < 10 ? "abordar" : "promover"} este objetivo a nivel nacional.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    <span>Desarrollar políticas coherentes para el desarrollo sostenible.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    <span>Asegurar la movilización de recursos desde múltiples fuentes.</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={selectedObjective.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white text-gray-800 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg text-center flex items-center justify-center transition-colors"
                  onClick={(e) => handleExternalLink(e, selectedObjective.link)}
                >
                  Sitio oficial ONU
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
                
                <button 
                  className="flex-1 bg-black bg-opacity-30 hover:bg-opacity-40 text-white py-3 px-6 rounded-lg text-center flex items-center justify-center transition-colors"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos adicionales */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ObjetivosDesarrolloSostenible;