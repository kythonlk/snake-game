interface PerformanceMemory {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface Performance {
  memory?: PerformanceMemory;
}

interface Snake {
  x: number;
  y: number;
}

interface Dots {
  x: number;
  y: number;
}

interface Direction {
  x: number;
  y: number;
}

