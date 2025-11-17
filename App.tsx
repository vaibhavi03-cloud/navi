
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FloorMap } from './components/FloorMap';
import { Header } from './components/Header';
import { SidePanel } from './components/SidePanel';
import { initialProducts, floorAreas, navigationNodes } from './data';
import { calculateMultiStopRoute } from './utils/pathfinding';
import { translations } from './translations';
import type { Product, Language, Point, PathSegment, FloorArea, DestinationStop } from './types';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [language, setLanguage] = useState<Language>('en');
  const [isShopkeeperMode, setShopkeeperMode] = useState<boolean>(false);
  
  const [currentFloor, setCurrentFloor] = useState<number>(1);
  const [shoppingList, setShoppingList] = useState<number[]>([]);

  const [path, setPath] = useState<PathSegment[]>([]);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [userPosition, setUserPosition] = useState<Point>({ x: 50, y: 92, floor: 1 });
  const [userRotation, setUserRotation] = useState<number>(0);
  const [navInstruction, setNavInstruction] = useState<string>('');

  const animationFrameId = useRef<number | null>(null);
  const lastTimestamp = useRef<number>(0);
  // Fix: Use ReturnType<typeof setTimeout> for browser compatibility instead of NodeJS.Timeout
  const segmentPauseTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = useCallback((key: keyof typeof translations['en'], options: Record<string, string | number> = {}) => {
    let str = translations[language][key] || translations['en'][key];
    for (const k in options) {
      str = str.replace(`{${k}}`, String(options[k]));
    }
    return str;
  }, [language]);
  
  // Main animation effect
  useEffect(() => {
    if (!isNavigating || path.length === 0) {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (segmentPauseTimeoutId.current) clearTimeout(segmentPauseTimeoutId.current);
      return;
    }

    let currentSegmentIndex = 0;
    let currentPointIndex = 0; // Start at 0, move towards 1
    let pos = path[0].points[0]; // Start at the beginning of the first segment

    const animate = (timestamp: number) => {
      if (lastTimestamp.current === 0) {
        lastTimestamp.current = timestamp;
      }
      const deltaTime = timestamp - lastTimestamp.current;
      lastTimestamp.current = timestamp;

      const SPEED = 0.03; // Units per millisecond
      const travelDistance = SPEED * deltaTime;

      const currentSegment = path[currentSegmentIndex];
      const startPoint = currentSegment.points[currentPointIndex];
      const endPoint = currentSegment.points[currentPointIndex + 1];

      if (userPosition.floor !== currentSegment.floor) {
        setCurrentFloor(currentSegment.floor);
      }
      setNavInstruction(currentSegment.instruction);

      const segmentVector = { x: endPoint.x - startPoint.x, y: endPoint.y - startPoint.y };
      const segmentLength = Math.hypot(segmentVector.x, segmentVector.y);
      const remainingDistance = segmentLength > 0 ? Math.hypot(endPoint.x - pos.x, endPoint.y - pos.y) : 0;

      const angle = Math.atan2(segmentVector.y, segmentVector.x) * (180 / Math.PI);
      setUserRotation(angle + 90);

      if (travelDistance >= remainingDistance && segmentLength > 0) {
        pos = endPoint;
        currentPointIndex++;

        if (currentPointIndex >= currentSegment.points.length - 1) {
          setUserPosition({ ...pos, floor: currentSegment.floor });
          
          currentSegmentIndex++;
          currentPointIndex = 0;

          if (currentSegmentIndex >= path.length) {
            setIsNavigating(false);
            setNavInstruction(t('navigationComplete'));
            return;
          }

          lastTimestamp.current = 0;
          segmentPauseTimeoutId.current = setTimeout(() => {
             pos = path[currentSegmentIndex].points[0];
             animationFrameId.current = requestAnimationFrame(animate);
          }, 2000); // 2 second pause
          return;
        }
      } else if (segmentLength > 0) {
        const moveRatio = travelDistance / segmentLength;
        // Fix: Ensure 'pos' object conforms to the 'Point' type by including the 'floor' property.
        pos = {
          x: pos.x + segmentVector.x * moveRatio,
          y: pos.y + segmentVector.y * moveRatio,
          floor: currentSegment.floor,
        };
      }
      
      setUserPosition({ ...pos, floor: currentSegment.floor });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (segmentPauseTimeoutId.current) clearTimeout(segmentPauseTimeoutId.current);
      lastTimestamp.current = 0;
    };
  }, [isNavigating, path, t]);


  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleToggleShoppingList = (productId: number) => {
    setShoppingList(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };
  
  const handleStartNavigation = () => {
    if (shoppingList.length === 0) return;
    
    const startPoint: Point = { x: 50, y: 92, floor: 1 }; // Entrance
    setUserPosition(startPoint);
    setCurrentFloor(1);

    const productDestinations: DestinationStop[] = shoppingList
        .map(id => products.find(p => p.id === id)!)
        // Fix: Add an explicit return type to the map callback. This ensures that the
        // array passed to filter has the correct type, making the type guard valid.
        .map((p): DestinationStop | null => {
            const area = floorAreas.find(a => a.id === p.shopId);
            if (!area) return null;
            return {
                id: p.id,
                destinationPoint: area.entrancePoint,
                destinationName: area.name[language],
            };
        })
        .filter((d): d is DestinationStop => d !== null);

    const calculatedPath = calculateMultiStopRoute(startPoint, productDestinations, floorAreas, navigationNodes, t, language);
    
    setPath(calculatedPath);
    setIsNavigating(true);
    setNavInstruction('');
  };

  const handleStartNavigationToArea = (area: FloorArea) => {
    const startPoint: Point = { x: 50, y: 92, floor: 1 }; // Entrance
    setUserPosition(startPoint);
    setCurrentFloor(1);

    const destination: DestinationStop = {
        id: area.id,
        destinationPoint: area.entrancePoint,
        destinationName: area.name[language],
    };

    const calculatedPath = calculateMultiStopRoute(startPoint, [destination], floorAreas, navigationNodes, t, language);
    
    setPath(calculatedPath);
    if (!isNavigating) {
      setIsNavigating(true);
    }
    setNavInstruction('');
  };


  const handleCancelNavigation = () => {
    setIsNavigating(false);
    setPath([]);
    setUserPosition({ x: 50, y: 92, floor: 1 });
    setCurrentFloor(1);
    setNavInstruction('');
  }

  const uniqueFloors = [...new Set(floorAreas.map(area => area.floor))].sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <Header 
        language={language}
        setLanguage={setLanguage}
        isShopkeeperMode={isShopkeeperMode}
        setShopkeeperMode={setShopkeeperMode}
        t={t}
      />
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="lg:col-span-2">
          <FloorMap
            areas={floorAreas}
            navNodes={navigationNodes}
            currentFloor={currentFloor}
            setCurrentFloor={setCurrentFloor}
            availableFloors={uniqueFloors}
            userPosition={userPosition}
            userRotation={userRotation}
            path={path}
            isNavigating={isNavigating}
            navInstruction={navInstruction}
            language={language}
          />
        </div>
        <div className="lg:col-span-1">
          <SidePanel
            products={products}
            onUpdateProduct={handleProductUpdate}
            shoppingList={shoppingList}
            onToggleShoppingList={handleToggleShoppingList}
            onStartNavigation={handleStartNavigation}
            onCancelNavigation={handleCancelNavigation}
            isNavigating={isNavigating}
            isShopkeeperMode={isShopkeeperMode}
            language={language}
            t={t}
            floorAreas={floorAreas}
            onNavigateToArea={handleStartNavigationToArea}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
