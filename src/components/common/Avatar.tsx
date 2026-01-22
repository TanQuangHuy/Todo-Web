export default function Avatar({ src, size = 46 }: { src: string; size?: number }) {
  return (
    <img
      src={src}
      alt="avatar"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        border: "2px solid white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    />
  );
}
