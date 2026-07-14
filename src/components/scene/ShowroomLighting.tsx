import { ContactShadows, Environment, Lightformer } from "@react-three/drei";

/**
 * Premium showroom lighting rig. The environment map is generated procedurally
 * from in-scene light panels (drei's Lightformer) rather than fetched from a
 * remote HDR file, so reflections work identically offline, behind a
 * corporate proxy, or with strict ad/tracker blocking — nothing here depends
 * on third-party CDN availability.
 */
export function ShowroomLighting() {
  return (
    <>
      <Environment resolution={256} environmentIntensity={0.65}>
        <group>
          <Lightformer form="rect" intensity={3} color="#FFF6E5" position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[8, 8, 1]} />
          <Lightformer form="rect" intensity={1.4} color="#EFE6D2" position={[-6, 3, 2]} rotation={[0, Math.PI / 2.4, 0]} scale={[6, 6, 1]} />
          <Lightformer form="rect" intensity={1.1} color="#CFE0FF" position={[6, 3, -2]} rotation={[0, -Math.PI / 2.4, 0]} scale={[6, 6, 1]} />
          <Lightformer form="ring" intensity={0.6} color="#B8935A" position={[0, 1.5, 6]} scale={5} />
        </group>
      </Environment>
      <ambientLight intensity={0.35} color="#F6EFE1" />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.6}
        color="#FFF6E5"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      >
        <orthographicCamera attach="shadow-camera" args={[-4, 4, 4, -4, 0.1, 20]} />
      </directionalLight>
      <directionalLight position={[-5, 3, -4]} intensity={0.4} color="#CFE0FF" />
      <ContactShadows
        position={[0, 0.001, 0]}
        opacity={0.55}
        scale={10}
        blur={2.4}
        far={2}
        resolution={1024}
        color="#0A0906"
      />
    </>
  );
}
