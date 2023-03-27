import React, { useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import "./App.css";

function Model(props) {
  const { scene } = useGLTF("/assets/Cog.glb");
  const center = scene.children[1];
  const [hoveredGear, setHoveredGear] = useState(null);

  const linkArr = [
    "https://www.gearpatrol.com",
    "https://www.backcountry.com",
    "https://www.switchbacktravel.com",
    "https://www.snowleader.com",
    "https://www.gearjunkie.com",
    "https://www.rei.com",
    "https://www.snowleader.com",
    "https://www.gearpatrol.com",
    "https://www.outdoorgearlab.com",
  ];

  scene.children.map((child, index) => {
    child.userData.link = linkArr[index];
  });

  useFrame((state, delta) => {
    center.rotation.y += 0.25 * delta;
    scene.children.map((obj) => {
      if (obj !== center) {
        obj.rotation.y -= 0.5 * delta;
      }
    });
  });

  const handleGearClick = (e) => {
    const link = e?.object?.parent?.userData?.link;
    if (link) {
      window.open(link, "_blank");
    }
  };
  if (hoveredGear) {
    hoveredGear.position.y = 1;

    const myTimeout = setTimeout(unHoverAfter, 1000);

    function unHoverAfter() {
      hoveredGear.position.y = 0;
    }
  }

  return (
    <>
      <primitive
        object={scene}
        onPointerOver={(e) => setHoveredGear(e.object)}
        onPointerDown={handleGearClick}
        onPointerOut={() => {
          const timer = setTimeout(() => {
            setHoveredGear(null);
          }, 3000);
          return () => clearTimeout(timer);
        }}
        {...props}
      />
    </>
  );
}
function App() {
  return (
    <div className="App">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45 }}
        // camera={{ rotation: [-Math.PI / 2, 0, 0] }}
        // rotation={[-Math.PI / 2, 0, 0]}
        style={{
          position: "absolute",
          height: "100vh",
          width: "100vw",
        }}
      >
        <color attach="background" args={["#000000"]} />
        <PresentationControls
          speed={1.5}
          global
          zoom={0.5}
          makeDefault={false}
          // polar={[-0.1, Math.PI / 4]}
        >
          <Stage environment={null}>
            <Model scale={0.01} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  );
}

export default App;
