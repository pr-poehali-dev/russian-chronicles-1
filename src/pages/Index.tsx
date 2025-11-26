import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const cardData = [
  {
    id: 1,
    icon: 'Sparkles',
    title: 'Плавные анимации',
    description: 'Карточки появляются с красивым fade-in эффектом при прокрутке страницы',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 2,
    icon: 'MousePointer2',
    title: 'Hover эффекты',
    description: 'Интерактивные эффекты при наведении: подъём, тень и масштабирование',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    icon: 'Eye',
    title: 'Intersection Observer',
    description: 'Умное определение момента появления элемента в области видимости',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 4,
    icon: 'Zap',
    title: 'Производительность',
    description: 'Оптимизированные анимации с использованием CSS transforms',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 5,
    icon: 'Layers',
    title: 'Глубина',
    description: 'Многослойные тени создают ощущение объёма и пространства',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 6,
    icon: 'Heart',
    title: 'Детали',
    description: 'Продуманные микро-взаимодействия делают интерфейс живым',
    color: 'from-pink-500 to-rose-500'
  }
];

const AnimatedCard = ({ card, index }: { card: typeof cardData[0]; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`
      }}
    >
      <Card className="group relative overflow-hidden p-8 h-full cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] bg-white border-2 border-gray-100">
        <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        <div className="relative z-10">
          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.color} mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
            <Icon name={card.icon} size={32} className="text-white" />
          </div>
          
          <h3 className="text-2xl font-bold mb-3 text-gray-900 transform transition-all duration-300 group-hover:translate-x-1">
            {card.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed transform transition-all duration-300 group-hover:translate-x-1">
            {card.description}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Анимации и эффекты
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Плавные анимации появления при скролле и интерактивные hover-эффекты для создания современного интерфейса
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cardData.map((card, index) => (
            <AnimatedCard key={card.id} card={card} index={index} />
          ))}
        </div>

        <div className="mt-20 text-center animate-fade-in" style={{ animationDelay: '800ms' }}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <Icon name="Sparkles" size={20} />
            <span className="font-semibold">Прокрутите, чтобы увидеть анимации</span>
            <Icon name="ArrowDown" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
