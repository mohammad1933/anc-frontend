export function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <circleGeometry args={[9, 64]} />
      <meshStandardMaterial color="#1C1914" roughness={0.92} metalness={0.05} />
    </mesh>
  );
}
