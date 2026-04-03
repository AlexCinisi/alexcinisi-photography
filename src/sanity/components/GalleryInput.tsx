import React, { useState, useMemo, useCallback } from 'react'
import { type ArrayOfObjectsInputProps, PatchEvent, unset } from 'sanity'
import { useClient } from 'sanity'
import imageUrlBuilder from '@sanity/image-url'

/**
 * Custom gallery input for Sanity Studio.
 * 
 * Three modes:
 * - List (default): Sanity's native array input with thumbnail + alt text preview
 * - Grid: thumbnail grid for quick visual overview
 * - Selection: checkboxes for bulk delete + clear all
 */
export function GalleryInput(props: ArrayOfObjectsInputProps) {
  const { value = [], onChange, renderDefault } = props
  const items = value as any[]

  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'select'>('list')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  // Image URL builder
  const client = useClient({ apiVersion: '2024-01-01' })
  const builder = useMemo(() => imageUrlBuilder(client), [client])

  function thumbUrl(item: any, size: number = 80): string {
    try {
      return builder.image(item).width(size).height(size).fit('crop').auto('format').url()
    } catch {
      return ''
    }
  }

  // === Selection actions ===

  const enterSelect = useCallback(() => {
    setViewMode('select')
    setSelected(new Set())
  }, [])

  const exitSelect = useCallback(() => {
    setViewMode('list')
    setSelected(new Set())
  }, [])

  const handleSelectAll = useCallback(() => {
    if (selected.size === items.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(items.map((item: any) => item._key)))
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
    const msg = selected.size === 1
      ? 'Delete 1 selected image?'
      : `Delete ${selected.size} selected images?`
    if (!window.confirm(msg)) return
    const patches = Array.from(selected).map(key => unset([{ _key: key }]))
    onChange(PatchEvent.from(patches))
    setSelected(new Set())
    if (items.length - selected.size === 0) exitSelect()
  }, [selected, items.length, onChange, exitSelect])

  const handleClearAll = useCallback(() => {
    if (items.length === 0) return
    if (!window.confirm(`Delete ALL ${items.length} images from the gallery?\n\nThis cannot be undone.`)) return
    onChange(PatchEvent.from(unset()))
    setSelected(new Set())
    exitSelect()
  }, [items.length, onChange, exitSelect])

  // === Shared styles (no shorthand/longhand conflicts) ===

  const S = {
    toolbar: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      flexWrap: 'wrap' as const,
      padding: '10px 12px',
      backgroundColor: '#f3f3f6',
      borderRadius: '6px',
      marginBottom: '12px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '13px',
    },
    count: {
      fontWeight: 600,
      fontSize: '13px',
      color: '#333',
    },
    spacer: { flex: 1 },
    btn: {
      padding: '5px 12px',
      borderWidth: '1px',
      borderStyle: 'solid' as const,
      borderColor: '#ccc',
      borderRadius: '4px',
      backgroundColor: '#fff',
      color: '#333',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: 500,
      fontFamily: 'inherit',
    },
    btnActive: {
      padding: '5px 12px',
      borderWidth: '1px',
      borderStyle: 'solid' as const,
      borderColor: '#1a1a1a',
      borderRadius: '4px',
      backgroundColor: '#1a1a1a',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: 500,
      fontFamily: 'inherit',
    },
    btnDanger: {
      padding: '5px 12px',
      borderWidth: '1px',
      borderStyle: 'solid' as const,
      borderColor: '#e8a0a0',
      borderRadius: '4px',
      backgroundColor: '#fff0f0',
      color: '#c44',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: 500,
      fontFamily: 'inherit',
    },
    btnDisabled: {
      padding: '5px 12px',
      borderWidth: '1px',
      borderStyle: 'solid' as const,
      borderColor: '#ddd',
      borderRadius: '4px',
      backgroundColor: '#fafafa',
      color: '#bbb',
      cursor: 'default' as const,
      fontSize: '12px',
      fontWeight: 500,
      fontFamily: 'inherit',
    },
    // Grid view
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
      gap: '6px',
      padding: '4px',
    },
    gridThumb: {
      aspectRatio: '1',
      objectFit: 'cover' as const,
      borderRadius: '4px',
      backgroundColor: '#f0f0f0',
      width: '100%',
      display: 'block',
    },
    gridItem: {
      position: 'relative' as const,
    },
    gridBadge: {
      position: 'absolute' as const,
      top: '3px',
      left: '3px',
      fontSize: '10px',
      lineHeight: '1',
    },
    // Select view
    listWrap: {
      borderWidth: '1px',
      borderStyle: 'solid' as const,
      borderColor: '#e4e4e8',
      borderRadius: '6px',
      maxHeight: '520px',
      overflowY: 'auto' as const,
    },
    row: (isSelected: boolean) => ({
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      padding: '8px 12px',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid' as const,
      borderBottomColor: '#f0f0f2',
      cursor: 'pointer',
      userSelect: 'none' as const,
      backgroundColor: isSelected ? '#edf2ff' : 'transparent',
    }),
    thumb: {
      width: '48px',
      height: '48px',
      objectFit: 'cover' as const,
      borderRadius: '4px',
      backgroundColor: '#f0f0f0',
      flexShrink: 0,
    },
    textWrap: {
      flex: 1,
      minWidth: 0,
      overflow: 'hidden' as const,
    },
    altLine: {
      fontSize: '13px',
      whiteSpace: 'nowrap' as const,
      overflow: 'hidden' as const,
      textOverflow: 'ellipsis' as const,
    },
    metaLine: {
      fontSize: '11px',
      color: '#888',
      marginTop: '2px',
    },
    num: {
      fontSize: '11px',
      color: '#aaa',
      flexShrink: 0,
      width: '28px',
      textAlign: 'right' as const,
    },
    checkbox: {
      width: '16px',
      height: '16px',
      cursor: 'pointer',
      flexShrink: 0,
      accentColor: '#1a1a1a',
    },
    empty: {
      padding: '24px',
      textAlign: 'center' as const,
      color: '#999',
      fontSize: '13px',
    },
  }

  return (
    <div>
      {/* ═══ Toolbar ═══ */}
      <div style={S.toolbar}>
        <span style={S.count}>{items.length} images</span>
        <span style={S.spacer} />

        {viewMode !== 'select' && (
          <>
            {/* View toggle: List / Grid */}
            <button
              type="button"
              style={viewMode === 'list' ? S.btnActive : S.btn}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              ☰ List
            </button>
            <button
              type="button"
              style={viewMode === 'grid' ? S.btnActive : S.btn}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              ▦ Grid
            </button>

            {/* Enter selection mode */}
            <button type="button" style={S.btn} onClick={enterSelect}>
              ☐ Select
            </button>
          </>
        )}

        {viewMode === 'select' && (
          <>
            <button type="button" style={S.btn} onClick={handleSelectAll}>
              {selected.size === items.length && items.length > 0
                ? 'Deselect All'
                : 'Select All'}
            </button>
            <button
              type="button"
              style={selected.size > 0 ? S.btnDanger : S.btnDisabled}
              onClick={handleDeleteSelected}
              disabled={selected.size === 0}
            >
              Delete ({selected.size})
            </button>
            <button
              type="button"
              style={items.length > 0 ? S.btnDanger : S.btnDisabled}
              onClick={handleClearAll}
              disabled={items.length === 0}
            >
              🗑 Clear All
            </button>
            <button type="button" style={S.btn} onClick={exitSelect}>
              ✕ Done
            </button>
          </>
        )}
      </div>

      {/* ═══ List Mode: Sanity default with thumbnails ═══ */}
      {viewMode === 'list' && renderDefault(props)}

      {/* ═══ Grid Mode: visual thumbnail overview ═══ */}
      {viewMode === 'grid' && (
        <div style={S.grid}>
          {items.length === 0 && (
            <div style={{ ...S.empty, gridColumn: '1 / -1' }}>Gallery is empty</div>
          )}
          {items.map((item: any) => {
            const alt = item.alt || ''
            return (
              <div key={item._key} style={S.gridItem} title={alt || 'No alt text'}>
                <img
                  src={thumbUrl(item, 180)}
                  alt=""
                  style={S.gridThumb}
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
                <span style={S.gridBadge}>{alt ? '✅' : '⚠️'}</span>
              </div>
            )
          })}
        </div>
      )}

      {/* ═══ Selection Mode: checkboxes + bulk actions ═══ */}
      {viewMode === 'select' && (
        <div style={S.listWrap}>
          {items.length === 0 && <div style={S.empty}>Gallery is empty</div>}
          {items.map((item: any, i: number) => {
            const alt = item.alt || ''
            const fw = item.fullWidth
            const key = item._key
            const isChecked = selected.has(key)
            return (
              <div
                key={key}
                style={S.row(isChecked)}
                onClick={() => handleToggle(key)}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggle(key)}
                  onClick={(e) => e.stopPropagation()}
                  style={S.checkbox}
                />
                <img
                  src={thumbUrl(item)}
                  alt=""
                  style={S.thumb}
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
                <div style={S.textWrap}>
                  <div style={S.altLine}>
                    {alt ? `✅ ${alt}` : '⚠️ NO ALT TEXT'}
                  </div>
                  <div style={S.metaLine}>
                    {item.caption ? `"${item.caption}" ` : ''}
                    {fw ? '🔳 Full Width' : ''}
                  </div>
                </div>
                <span style={S.num}>#{i + 1}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
