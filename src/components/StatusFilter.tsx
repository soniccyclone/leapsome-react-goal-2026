import { STATUSES, type Status } from '../games/types.ts'

export type Filter = Status | 'all'

export default function StatusFilter({
  value,
  onChange,
}: {
  value: Filter
  onChange: (f: Filter) => void
}) {
  return (
    <label>
      Status filter
      <select value={value} onChange={(e) => onChange(e.target.value as Filter)}>
        <option value="all">All</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </label>
  )
}
