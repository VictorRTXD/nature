import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Globe, Sprout, Droplet, Sun } from "lucide-react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const carouselItems = [
    {
      title: "Construyendo un Futuro Sostenible",
      description: "Juntos podemos crear un mundo mejor a través de pequeñas acciones diarias. Descubre cómo contribuir a los Objetivos de Desarrollo Sostenible 2030.",
      icon: <Globe className="w-16 h-16 text-teal-400" />
    },
    {
      title: "Cultiva Tu Propio Alimento",
      description: "Aprende a crear huertos caseros en espacios reducidos utilizando materiales reciclados y técnicas sostenibles.",
      icon: <Sprout className="w-16 h-16 text-green-500" />
    },
    {
      title: "Reduce Tu Huella Ambiental",
      description: "Pequeñas acciones como cultivar tus propios alimentos pueden tener un gran impacto en la reducción de emisiones de carbono.",
      icon: <Droplet className="w-16 h-16 text-blue-400" />
    },
    {
      title: "Conoce El Clima De Tu Región",
      description: "Monitorea la calidad del aire y las condiciones climáticas para tomar decisiones informadas sobre tus cultivos.",
      icon: <Sun className="w-16 h-16 text-amber-400" />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 text-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-teal-300">EcoFuturo 2030</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cultivando sostenibilidad y conciencia ambiental para un mundo mejor
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto bg-slate-700 bg-opacity-50 rounded-xl p-6 shadow-lg">
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {carouselItems.map((item, index) => (
                <div key={index} className="min-w-full px-4">
                  <div className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4">{item.icon}</div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-100">{item.title}</h2>
                    <p className="text-gray-300 text-lg">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-teal-800 bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70 transition"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-teal-800 bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70 transition"
          >
            <ChevronRight size={20} />
          </button>
          
          <div className="flex justify-center mt-4 space-x-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-teal-400' : 'bg-slate-600'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Project Overview Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-teal-300">Nuestro Proyecto</h2>
            <p className="text-gray-300 mb-4">
              Este proyecto busca facilitar el cumplimiento de los Objetivos de Desarrollo Sostenible de la ONU 2030 a través de acciones prácticas como la creación de huertos caseros en espacios reducidos.
            </p>
            <p className="text-gray-300 mb-4">
              Utilizando materiales reciclados y técnicas sostenibles, podemos contribuir a la seguridad alimentaria, reducir nuestra huella de carbono y promover estilos de vida más conscientes con el medio ambiente.
            </p>
            <div className="mt-8">
              <a href="/buenas-practicas" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg mr-4 inline-block transition">
                Buenas Prácticas
              </a>
              <a href="/estadisticas" className="bg-transparent border-2 border-teal-500 hover:border-teal-400 text-teal-300 font-bold py-3 px-6 rounded-lg inline-block transition">
                Ver Estadísticas
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-900 bg-opacity-40 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-green-300">Huertos Caseros</h3>
              <p className="text-gray-300">Aprende a cultivar tus propios alimentos de manera sostenible en espacios reducidos.</p>
            </div>
            <div className="bg-blue-900 bg-opacity-40 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-blue-300">Calidad del Aire</h3>
              <p className="text-gray-300">Monitorea las condiciones ambientales para optimizar tus cultivos.</p>
            </div>
            <div className="bg-teal-900 bg-opacity-40 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-teal-300">ODS 2030</h3>
              <p className="text-gray-300">Contribuye a los Objetivos de Desarrollo Sostenible de la ONU.</p>
            </div>
            <div className="bg-amber-900 bg-opacity-40 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-amber-300">Noticias</h3>
              <p className="text-gray-300">Mantente informado sobre avances en sostenibilidad y cambio climático.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-900 via-teal-900 to-blue-900 bg-opacity-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-teal-200">Únete al Movimiento</h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Cada pequeña acción cuenta. Comienza hoy tu propio huerto casero y forma parte del cambio que nuestro planeta necesita.
          </p>
        </div>
      </div>
    </div>
  );
}