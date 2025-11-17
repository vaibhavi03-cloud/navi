export type Language = 'en' | 'kn' | 'hi';

export interface LocalizedString {
  en: string;
  kn: string;
  hi: string;
}

export interface Product {
  id: number;
  name: LocalizedString;
  price: number;
  category: LocalizedString;
  shopId: string;
  floor: number;
}

export type AreaType = 'shop' | 'washroom' | 'utility' | 'exit' | 'entrance';

export interface FloorArea {
  id: string;
  name: LocalizedString;
  type: AreaType;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  textColor: string;
  floor: number;
  entrancePoint: Point; // Used for pathfinding to the "door"
  gender?: 'male' | 'female';
}

export type NavigationNodeType = 'stairs' | 'escalator' | 'lift';

export interface NavigationNode {
    id: string;
    type: NavigationNodeType;
    floor: number;
    x: number;
    y: number;
    links: { floor: number; id: string }[]; // Links to nodes on other floors
}

export interface Point {
  x: number;
  y: number;
  floor: number;
}

export interface PathSegment {
    floor: number;
    points: Point[];
    instruction: string;
}

export interface DestinationStop {
    id: string | number;
    destinationPoint: Point;
    destinationName: string;
}
