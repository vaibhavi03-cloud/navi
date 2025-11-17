import React from 'react';
import type { FloorArea, NavigationNode, Point, Language, PathSegment } from '../types';
import { ElevatorIcon, EscalatorIcon, ExitIcon, FemaleIcon, MaleIcon, PersonIcon, StairsIcon } from './icons';

interface FloorMapProps {
  areas: FloorArea[];
  navNodes: NavigationNode[];
  currentFloor: number;
  setCurrentFloor: (floor: number) => void;
  availableFloors: number[];
  userPosition: Point;
  userRotation: number;
  path: PathSegment[];
  isNavigating: boolean;
  navInstruction: string;
  language: Language;
}

const getAreaIcon = (area: FloorArea) => {
    if (area.type === 'washroom') {
        if (area.gender === 'male') return <MaleIcon className="w-1/3 h-1/3" />;
        if (area.gender === 'female') return <FemaleIcon className="w-1/3 h-1/3" />;
    }
    if (area.type === 'exit') return <ExitIcon className="w-1/2 h-1/2" />;
    return null;
}

const getNavNodeIcon = (node: NavigationNode) => {
    switch (node.type) {
        case 'stairs': return <StairsIcon className="w-2/3 h-2/3" />;
        case 'escalator': return <EscalatorIcon className="w-2/3 h-2/3" />;
        case 'lift': return <ElevatorIcon className="w-2/3 h-2/3" />;
    }
}

export const FloorMap: React.FC<FloorMapProps> = ({ 
    areas, navNodes, currentFloor, setCurrentFloor, availableFloors, userPosition, userRotation, path, isNavigating, navInstruction, language
}) => {
  const displayedAreas = areas.filter(area => area.floor === currentFloor);
  const displayedNavNodes = navNodes.filter(node => node.floor === currentFloor);
  const displayedPath = path.find(p => p.floor === currentFloor);
  
  const pathData = displayedPath ? "M " + displayedPath.points.map(p => `${p.x} ${p.y}`).join(" L ") : "";

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Floor Map</h1>
        <div className="flex space-x-1 sm:space-x-2 bg-gray-100 p-1 rounded-lg">
          {availableFloors.map(floor => (
            <button
              key={floor}
              onClick={() => !isNavigating && setCurrentFloor(floor)}
              disabled={isNavigating}
              className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
                currentFloor === floor
                  ? 'bg-white text-blue-600 shadow'
                  : 'text-gray-500 hover:bg-gray-200'
              } ${isNavigating ? 'cursor-not-allowed opacity-70' : ''}`}
            >
              Floor {floor}
            </button>
          ))}
        </div>
      </div>
       {isNavigating && (
        <div className="mb-2 p-2 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <p className="text-sm font-semibold text-blue-800">{navInstruction}</p>
        </div>
      )}
      <div className="relative w-full aspect-[4/3] bg-white border border-gray-200 rounded-lg overflow-hidden
                      bg-[linear-gradient(to_right,rgba(229,231,235,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,231,235,0.5)_1px,transparent_1px)] 
                      bg-[size:2%_2%]" style={{ backgroundSize: '1.5rem 1.5rem'}}>
        
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {isNavigating && pathData && (
             <path d={pathData} stroke="#3b82f6" strokeWidth="1" fill="none" className="path-line" />
          )}
        </svg>

        {displayedAreas.map((area) => (
          <div
            key={area.id}
            className={`absolute flex items-center justify-center rounded-sm ${area.color} ${area.textColor} text-[8px] sm:text-xs font-medium shadow-sm transition-all duration-300 p-1`}
            style={{
              left: `${area.x}%`,
              top: `${area.y}%`,
              width: `${area.width}%`,
              height: `${area.height}%`,
            }}
          >
            <div className="text-center leading-tight">
                {getAreaIcon(area)}
                <span>{area.name[language]}</span>
            </div>
          </div>
        ))}
        {displayedNavNodes.map(node => (
             <div
                key={node.id}
                title={`${node.type.charAt(0).toUpperCase() + node.type.slice(1)}`}
                className="absolute flex items-center justify-center bg-gray-200 border-2 border-gray-400 rounded-md text-gray-700 shadow-md"
                style={{
                    left: `${node.x - 2}%`,
                    top: `${node.y - 3}%`,
                    width: '4%',
                    height: '6%',
                }}
             >
                {getNavNodeIcon(node)}
             </div>
        ))}

        <div 
          className="absolute"
          style={{ 
            left: `${userPosition.x}%`, 
            top: `${userPosition.y}%`,
            transform: `translate(-50%, -50%) rotate(${userRotation}deg)`,
            display: userPosition.floor === currentFloor ? 'block' : 'none',
            transition: 'transform 0.2s linear'
          }}
        >
          <div className="relative w-6 h-6 sm:w-8 sm:h-8">
            {isNavigating && <div className="absolute inset-0 bg-blue-500 rounded-full opacity-50 animate-ping"></div>}
            <PersonIcon className="w-full h-full text-blue-600 drop-shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};