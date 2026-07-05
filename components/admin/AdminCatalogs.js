'use client'
import { useRef, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Trash2, FileText, Upload, AlertCircle, X, Check } from 'lucide-react'
import { adminApi } from '@/lib/api'
import { parseError } from '@/lib/utils'

function CatalogRow({ catalog, onDelete }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-border last:border-0 group">
      <div className="h-9 w-9 bg-surface-2 border border-border flex items-center justify-center flex-shrink-0">
        <FileText className="h-4 w-4 text-muted" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink truncate">{catalog.name}</p>
        <p className="text-xs text-muted">
          Added {new Date(catalog.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>
      {catalog.file_url && (
        <a
          href={catalog.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gold hover:underline hidden sm:block flex-shrink-0"
        >
          View PDF
        </a>
      )}
      <button
        onClick={() => onDelete(catalog)}
        className="p-1.5 text-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

function UploadForm({ onSave, onCancel, loading, error }) {
  const fileRef = useRef()
  const [name, setName] = useState('')
  const [file, setFile] = useState(null)

  const handleSubmit = () => {
    if (!name.trim() || !file) return
    const fd = new FormData()
    fd.append('name', name.trim())
    fd.append('file', file)
    onSave(fd)
  }

  return (
    <div className="bg-surface-2 border border-border p-5 mb-4 animate-fade-up">
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-xs mb-3">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </div>
      )}
      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-xs font-medium tracking-[0.1em] uppercase text-muted mb-1.5">
            Catalog Name <span className="text-gold">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-base text-sm"
            placeholder="e.g. Spring / Summer 2026"
          />
        </div>
        <div>
          <label className="block text-xs font-medium tracking-[0.1em] uppercase text-muted mb-1.5">
            PDF File <span className="text-gold">*</span>
          </label>
          <div
            className="border-2 border-dashed border-border hover:border-gold transition-colors p-5 text-center cursor-pointer"
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) setFile(f) }}
          >
            {file ? (
              <div className="flex items-center justify-center gap-2 text-sm text-ink">
                <FileText className="h-4 w-4 text-gold" />
                <span className="truncate max-w-xs">{file.name}</span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setFile(null) }}
                  className="text-muted hover:text-red-500"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <>
                <Upload className="h-5 w-5 text-muted mx-auto mb-2" />
                <p className="text-sm text-muted">Click or drag & drop PDF here</p>
                <p className="text-xs text-muted/60 mt-1">PDF only</p>
              </>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => { const f = e.target.files[0]; if (f) setFile(f) }}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading || !name.trim() || !file}
          className="btn-primary text-sm disabled:opacity-50"
        >
          {loading
            ? <span className="h-4 w-4 border-2 border-canvas border-t-transparent rounded-full animate-spin" />
            : <Check className="h-4 w-4" />}
          {loading ? 'Uploading…' : 'Upload Catalog'}
        </button>
        <button onClick={onCancel} className="btn-ghost text-sm"><X className="h-4 w-4" /> Cancel</button>
      </div>
    </div>
  )
}

export default function AdminCatalogs() {
  const qc = useQueryClient()
  const [adding,  setAdding]  = useState(false)
  const [error,   setError]   = useState('')
  const [confirm, setConfirm] = useState(null)

  const { data: catalogs, isLoading } = useQuery({
    queryKey: ['admin-catalogs'],
    queryFn:  () => adminApi.listCatalogs(),
    select:   (d) => Array.isArray(d.data) ? d.data : (d.data?.results ?? []),
  })

  const createMutation = useMutation({
    mutationFn: (form) => adminApi.createCatalog(form),
    onSuccess:  () => {
      qc.invalidateQueries({ queryKey: ['admin-catalogs'] })
      setAdding(false)
      setError('')
    },
    onError: (err) => setError(parseError(err)),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => adminApi.deleteCatalog(id),
    onSuccess:  () => {
      qc.invalidateQueries({ queryKey: ['admin-catalogs'] })
      setConfirm(null)
    },
    onError: (err) => setError(parseError(err)),
  })

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="section-label mb-2">Documents</p>
          <h1 className="font-display text-4xl font-light text-ink">Catalogs</h1>
          {catalogs && <p className="text-sm text-muted mt-1">{catalogs.length} catalog{catalogs.length !== 1 ? 's' : ''}</p>}
        </div>
        {!adding && (
          <button onClick={() => { setAdding(true); setError('') }} className="btn-primary">
            <Plus className="h-4 w-4" /> New Catalog
          </button>
        )}
      </div>

      {adding && (
        <UploadForm
          onSave={(fd) => createMutation.mutate(fd)}
          onCancel={() => { setAdding(false); setError('') }}
          loading={createMutation.isPending}
          error={error}
        />
      )}

      <div className="bg-canvas border border-border px-5">
        {isLoading ? (
          <p className="py-8 text-center text-muted text-sm">Loading…</p>
        ) : catalogs?.length === 0 ? (
          <p className="py-8 text-center text-muted text-sm">No catalogs yet. Upload one above.</p>
        ) : (
          catalogs?.map((catalog) => (
            <CatalogRow key={catalog.id} catalog={catalog} onDelete={(c) => setConfirm(c)} />
          ))
        )}
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setConfirm(null)} />
          <div className="relative bg-canvas border border-border p-8 w-full max-w-sm animate-fade-up">
            <p className="text-center text-sm text-muted mb-2">
              Delete catalog <strong>{confirm.name}</strong>?
            </p>
            <p className="text-center text-xs text-muted mb-6">
              Products linked to this catalog will lose the association.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(null)} className="btn-secondary flex-1 justify-center text-sm">Cancel</button>
              <button
                onClick={() => deleteMutation.mutate(confirm.id)}
                disabled={deleteMutation.isPending}
                className="btn-primary flex-1 justify-center text-sm bg-red-600 hover:bg-red-700"
              >
                {deleteMutation.isPending ? '…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
