// Top-down car, facing right. Pure SVG so it stays sharp and weighs ~1 KB.
export default function Car(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 110 54" role="img" aria-label="Car viewed from above" {...props}>
      <rect x="12" y="1" width="16" height="6" rx="3" fill="#0E0F10" />
      <rect x="12" y="47" width="16" height="6" rx="3" fill="#0E0F10" />
      <rect x="76" y="1" width="16" height="6" rx="3" fill="#0E0F10" />
      <rect x="76" y="47" width="16" height="6" rx="3" fill="#0E0F10" />
      <rect x="3" y="4" width="104" height="46" rx="20" fill="#F26B0F" stroke="#8A3A05" strokeWidth="1.5" />
      <rect x="62" y="11" width="18" height="32" rx="6" fill="#1B1D20" opacity="0.9" />
      <rect x="30" y="12" width="24" height="30" rx="7" fill="#FFB067" stroke="#8A3A05" strokeWidth="1" />
      <rect x="100" y="12" width="5" height="8" rx="2" fill="#FFF3E0" />
      <rect x="100" y="34" width="5" height="8" rx="2" fill="#FFF3E0" />
    </svg>
  );
}
