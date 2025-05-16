import React, { useState, useEffect } from "react";
import { Search, Filter, ArrowUpRight, Heart, Share2, Bookmark, ChevronUp } from "lucide-react";

// Datos completos de prácticas sostenibles con URLs reales
const practices = [
  {
    category: "Alimentación Sostenible",
    items: [
      {
        title: "Huertos verticales",
        description: "Cultiva en espacios reducidos con botellas recicladas para producir tus propios alimentos",
        url: "https://www.portalfruticola.com/noticias/2025/05/05/huerto-vertical-guia/",
        image: "https://www.permacultura.org.mx/images/presentaciones/permacultura/claire-gregorys-permaculture-garden-1024x768.jpg",
        difficulty: "Fácil",
        time: "2-3 horas"
      },
      {
        title: "Composta comunitaria",
        description: "Organiza un sistema de compostaje vecinal para reducir residuos orgánicos",
        url: "https://concienciaverde.com.mx/2023/04/01/compostaje-comunitario-una-solucion-medio-ambiental/",
        image: "https://th.bing.com/th/id/OIP.F9FPWRquUREEcQecY1MTHgHaG4?rs=1&pid=ImgDetMain",
        difficulty: "Media",
        time: "Proyecto continuo"
      },
      {
        title: "Cultivo de hongos",
        description: "Analiza, diseña y desarrolla un cultivo de hongos comestibles en casa, considerando la temperatura, el tiempo y la acción de hongos y bacterias.",
        url: "https://nuevaescuelamexicana.sep.gob.mx/contenido/coleccion/cultivo-de-hongos-comestibles/",
        image: "https://th.bing.com/th/id/OIP.XuLCQgZVofMleOgWvFB0RQHaFW?rs=1&pid=ImgDetMain",
        difficulty: "Media",
        time: "2-4 semanas"
      },
      {
        title: "Jardinería de polinizadores",
        description: "Crea un jardín que atraiga abejas y mariposas para mejorar la biodiversidad local",
        url: "https://www.xerces.org/pollinator-conservation",
        image: "https://www.xerces.org/sites/default/files/styles/psge_banner/public/2019-08/Plains%20Coreopsis%202%20Jennifer%20Hopwood%20cropped%20for%20banner.jpg?itok=5LhK3xKV",
        difficulty: "Fácil",
        time: "1 semana"
      },
      {
        title: "Conservación de semillas",
        description: "Aprende a guardar semillas de tus propios cultivos para preservar variedades locales",
        url: "https://www.seedsavers.org/how-to-save-seeds",
        image: "https://seedsavers.org/wp-content/uploads/2023/08/SeedGarden_with-seal_web.jpg",
        difficulty: "Fácil",
        time: "Variable"
      }
    ]
  },
  {
    category: "Reciclaje Creativo",
    items: [
      {
        title: "Muebles con palets",
        description: "Crea muebles únicos y funcionales con palets reciclados",
        url: "https://www.instructables.com/Pallet-Projects/",
        image: "https://cdn.morningchores.com/wp-content/uploads/2016/06/122-DIY-Pallet-Projects.jpg",
        difficulty: "Media",
        time: "1-2 días"
      },
      // {
      //   title: "Cortinas con tapas",
      //   description: "Elabora cortinas decorativas con tapas de botellas recicladas",
      //   url: "https://www.upcyclethat.com/bottle-cap-curtain/",
      //   image: "/api/placeholder/400/320",
      //   difficulty: "Fácil",
      //   time: "4-6 horas"
      // },
      {
        title: "Ecoladrillos",
        description: "Convierte plásticos no reciclables en ladrillos para construcciones ecológicas",
        url: "https://www.ecobricks.org/how/",
        image: "https://th.bing.com/th/id/OIP.591f90HX6sQTiBBjeyz4aQHaE6?w=226&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        difficulty: "Fácil",
        time: "Proyecto continuo"
      },
      {
        title: "Arte con materiales desechados",
        description: "Transforma residuos en obras de arte y concientiza sobre el consumo",
        url: "https://reciclamas.com.mx/el-arte-del-reciclaje-transformar-residuos-en-obras-maestras-creativas/",
        image: "https://reciclamas.com.mx/wp-content/uploads/2023/08/6-1-1.jpg",
        difficulty: "Variable",
        time: "Variable"
      },
      {
        title: "Instrumentos musicales reciclados",
        description: "Fabrica instrumentos a partir de objetos cotidianos y desechos",
        url: "https://voltaris.es/instrumentos-musicales-con-material-reciclado/",
        image: "https://th.bing.com/th/id/R.81aa78999fd778cd2642b7b3849cc6ed?rik=e0HNbuEf%2bRPAJw&riu=http%3a%2f%2f2.bp.blogspot.com%2f-Gl3iYi0XYTs%2fUV64Z6UpJ-I%2fAAAAAAAAAI4%2fxNlJ3kvEX44%2fs1600%2fInstrumentos%2bReciclados-Reciclaed%2bInstruments%2bDRI.jpg&ehk=BOc%2bADkS8qN9AP7vfnGo8a2ZST63MHxLMDDpLv8PWIE%3d&risl=&pid=ImgRaw&r=0",
        difficulty: "Media",
        time: "3-5 horas"
      }
    ]
  },
  {
    category: "Energía Limpia",
    items: [
      {
        title: "Calentador solar",
        description: "Construye un calentador de agua con botellas PET para ahorrar gas o electricidad",
        url: "https://ecoinventos.com/calentador-casero-con-botellas-de-plastico/",
        image: "https://construyored.com/storage/noticias/images/large/KNAJPMCCWJ_20161125151253.jpg",
        difficulty: "Media",
        time: "1 día"
      },
      {
        title: "Cargador solar DIY",
        description: "Crea un cargador portátil con células fotovoltaicas para dispositivos electrónicos",
        url: "https://ecoinventos.com/como-hacer-cargador-solar-inalambrico/",
        image: "https://th.bing.com/th/id/OIP.yf04KAC-2-rMi7B3YFTOPQAAAA?rs=1&pid=ImgDetMain",
        difficulty: "Avanzada",
        time: "5-8 horas"
      },
      {
        title: "Cocina solar",
        description: "Construye un horno solar para cocinar sin combustibles fósiles",
        url: "https://www.notasnaturales.com/hornos-solares/",
        image: "https://th.bing.com/th/id/OIP.fe3NQpTzZMHoYyck5X8mLwHaEO?rs=1&pid=ImgDetMain",
        difficulty: "Media",
        time: "4-6 horas"
      },
      {
        title: "Iluminación con botellas de agua",
        description: "Instala botellas de agua como 'bombillas solares' para espacios sin electricidad",
        url: "https://ecoinventos.com/convertir-botellas-de-plastico-en-lamparas/",
        image: "https://i.pinimg.com/originals/37/1c/17/371c17689c65eaafbd5f2b8a77f3e1a5.png",
        difficulty: "Fácil",
        time: "1-2 horas"
      },
      {
        title: "Generador eólico casero",
        description: "Monta un pequeño generador eólico con materiales reciclados",
        url: "https://aerogeneradores-energia-eolica.blogspot.com/2024/12/mini-generador-eolico-casero-jca.html#:~:text=El%20canal%20JCA%20Ecosistemas%20ha%20realizado%20un%20tutorial,motor%20de%20bomba%20de%20agua%20de%20un%20lavarropas.",
        image: "https://educateaqui.online/wp-content/uploads/2023/03/Paso-a-Paso-de-Como-Hacer-un-Generador-en-Eolico-Casero.png",
        difficulty: "Avanzada",
        time: "2-3 días"
      }
    ]
  },
  {
    category: "Agua y Conservación",
    items: [
      {
        title: "Sistema de captación pluvial",
        description: "Recolecta agua de lluvia con materiales reciclados para riego y uso doméstico",
        url: "https://huertocasero.org/como-crear-un-sistema-de-captacion-de-agua-de-lluvia-con-materiales-reciclados",
        image: "https://th.bing.com/th/id/OIP.oGciW-2ECj1LR1JTg5pQIQHaEK?rs=1&pid=ImgDetMain",
        difficulty: "Media",
        time: "1-2 días"
      },
      {
        title: "Filtro de agua casero",
        description: "Construye un filtro con arena, grava y carbón activado para purificar agua",
        url: "https://www.ecologiaverde.com/como-hacer-un-filtro-de-agua-casero-para-beber-1123.html",
        image: "https://rebasando.com/images/bricolaje/reciclaje/filtro_casero3.jpg",
        difficulty: "Media",
        time: "3-4 horas"
      },
      {
        title: "Jardín de lluvia",
        description: "Diseña un área que absorba escorrentías de lluvia y reduzca inundaciones",
        url: "https://biblus.accasoftware.com/es/diseno-de-un-jardin-de-lluvia/",
        image: "https://www.bing.com/th/id/OIP.grDDip18MpLTHa2LUa3VfAHaHa?w=160&h=160&o=6&pid=Reference",
        difficulty: "Media",
        time: "1-2 días"
      },
      {
        title: "Sistema de riego por goteo",
        description: "Implementa un sistema eficiente que ahorra hasta 70% de agua en el jardín",
        url: "https://www.gob.mx/agricultura/es/articulos/maximizando-la-eficiencia-agricola-sistema-de-riego-por-goteo?idiom=es",
        image: "https://th.bing.com/th/id/R.bdc58bbaed0194eba7958d221281124f?rik=F%2boxxTNMesQtjA&pid=ImgRaw&r=0",
        difficulty: "Fácil",
        time: "3-4 horas"
      },
      {
        title: "Inodoro de compostaje",
        description: "Construye un sanitario ecológico que no requiere agua y genera compost",
        url: "hhttps://academia-lab.com/enciclopedia/inodoro-de-compostaje/",
        image: "https://th.bing.com/th/id/OIP.dLiRo1sPTLKh6kvuak0fMAHaHp?rs=1&pid=ImgDetMain",
        difficulty: "Avanzada",
        time: "2-3 días"
      }
    ]
  },
  {
    category: "Tecnología Verde",
    items: [
      {
        title: "Baterías de limón",
        description: "Genera energía con cítricos y metales para pequeños dispositivos",
        url: "https://anabarrero.es/como-generar-energia-electrica-con-limones/",
        image: "https://th.bing.com/th/id/R.6aa77fe1c9fb84298c337c414ba5bc47?rik=zDMSGDlM52Xu7Q&pid=ImgRaw&r=0",
        difficulty: "Fácil",
        time: "1 hora"
      },
      {
        title: "Robot con e-waste",
        description: "Reutiliza componentes electrónicos de dispositivos viejos para crear robots educativos",
        url: "https://www.youtube.com/watch?v=P7IeL5aJ1jI",
        image: "https://i.ytimg.com/vi/P7IeL5aJ1jI/maxresdefault.jpg",
        difficulty: "Avanzada",
        time: "5-10 horas"
      },
      {
        title: "Estación meteorológica DIY",
        description: "Construye un dispositivo para monitorear condiciones climáticas locales",
        url: "https://proyectosinteresantes.com/estacion-meteorologica/",
        image: "https://th.bing.com/th/id/OIP.H8CBBaoU8nWMcstWmk35xgHaFj?rs=1&pid=ImgDetMain",
        difficulty: "Avanzada",
        time: "1-2 días"
      },
      {
        title: "Sensores de riego automatizados",
        description: "Crea un sistema automatizado para regar plantas según humedad del suelo",
        url: "https://www.hackster.io/arduino/automatic-plant-watering-system-8af2dc",
        image: "https://hackster.imgix.net/uploads/attachments/354093/pump_maud7nBTdj.jpg?auto=compress%2Cformat&w=900&h=675&fit=min",
        difficulty: "Media",
        time: "4-6 horas"
      },
      {
        title: "Biodigestor casero",
        description: "Construye un dispositivo que convierte residuos orgánicos en biogás",
        url: "https://codema.mx/blog/biodigestor-que-es-y-como-hacer-uno-casero/",
        image: "https://codema.mx/wp-content/uploads/biodigestor-que-es-y-como-hacer-uno-casero.jpg",
        difficulty: "Avanzada",
        time: "3-4 días"
      }
    ]
  },
  {
    category: "Moda Sostenible",
    items: [
      {
        title: "Tintes naturales",
        description: "Aprende a teñir telas con productos naturales como cáscaras y vegetales",
        url: "https://www.wikihow.com/Make-Natural-Dyes",
        image: "https://www.wikihow.com/images/thumb/4/4d/Make-Natural-Dyes-Step-1-Version-3.jpg/aid400884-v4-728px-Make-Natural-Dyes-Step-1-Version-3.jpg.webp",
        difficulty: "Media",
        time: "3-5 horas"
      },
      {
        title: "Upcycling de ropa",
        description: "Transforma prendas viejas en diseños nuevos y modernos",
        url: "https://www.fashionrevolution.org/",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiVnWfPhxZ2FpM8sUi7Uf9S8ninHpHvY4DQBXxucuovs9XKmPtUrnoSVwvPuIkrMuvmNVWHD3KMBG6pchYn_Qy1_8ppE6G9SYArMyQx4Lg5SE70LIOgYRpchqie6ZD7_Ux0gCwsLT8hUPTqwpu5v3ZMZZR8qhi_n6lLj44F1Ik8iX2m0Oe_Um2cMJuxZ_0/w1200-h630-p-k-no-nu/FOTO%206.webp",
        difficulty: "Variable",
        time: "2-8 horas"
      },
      {
        title: "Tejido con plástico",
        description: "Aprende a tejer bolsas y accesorios con bolsas plásticas reutilizadas",
        url: "https://coseramaquinafans.com/upcycling/",
        image: "https://i.pinimg.com/736x/ca/8d/2f/ca8d2f8531a1ec1ae8e8ab728158fee1.jpg",
        difficulty: "Media",
        time: "4-6 horas"
      },
      {
        title: "Costura Zero Waste",
        description: "Técnicas de corte y confección que no generan residuos textiles",
        url: "https://energytheory.com/es/moda-cero-residuos/",
        image: "https://energytheory.com/wp-content/uploads/2024/04/Zero-waste-fashion-Importance-techniques-and-Examples-Best-Zero-Waste-Fashion-Brands-3.png",
        difficulty: "Avanzada",
        time: "Variable"
      },
      {
        title: "Accesorios con materiales reciclados",
        description: "Crea joyería y complementos con materiales de desecho",
        url: "https://www.reciclajecontemar.es/como-hacer-joyas-con-material-reciclado/",
        image: "https://th.bing.com/th/id/OIP.H2U_txsd6YhllaTiy7DtoAHaD4?rs=1&pid=ImgDetMain",
        difficulty: "Fácil",
        time: "2-3 horas"
      }
    ]
  },
  {
    category: "Educación Ambiental",
    items: [
      {
        title: "Talleres comunitarios",
        description: "Organiza sesiones educativas sobre temas ambientales en tu comunidad",
        url: "https://elpezenlaluna.com/transforma-tu-comunidad-talleres-de-educacion-ambiental-en-accion/",
        image: "https://elpezenlaluna.com/wp-content/uploads/2024/08/educacion_ambiental_ninos-980x653.jpg",
        difficulty: "Media",
        time: "Proyecto continuo"
      },
      {
        title: "Laboratorio de ciencias ecológicas",
        description: "Crea experimentos científicos para niños sobre problemas ambientales",
        url: "https://eresmama.com/ecologia-para-ninos-experimentos-que-ensenan-a-respetar-el-planeta/",
        image: "https://eresmama.com/wp-content/uploads/2019/07/ninas-plantando-plantas-experimentos-para-respetar-el-planeta-ecologia-para-ninos-768x515.jpg?auto=webp&quality=7500&width=1080&crop=16:9,smart,safe&format=webp&optimize=medium&dpr=2&fit=cover&fm=webp&q=75&w=1080&h=608",
        difficulty: "Fácil",
        time: "Variable"
      },
      {
        title: "Juegos de conciencia ambiental",
        description: "Diseña juegos educativos sobre conservación y sostenibilidad",
        url: "https://www.educapeques.com/recursos-para-el-aula/conocimiento-del-medio-primaria/juegos-conciencia-ambiental.html",
        image: "https://www.educapeques.com/wp-content/uploads/2023/06/conciencia-medioambiental.jpg.webp",
        difficulty: "Media",
        time: "3-4 horas"
      },
      {
        title: "Ciencia ciudadana",
        description: "Participa en proyectos de investigación ambiental desde casa",
        url: "https://www.bing.com/search?q=Ciencia+ciudadana+Participa+en+proyectos+de+investigaci%C3%B3n+ambiental+desde+casa&cvid=b8102578803d459c803c5935243a42dd&gs_lcrp=EgRlZGdlKgYIABBFGDkyBggAEEUYOdIBBzM4OGowajSoAgiwAgE&FORM=ANAB01&PC=U531",
        image: "https://escoles.fundesplai.org/wp-content/uploads/2020/03/Ciencia-ciutadana-des-de-casa-Fundesplai.jpg",
        difficulty: "Variable",
        time: "Variable"
      },
      {
        title: "Ecoauditoría escolar",
        description: "Implementa un sistema para evaluar y mejorar el impacto ambiental en escuelas",
        url: "https://www.eco-schools.org.uk/",
        image: "https://www.eco-schools.org.uk/wp-content/uploads/2023/12/206A8000-555x380.jpg",
        difficulty: "Media",
        time: "Proyecto continuo"
      }
    ]
  }
];

