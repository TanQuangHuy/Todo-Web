export default function AvatarGroup({
  items,
  max = 5,
}: {
  items: { id: string; avatarUrl: string; name: string }[];
  max?: number;
}) {
  const shown = items.slice(0, max);
  const more = items.length - shown.length;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {shown.map((a, i) => (
        <img
          key={a.id}
          src={a.avatarUrl}
          title={a.name}
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid white",
            marginLeft: i === 0 ? 0 : -10,
          }}
        />
      ))}
      {more > 0 ? (
        <span
          style={{
            marginLeft: 10,
            fontSize: 12,
            fontWeight: 800,
            opacity: 0.75,
          }}
        >
          +{more}
        </span>
      ) : null}
    </div>
  );
}
