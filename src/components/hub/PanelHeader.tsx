/** Swiss section chrome: top rule + section name + running index. */
export function PanelHeader({
  name,
  index,
  labelId,
}: {
  name: string
  index: string
  labelId?: string
}) {
  return (
    <div className="reveal-item flex items-baseline justify-between border-t-2 border-line-strong pt-4">
      <span className="micro text-ink" id={labelId}>
        {name}
      </span>
      <span className="micro">{index} / 06</span>
    </div>
  )
}