function getCategoryColors(category) {
  const colors = {
    "Alimentación Sostenible": { bg: "bg-green-800/40", text: "text-green-300", dark: "bg-green-800", light: "bg-green-200", border: "border-green-600" },
    "Reciclaje Creativo": { bg: "bg-amber-700/40", text: "text-amber-300", dark: "bg-amber-800", light: "bg-amber-200", border: "border-amber-600" },
    "Energía Limpia": { bg: "bg-yellow-600/40", text: "text-yellow-300", dark: "bg-yellow-700", light: "bg-yellow-200", border: "border-yellow-600" },
    "Agua y Conservación": { bg: "bg-blue-800/40", text: "text-blue-300", dark: "bg-blue-800", light: "bg-blue-200", border: "border-blue-600" },
    "Tecnología Verde": { bg: "bg-emerald-800/40", text: "text-emerald-300", dark: "bg-emerald-800", light: "bg-emerald-200", border: "border-emerald-600" },
    "Moda Sostenible": { bg: "bg-fuchsia-800/40", text: "text-fuchsia-300", dark: "bg-fuchsia-800", light: "bg-fuchsia-200", border: "border-fuchsia-600" },
    "Educación Ambiental": { bg: "bg-purple-800/40", text: "text-purple-300", dark: "bg-purple-800", light: "bg-purple-200", border: "border-purple-600" }
  };
  return colors[category] || { bg: "bg-slate-700/40", text: "text-gray-300", dark: "bg-slate-800", light: "bg-slate-200", border: "border-slate-600" };
}

