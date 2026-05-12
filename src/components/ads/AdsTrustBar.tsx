interface TrustItem {
  number?: string
  label: string
  sublabel?: string
}

interface AdsTrustBarProps {
  items: TrustItem[]
}

export default function AdsTrustBar({ items }: AdsTrustBarProps) {
  return (
    <div className="ads-trust-bar">
      {items.map((item, i) => (
        <div key={i} className="ads-trust-item">
          <div className="ads-trust-number">{item.number || item.label}</div>
          <div className="ads-trust-label">
            {item.number ? item.label : item.sublabel}
          </div>
        </div>
      ))}
    </div>
  )
}
