import type { Point, FloorArea, NavigationNode, PathSegment, Language, DestinationStop } from './types';

const distance = (p1: Point, p2: Point) => Math.hypot(p1.x - p2.x, p1.y - p2.y);

// Simple A* implementation for pathfinding on a single floor
function findPathOnFloor(start: Point, end: Point, floor: number, areas: FloorArea[]): Point[] {
    const openSet = [start];
    const cameFrom = new Map<string, Point>();
    
    const gScore = new Map<string, number>();
    gScore.set(`${start.x},${start.y}`, 0);

    const fScore = new Map<string, number>();
    fScore.set(`${start.x},${start.y}`, distance(start, end));
    
    const getKey = (p: Point) => `${p.x},${p.y}`;

    while (openSet.length > 0) {
        openSet.sort((a, b) => (fScore.get(getKey(a)) ?? Infinity) - (fScore.get(getKey(b)) ?? Infinity));
        const current = openSet.shift()!;

        if (distance(current, end) < 2) { // Close enough
            const path = [end];
            let temp: Point | undefined = current;
            while (temp && !(temp.x === start.x && temp.y === start.y)) {
                path.unshift(temp);
                temp = cameFrom.get(getKey(temp));
            }
            path.unshift(start);
            return path;
        }

        const neighbors: Point[] = [
            { x: current.x + 2, y: current.y, floor }, { x: current.x - 2, y: current.y, floor },
            { x: current.x, y: current.y + 2, floor }, { x: current.x, y: current.y - 2, floor },
            { x: current.x + 1.5, y: current.y + 1.5, floor }, { x: current.x - 1.5, y: current.y - 1.5, floor },
            { x: current.x + 1.5, y: current.y - 1.5, floor }, { x: current.x - 1.5, y: current.y + 1.5, floor },
        ];

        for (const neighbor of neighbors) {
            if (neighbor.x < 0 || neighbor.x > 100 || neighbor.y < 0 || neighbor.y > 100) continue;
            
            const inArea = areas.some(a => 
                a.floor === floor && a.type !== 'entrance' &&
                neighbor.x >= a.x && neighbor.x <= a.x + a.width &&
                neighbor.y >= a.y && neighbor.y <= a.y + a.height
            );
            if (inArea) continue;

            const tentativeGScore = (gScore.get(getKey(current)) ?? Infinity) + distance(current, neighbor);
            if (tentativeGScore < (gScore.get(getKey(neighbor)) ?? Infinity)) {
                cameFrom.set(getKey(neighbor), current);
                gScore.set(getKey(neighbor), tentativeGScore);
                fScore.set(getKey(neighbor), tentativeGScore + distance(neighbor, end));
                if (!openSet.some(p => p.x === neighbor.x && p.y === neighbor.y)) {
                    openSet.push(neighbor);
                }
            }
        }
    }
    return [start, end]; // Failed to find path, return direct line
}

// Finds the shortest sequence of floors to traverse using BFS
function findFloorPath(startFloor: number, endFloor: number, navNodes: NavigationNode[]): number[] | null {
    if (startFloor === endFloor) return [startFloor];
    const queue: { floor: number, path: number[] }[] = [{ floor: startFloor, path: [startFloor] }];
    const visited = new Set<number>([startFloor]);

    while (queue.length > 0) {
        const { floor, path } = queue.shift()!;

        if (floor === endFloor) {
            return path;
        }

        const reachableFloors = new Set<number>();
        navNodes
            .filter(node => node.floor === floor)
            .forEach(node => {
                node.links.forEach(link => {
                    reachableFloors.add(link.floor);
                });
            });

        for (const nextFloor of reachableFloors) {
            if (!visited.has(nextFloor)) {
                visited.add(nextFloor);
                const newPath = [...path, nextFloor];
                queue.push({ floor: nextFloor, path: newPath });
            }
        }
    }
    return null;
}

export function calculateMultiStopRoute(
    start: Point, 
    destinations: DestinationStop[], 
    areas: FloorArea[], 
    navNodes: NavigationNode[],
    t: (key: string, options?: Record<string, string | number>) => string,
    language: Language
): PathSegment[] {
    const remainingDestinations = [...destinations];

    let currentPoint = start;
    let fullPath: PathSegment[] = [];

    while (remainingDestinations.length > 0) {
        remainingDestinations.sort((a, b) => {
            const distA = Math.abs(a.destinationPoint.floor - currentPoint.floor) * 1000 + distance(a.destinationPoint, currentPoint);
            const distB = Math.abs(b.destinationPoint.floor - currentPoint.floor) * 1000 + distance(b.destinationPoint, currentPoint);
            return distA - distB;
        });
        
        const nextStop = remainingDestinations.shift()!;
        const nextDestinationPoint = nextStop.destinationPoint;
        
        if (currentPoint.floor !== nextDestinationPoint.floor) {
            const floorPath = findFloorPath(currentPoint.floor, nextDestinationPoint.floor, navNodes);
            
            if (floorPath) {
                for (let i = 0; i < floorPath.length - 1; i++) {
                    const startFloor = floorPath[i];
                    const endFloor = floorPath[i+1];

                    const availableTransit = navNodes.filter(n => n.floor === startFloor && n.links.some(l => l.floor === endFloor));
                    if (availableTransit.length === 0) {
                        console.error(`Pathfinding Error: No transit node found to get from floor ${startFloor} to ${endFloor}.`);
                        return fullPath; // Stop processing and return what we have.
                    }
                    
                    availableTransit.sort((a, b) => distance(a, currentPoint) - distance(b, currentPoint));
                    const transitNode = availableTransit[0];
                    const transitPoint = { x: transitNode.x, y: transitNode.y, floor: transitNode.floor };
                    
                    const pathToTransit = findPathOnFloor(currentPoint, transitPoint, startFloor, areas);
                    fullPath.push({
                        floor: startFloor,
                        points: pathToTransit,
                        instruction: t('goTo', { destination: transitNode.type, floor: endFloor })
                    });
                    
                    const destTransitLink = transitNode.links.find(l => l.floor === endFloor);
                    if (!destTransitLink) {
                         console.error(`Pathfinding Error: Inconsistent navigation data for node ${transitNode.id}.`);
                         return fullPath;
                    }
                    const destTransit = navNodes.find(n => n.id === destTransitLink.id);
                    if (!destTransit) {
                         console.error(`Pathfinding Error: Could not find linked navigation node with id ${destTransitLink.id}.`);
                         return fullPath;
                    }
                    currentPoint = { x: destTransit.x, y: destTransit.y, floor: destTransit.floor };
                }
            } else {
                 console.error(`Pathfinding Error: Could not find a floor path from ${currentPoint.floor} to ${nextDestinationPoint.floor}.`);
                 return fullPath;
            }
        }
        
        const pathOnFinalFloor = findPathOnFloor(currentPoint, nextDestinationPoint, nextDestinationPoint.floor, areas);
        const instruction = remainingDestinations.length === 0 
            ? t('arrivedAt', { destination: nextStop.destinationName }) 
            : t('proceedTo', { destination: nextStop.destinationName });

        fullPath.push({
            floor: nextDestinationPoint.floor,
            points: pathOnFinalFloor,
            instruction: instruction
        });
        
        currentPoint = nextDestinationPoint;
    }
    
    return fullPath;
}