export default function SustainablePractices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState("Todas");
  const [savedItems, setSavedItems] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState(practices.map(p => p.category));
  const [activeCategory, setActiveCategory] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Detectar scroll para mostrar el botón "volver arriba"
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para volver al inicio
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Guardar elemento
  const toggleSaveItem = (category, title) => {
    const itemKey = `${category}-${title}`;
    if (savedItems.includes(itemKey)) {
      setSavedItems(savedItems.filter(item => item !== itemKey));
    } else {
      setSavedItems([...savedItems, itemKey]);
    }
  };

  // Filtrar por categoría
  const toggleCategoryFilter = (category) => {
    if (visibleCategories.includes(category)) {
      if (visibleCategories.length > 1) {
        setVisibleCategories(visibleCategories.filter(c => c !== category));
      }
    } else {
      setVisibleCategories([...visibleCategories, category]);
    }
  };

  // Compartir proyecto (simulado)
  const shareProject = (title) => {
    if (navigator.share) {
      navigator.share({
        title: `Práctica sostenible: ${title}`,
        text: `¡Mira esta práctica sostenible que encontré: ${title}!`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error compartiendo', error));
    } else {
      alert(`Compartir "${title}" - Funcionalidad disponible solo en dispositivos compatibles`);
    }
  };

  // Filtrar los proyectos según búsqueda y filtros
  const filteredPractices = practices
    .filter(group => visibleCategories.includes(group.category))
    .map(group => {
      return {
        ...group,
        items: group.items.filter(item => {
          const matchesSearch = searchTerm === "" || 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
          
          const matchesDifficulty = difficultyFilter === "Todas" || 
            item.difficulty === difficultyFilter;
          
          return matchesSearch && matchesDifficulty;
        })
      };
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100 pb-16">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 shadow-lg px-4 py-3">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="relative mt-2 lg:mt-0 w-full lg:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              style={{ width: "85vw" }}
              type="text"
              placeholder="Buscar prácticas sustentables..."
              className="pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-full text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden py-16 lg:py-24 text-center px-4">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 bg-clip-text text-transparent mb-6">
            Prácticas Sostenibles para los ODS 2030
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Descubre más de 40 iniciativas eco-friendly para implementar en casa y contribuir 
            con los Objetivos de Desarrollo Sostenible de la ONU
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {practices.map((group, idx) => {
              const { text, border } = getCategoryColors(group.category);
              const isActive = visibleCategories.includes(group.category);
              
              return (
                <button
                  key={idx}
                  onClick={() => toggleCategoryFilter(group.category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? `${text} ${border} border bg-slate-800/80` 
                      : "text-gray-400 border border-gray-700 hover:border-gray-500"
                  }`}
                >
                  {group.category}
                </button>
              );
            })}
          </div>
          
          <div className="flex justify-center gap-4 mb-4">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="Todas">Todas las dificultades</option>
              <option value="Fácil">Nivel fácil</option>
              <option value="Media">Nivel medio</option>
              <option value="Avanzada">Nivel avanzado</option>
            </select>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4">
        {filteredPractices.map((group, index) => {
          // No mostrar categorías sin resultados
          if (group.items.length === 0) return null;
          
          const { bg, text, border } = getCategoryColors(group.category);
          const isActive = activeCategory === group.category;
          
          return (
            <section 
              key={index} 
              className="mb-16 scroll-mt-24" 
              id={group.category.replace(/\s+/g, '-').toLowerCase()}
            >
              <div 
                className={`sticky top-16 z-20 py-4 px-2 backdrop-blur-sm ${bg.replace('/40', '/70')} border-b ${border} mb-8`}
              >
                <h2 className={`text-2xl md:text-3xl font-bold ${text} flex items-center gap-3`}>
                  <span className={`w-3 h-3 rounded-full ${text.replace('text', 'bg')}`}></span>
                  {group.category}
                  <span className="ml-2 text-lg bg-slate-800/60 px-2 py-0.5 rounded-full text-gray-300">
                    {group.items.length}
                  </span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {group.items.map((item, idx) => {
                  const itemKey = `${group.category}-${item.title}`;
                  const isSaved = savedItems.includes(itemKey);
                  
                  return (
                    <article 
                      key={idx} 
                      className={`${bg} rounded-xl shadow-xl border border-slate-700/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden relative flex flex-col`}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                        
                        {/* Etiquetas flotantes */}
                        <div className="absolute top-2 right-2 flex gap-1">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            item.difficulty === "Fácil" 
                              ? "bg-green-800/80 text-green-200" 
                              : item.difficulty === "Media"
                                ? "bg-yellow-700/80 text-yellow-200"
                                : "bg-red-800/80 text-red-200"
                          }`}>
                            {item.difficulty}
                          </span>
                        </div>
                        
                        <div className="absolute bottom-2 left-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-800/80 text-gray-300">
                            {item.time}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-5 flex-grow">
                        <h3 className={`text-xl font-bold ${text} mb-2 group-hover:underline`}>
                          {item.title}
                        </h3>
                        <p className="text-gray-300 mb-4 text-sm">{item.description}</p>
                      </div>
                      
                      <div className="p-4 pt-0 mt-auto flex justify-between items-center">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => toggleSaveItem(group.category, item.title)}
                            className={`p-2 rounded-full transition-colors ${
                              isSaved 
                                ? "bg-teal-600/30 text-teal-300" 
                                : "bg-slate-800/60 text-gray-400 hover:text-gray-200"
                            }`}
                            aria-label={isSaved ? "Eliminar de guardados" : "Guardar proyecto"}
                          >
                            <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
                          </button>
                          
                          <button 
                            onClick={() => shareProject(item.title)}
                            className="p-2 rounded-full bg-slate-800/60 text-gray-400 hover:text-gray-200 transition-colors"
                            aria-label="Compartir"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 font-medium transition-colors group-hover:underline"
                        >
                          <span>Ver tutorial</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
        
        {/* Mensaje si no hay resultados */}
        {filteredPractices.every(group => group.items.length === 0) && (
          <div className="text-center py-16">
            <div className="inline-block p-6 rounded-full bg-slate-800/60 mb-6">
              <Search className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No se encontraron resultados</h3>
            <p className="text-gray-400 mb-6">
              Intenta con otros términos de búsqueda o ajusta los filtros
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setDifficultyFilter("Todas");
                setVisibleCategories(practices.map(p => p.category));
              }}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-full transition-colors"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-slate-800 py-10 mt-16">
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
      
      {/* Botón de volver arriba */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed right-4 bottom-4 p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg transition-all duration-300 z-50"
          aria-label="Volver arriba"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}