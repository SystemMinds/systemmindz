import React, { useRef, useEffect } from 'react';

const Polytope = ({ size = 400, opacity = 0.2, speed = 1 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let nodes = [];
    let edges = [];
    const phi = (1 + Math.sqrt(5)) / 2;
    const r = size / 3;

    // Vertices of a dodecahedron
    const vertices = [
      [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
      [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1],
      [0, 1/phi, phi], [0, 1/phi, -phi], [0, -1/phi, phi], [0, -1/phi, -phi],
      [1/phi, phi, 0], [1/phi, -phi, 0], [-1/phi, phi, 0], [-1/phi, -phi, 0],
      [phi, 0, 1/phi], [phi, 0, -1/phi], [-phi, 0, 1/phi], [-phi, 0, -1/phi]
    ];

    nodes = vertices.map(v => ({ x: v[0] * r, y: v[1] * r, z: v[2] * r }));

    // Connect vertices (edge distance for dodecahedron is approx 2/phi)
    const threshold = (2 / phi) * r * 1.1; 
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const d = Math.sqrt(
                Math.pow(nodes[i].x - nodes[j].x, 2) +
                Math.pow(nodes[i].y - nodes[j].y, 2) +
                Math.pow(nodes[i].z - nodes[j].z, 2)
            );
            if (d < threshold) edges.push([i, j]);
        }
    }

    let rotX = Math.random();
    let rotY = Math.random();
    let rotZ = Math.random();

    let isComponentMounted = true;

    const rotate = () => {
      if (!isComponentMounted) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Update rotation angles for "all directions" feel
      rotX += 0.004 * speed;
      rotY += 0.006 * speed;
      rotZ += 0.002 * speed;

      const rotatedNodes = nodes.map(node => {
        let { x, y, z } = node;

        // X rotation
        let ty = y * Math.cos(rotX) - z * Math.sin(rotX);
        let tz = y * Math.sin(rotX) + z * Math.cos(rotX);
        y = ty; z = tz;

        // Y rotation
        let tx = x * Math.cos(rotY) + z * Math.sin(rotY);
        tz = -x * Math.sin(rotY) + z * Math.cos(rotY);
        x = tx; z = tz;

        // Z rotation
        tx = x * Math.cos(rotZ) - y * Math.sin(rotZ);
        ty = x * Math.sin(rotZ) + y * Math.cos(rotZ);
        x = tx; y = ty;

        return { x, y, z };
      });

      // Sort edges by distance (simple painter's algorithm for wireframe depth)
      // Actually not strictly needed for wireframe but helps with look
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.lineWidth = 1.5; // Slightly thicker lines for better visibility
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      edges.forEach(([i, j]) => {
        const n1 = rotatedNodes[i];
        const n2 = rotatedNodes[j];
        
        ctx.beginPath();
        ctx.moveTo(cx + n1.x, cy + n1.y);
        ctx.lineTo(cx + n2.x, cy + n2.y);
        ctx.stroke();
      });

      requestAnimationFrame(rotate);
    };

    rotate();
    return () => { isComponentMounted = false; };
  }, [size, opacity, speed]);

  return (
    <canvas 
      ref={canvasRef} 
      width={size * 1.2} // Added padding to prevent line clipping
      height={size * 1.2}
      className="max-w-full h-auto pointer-events-none"
    />
  );
};

export default Polytope;
