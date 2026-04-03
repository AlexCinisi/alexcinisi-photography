import React, { useState, useMemo, useCallback } from 'react'
import { type ArrayOfObjectsInputProps, PatchEvent, unset } from 'sanity'
import { useClient } from 'sanity'
import imageUrlBuilder from '@sanity/image-url'

/**
 * Custom gallery input for Sanity Studio.
 * 
 * Two modes:
 * - Normal mode: renders the default Sanity array input (list view with alt text preview)
 * - Selection mode: shows checkboxes for bulk operations (select all, delete selected, clear all)
 */
export function GalleryInput(props: ArrayOfObjectsInputProps) {
  const { value = [], onChange, renderDefault } = props
  const items = value as any[]
  const [selectionMode, setSelectionMode] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  // Image URL builder for thumbnails
  const client = useClient({ apiVersion: '2024-01-01' })
  const builder = useMemo(() => imageUrlBuilder(client), [client])

  function thumbUrl(item: any): string {
    try {
      return builder.image(item).width(80).height(80).fit('crop').auto('format').url()
    } catch {
      return ''
    }
  }

  // === Actions ===

  const toggleSelectionMode = useCallback(() => {
    setSelectionMode(prev => !prev)
    setSelected(new Set())
  }, [])

  const handleSelectAll = useCallback(() => {
    if (selected.size === items.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(items.map(item => item._key)))
    }
  }, [selected.size, items])

  const handleToggle = useCallback((key: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const handleDeleteSelected = useCallback(() => {
    if (selected.size === 0) return
    if (!window.confirm(`Delete ${selected.size} selected image(s)? This cannot be undone.`)) return
    const patches = Array.from(selected).map(key => unset([{ _key: key }]))
    onChange(PatchEvent.from(patches))
    setSelected(new Set())
    // Exit selection mode if gallery is now empty
    if (items.length - selected.size === 0) setSelectionMode(false)
  }, [selected, items.length, onChange])

  const handleClearAll = useCallback(() => {
    if (items.length === 0) return
    if (!window.confirm(`Delete ALL ${items.length} images from the gallery?\n\nThis cannot be undone.`)) return
    onChange(PatchEvent.from(unset()))
    setSelected(new Set())
    setSelectionMode(false)
  }, [items.length, onChange])

  // === Styles ===

  const toolbar: React.CSSProperties = {
    display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap',
    padding: '10px 12px', background: '#f2f2f5', borderRadius: 6, marginBottom: 12,
    fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 13,
  }
  const badge: React.CSSProperties = {
    fontWeight: 600, fontSize: 13, color: '#333',
  }
  const spacer: React.CSSProperties = { flex: 1 }
  const btn: React.CSSProperties = {
    padding: '5px 12px', border: '1px solid #ccc', borderRadius: 4,
    background: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 500,
    fontFamily: 'inherit', transition: 'background .15s',
  }
  const btnActive: React.CSSProperties = {
    ...btn, background: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a',
  }
  const btnDanger: React.CSSProperties = {
    ...btn, background: '#fff0f0', borderColor: '#e8a0a0', color: '#c44',
  }
  const btnDangerDisabled: React.CSSProperties = {
    ...btn, opacity: 0.35, cursor: 'default',
  }
  const listWrap: React.CSSProperties = {
    border: '1px solid #e4e4e8', borderRadius: 6, maxHeight: 520, overflowY: 'auto',
  }
  const row = (isSelected: boolean): React.CSSProperties => ({
    display: 'flex', gap: 10, alignItems: 'center', padding: '8px 12px',
    borderBottom: '1px solid #f0f0f2', cursor: 'pointer', userSelect: 'none',
    background: isSelected ? '#edf2ff' : 'transparent',
    transition: 'background .1s',
  })
  const thumbStyle: React.CSSProperties = {
    width: 48, height: 48, objectFit: 'cover', borderRadius: 4,
    background: '#f0f0f0', flexShrink: 0,
  }
  const textWrap: React.CSSProperties = {
    flex: 1, minWidth: 0, overflow: 'hidden',
  }
  const altLine: React.CSSProperties = {
    fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  }
  const metaLine: React.CSSProperties = {
    fontSize: 11, color: '#888', marginTop: 2,
  }
  const numStyle: React.CSSProperties = {
    fontSize: 11, color: '#aaa', flexShrink: 0, width: 28, textAlign: 'right',
  }

  return (
    <div>
      {/* === Toolbar === */}
      <div style={toolbar}>
        <span style={badge}>{items.length} images</span>
        <span style={spacer} />

        <button
          type="button"
          style={selectionMode ? btnActive : btn}
          onClick={toggleSelectionMode}
        >
          {selectionMode ? '✕ Exit Selection' : '☐ Select'}
        </button>

        {selectionMode && (
          <>
            <button type="button" style={btn} onClick={handleSelectAll}>
              {selected.size === items.length ? 'Deselect All' : 'Select All'}
            </button>
            <button
              type="button"
              style={selected.size > 0 ? btnDanger : btnDangerDisabled}
              onClick={handleDeleteSelected}
              disabled={selected.size === 0}
            >
              Delete Selected ({selected.size})
            </button>
          </>
        )}

        <button
          type="button"
          style={items.length > 0 ? btnDanger : btnDangerDisabled}
          onClick={handleClearAll}
          disabled={items.length === 0}
        >
          🗑 Clear All
        </button>
      </div>

      {/* === Selection Mode: custom list with checkboxes === */}
      {selectionMode ? (
        <div style={listWrap}>
          {items.length === 0 && (
            <div style={{ padding: 24, textAlign: 'center', color: '#999', fontSize: 13 }}>
              Gallery is empty
            </div>
          )}
          {items.map((item: any, i: number) => {
            const alt = item.alt || ''
            const fw = item.fullWidth
            const isSelected = selected.has(item._key)
            return (
              <div
                key={item._key}
                style={row(isSelected)}
                onClick={() => handleToggle(item._key)}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggle(item._key)}
                  onClick={(e) => e.stopPropagation()}
                  style={{ width: 16, height: 16, cursor: 'pointer', flexShrink: 0 }}
                />
                <img
                  src={thumbUrl(item)}
                  alt=""
                  style={thumbStyle}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <div style={textWrap}>
                  <div style={altLine}>
                    {alt ? `✅ ${alt}` : '⚠️ NO ALT TEXT'}
                  </div>
                  <div style={metaLine}>
                    {item.caption ? `"${item.caption}" ` : ''}
                    {fw ? '🔳 Full Width' : ''}
                  </div>
                </div>
                <span style={numStyle}>#{i + 1}</span>
              </div>
            )
          })}
        </div>
      ) : (
        /* === Normal Mode: default Sanity array input === */
        renderDefault(props)
      )}
    </div>
  )
}
