export default function Cube({ scale }) {
  return (
    <mesh position={[2, 2, 0]} scale={scale}>
      <boxGeometry />
      <meshStandardMaterial color="mediumpurple" />
    </mesh>
  );
}
