import { useState } from 'react'

export default function AdminPanel({ data, onSave, onReset, onLogout }) {
  const [activeTab, setActiveTab] = useState('hero-about')
  const [formData, setFormData] = useState({ ...data })
  const [adminLang, setAdminLang] = useState('id') // 'id' or 'en' for editing

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleArrayChange = (section, index, field, value) => {
    setFormData((prev) => {
      const updatedArray = [...(prev[section] || [])]
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: value
      }
      return {
        ...prev,
        [section]: updatedArray
      }
    })
  }

  const handleAddItem = (section, defaultItem) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), defaultItem]
    }))
  }

  const handleRemoveItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: (prev[section] || []).filter((_, i) => i !== index)
    }))
  }

  // FileReader to convert file to Base64 string
  const handleImageFileChange = (e, callback) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        callback(reader.result)
      }
      reader.readAsDataURL(file)
    }
    e.target.value = '' // Reset value to allow same file selection again
  }

  const handleSave = () => {
    onSave(formData)
    alert('Perubahan berhasil disimpan!')
  }

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin menyetel ulang data ke awal? Semua perubahan akan hilang.')) {
      onReset()
      // Reload states
      window.location.reload()
    }
  }

  const tabs = [
    { id: 'hero-about', name: 'Hero & About' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'activities-orgs', name: 'Kegiatan & Organisasi' },
    { id: 'certificates', name: 'Sertifikat & Pencapaian' },
    { id: 'contact-footer', name: 'Kontak & Footer' }
  ]

  const inputClass = "w-full bg-bg3 border border-border-custom text-text-custom rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
  const labelClass = "block text-xs font-mono text-text-muted uppercase tracking-wider mb-1"
  const secTitleClass = "text-base font-heading font-semibold text-accent mb-4 border-b border-border-custom pb-2"
  const formRowClass = "mb-4"

  const logoTypes = ['Python', 'R', 'SQL', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Tableau', 'Jupyter', 'Google Colab', 'Power BI', 'Git']

  return (
    <div className="min-h-screen bg-bg flex flex-col text-text-custom font-sans">
      {/* HEADER NAVBAR */}
      <div className="px-6 py-4 border-b border-border-custom flex items-center justify-between bg-bg2 sticky top-0 z-50 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">⚙️</span>
          <h2 className="font-heading font-bold text-lg">Admin Dashboard Panel</h2>
        </div>

        {/* LANGUAGE SELECTOR FOR EDITING */}
        <div className="flex items-center gap-1 bg-bg3 p-1 rounded-lg border border-border-custom">
          <button
            type="button"
            onClick={() => setAdminLang('id')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer border-none ${
              adminLang === 'id'
                ? 'bg-accent text-[#fff]'
                : 'text-text-muted hover:text-text-custom'
            }`}
          >
            🇮🇩 Indonesia (ID)
          </button>
          <button
            type="button"
            onClick={() => setAdminLang('en')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer border-none ${
              adminLang === 'en'
                ? 'bg-accent text-[#fff]'
                : 'text-text-muted hover:text-text-custom'
            }`}
          >
            🇬🇧 English (EN)
          </button>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg text-sm transition-colors cursor-pointer"
          >
            Reset Data ke Awal
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-accent text-[#fff] hover:opacity-90 rounded-lg text-sm font-semibold transition-opacity cursor-pointer border-none"
          >
            Simpan Perubahan
          </button>
          <button
            onClick={() => {
              window.history.pushState({}, '', '/')
              window.dispatchEvent(new Event('popstate'))
            }}
            className="px-4 py-2 border border-border-custom hover:bg-bg3 rounded-lg text-sm transition-colors cursor-pointer"
          >
            Lihat Portfolio
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-[#fff] rounded-lg text-sm font-semibold transition-colors cursor-pointer border-none"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden h-[calc(100vh-69px)]">
        {/* SIDE TABS BAR */}
        <div className="w-64 border-r border-border-custom bg-bg2/40 p-4 flex flex-col gap-1 shrink-0">
          <div className="text-xs font-mono text-text-muted uppercase tracking-widest px-4 mb-2">Menu Konten</div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-accent/15 text-accent border-l-2 border-accent'
                  : 'text-text-muted hover:bg-bg3 hover:text-text-custom'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* DETAILS WORKSPACE */}
        <div className="flex-1 p-8 overflow-y-auto bg-bg">
          <div className="max-w-3xl mx-auto">
            
            {/* HERO & ABOUT */}
            {activeTab === 'hero-about' && (
              <div>
                <h3 className={secTitleClass}>Hero Section</h3>
                
                {/* Profile Picture Uploader */}
                <div className="mb-6 p-4 bg-bg2 border border-border-custom rounded-xl flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-bg3 border border-border-custom overflow-hidden flex items-center justify-center shrink-0">
                    {formData.hero.profileImg ? (
                      <img src={formData.hero.profileImg} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl text-text-muted">👤</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className={labelClass}>Foto Profil</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileChange(e, (base64) => handleChange('hero', 'profileImg', base64))}
                      className="text-xs text-text-muted file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-accent/20 file:text-accent hover:file:bg-accent/30 file:cursor-pointer"
                    />
                    {formData.hero.profileImg && (
                      <button
                        onClick={() => handleChange('hero', 'profileImg', '')}
                        className="mt-1 text-xs text-red-400 hover:underline cursor-pointer border-none bg-transparent block"
                      >
                        Hapus Foto
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={formRowClass}>
                    <label className={labelClass}>Hero Eyebrow ({adminLang.toUpperCase()})</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={formData.hero[`eyebrow_${adminLang}`] || ''}
                      onChange={(e) => handleChange('hero', `eyebrow_${adminLang}`, e.target.value)}
                    />
                  </div>
                  <div className={formRowClass}>
                    <label className={labelClass}>Nama Lengkap (Sama)</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={formData.hero.name || ''}
                      onChange={(e) => handleChange('hero', 'name', e.target.value)}
                    />
                  </div>
                </div>
                <div className={formRowClass}>
                  <label className={labelClass}>Title / Deskripsi Jabatan ({adminLang.toUpperCase()})</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.hero[`title_${adminLang}`] || ''}
                    onChange={(e) => handleChange('hero', `title_${adminLang}`, e.target.value)}
                  />
                </div>
                <div className={formRowClass}>
                  <label className={labelClass}>Deskripsi Perkenalan ({adminLang.toUpperCase()})</label>
                  <textarea
                    rows="3"
                    className={inputClass}
                    value={formData.hero[`desc_${adminLang}`] || ''}
                    onChange={(e) => handleChange('hero', `desc_${adminLang}`, e.target.value)}
                  ></textarea>
                </div>

                <h3 className={`${secTitleClass} mt-8`}>About Section</h3>
                <div className={formRowClass}>
                  <label className={labelClass}>Judul Section ({adminLang.toUpperCase()})</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.about[`title_${adminLang}`] || ''}
                    onChange={(e) => handleChange('about', `title_${adminLang}`, e.target.value)}
                  />
                </div>
                <div className={formRowClass}>
                  <label className={labelClass}>Paragraf 1 ({adminLang.toUpperCase()})</label>
                  <textarea
                    rows="3"
                    className={inputClass}
                    value={formData.about[`text1_${adminLang}`] || ''}
                    onChange={(e) => handleChange('about', `text1_${adminLang}`, e.target.value)}
                  ></textarea>
                </div>
                <div className={formRowClass}>
                  <label className={labelClass}>Paragraf 2 ({adminLang.toUpperCase()})</label>
                  <textarea
                    rows="3"
                    className={inputClass}
                    value={formData.about[`text2_${adminLang}`] || ''}
                    onChange={(e) => handleChange('about', `text2_${adminLang}`, e.target.value)}
                  ></textarea>
                </div>
                <div className={formRowClass}>
                  <label className={labelClass}>Paragraf 3 ({adminLang.toUpperCase()})</label>
                  <textarea
                    rows="3"
                    className={inputClass}
                    value={formData.about[`text3_${adminLang}`] || ''}
                    onChange={(e) => handleChange('about', `text3_${adminLang}`, e.target.value)}
                  ></textarea>
                </div>

                <h4 className="text-sm font-semibold mb-2 text-text-custom mt-6 border-b border-border-custom pb-1 font-heading">Fakta Akademis (Quick Facts)</h4>
                {(formData.about.details || []).map((detail, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-4 mb-3 items-center">
                    <div>
                      <label className={labelClass}>Label {idx + 1} ({adminLang.toUpperCase()})</label>
                      <input
                        type="text"
                        placeholder="Label"
                        className={inputClass}
                        value={detail[`label_${adminLang}`] || ''}
                        onChange={(e) => {
                          const newDetails = [...formData.about.details]
                          newDetails[idx][`label_${adminLang}`] = e.target.value
                          setFormData((prev) => ({
                            ...prev,
                            about: { ...prev.about, details: newDetails }
                          }))
                        }}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Value {idx + 1} ({adminLang.toUpperCase()})</label>
                      <input
                        type="text"
                        placeholder="Nilai"
                        className={inputClass}
                        value={detail[`value_${adminLang}`] || ''}
                        onChange={(e) => {
                          const newDetails = [...formData.about.details]
                          newDetails[idx][`value_${adminLang}`] = e.target.value
                          setFormData((prev) => ({
                            ...prev,
                            about: { ...prev.about, details: newDetails }
                          }))
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SKILLS */}
            {activeTab === 'skills' && (
              <div>
                <div className="flex justify-between items-center mb-4 border-b border-border-custom pb-2">
                  <h3 className="text-base font-heading font-semibold text-accent m-0">Skills (CRUD)</h3>
                  <button
                    onClick={() => handleAddItem('skills', { name: 'Skill Baru', level_id: 'Menengah', level_en: 'Intermediate', logoType: 'Python' })}
                    className="px-3 py-1.5 bg-accent text-[#fff] hover:opacity-90 rounded-lg text-xs font-semibold cursor-pointer transition-opacity border-none"
                  >
                    + Tambah Skill Baru
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {(formData.skills || []).map((skill, index) => (
                    <div key={index} className="p-4 bg-bg2 border border-border-custom rounded-xl flex items-center gap-3">
                      <div className="flex-1 grid grid-cols-3 gap-3">
                        <div>
                          <label className={labelClass}>Nama Skill (Sama)</label>
                          <input
                            type="text"
                            className={inputClass}
                            value={skill.name || ''}
                            onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Level Keahlian ({adminLang.toUpperCase()})</label>
                          <input
                            type="text"
                            className={inputClass}
                            value={skill[`level_${adminLang}`] || ''}
                            onChange={(e) => handleArrayChange('skills', index, `level_${adminLang}`, e.target.value)}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Logo / Ikon</label>
                          <select
                            className={inputClass}
                            value={skill.logoType || 'Python'}
                            onChange={(e) => handleArrayChange('skills', index, 'logoType', e.target.value)}
                          >
                            {logoTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem('skills', index)}
                        className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer border-none bg-transparent mt-4 text-base"
                        title="Hapus Skill"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROJECTS */}
            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-4 border-b border-border-custom pb-2">
                  <h3 className="text-base font-heading font-semibold text-accent m-0">Projects (CRUD)</h3>
                  <button
                    onClick={() => handleAddItem('projects', { type_id: 'Aplikasi Web', type_en: 'Web App', name_id: 'Project Baru', name_en: 'New Project', desc_id: 'Deskripsi...', desc_en: 'Description...', tags: 'Tag1, Tag2', link: '#', isPaper: false })}
                    className="px-3 py-1.5 bg-accent text-[#fff] hover:opacity-90 rounded-lg text-xs font-semibold cursor-pointer transition-opacity border-none"
                  >
                    + Tambah Project Baru
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {(formData.projects || []).map((proj, index) => (
                    <div key={index} className="p-4 bg-bg2 border border-border-custom rounded-xl flex gap-3 items-start">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div className="col-span-2 grid grid-cols-3 gap-3">
                          <div>
                            <label className={labelClass}>Kategori ({adminLang.toUpperCase()})</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={proj[`type_${adminLang}`] || ''}
                              onChange={(e) => handleArrayChange('projects', index, `type_${adminLang}`, e.target.value)}
                            />
                          </div>
                          <div className="col-span-2">
                            <label className={labelClass}>Nama Project ({adminLang.toUpperCase()})</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={proj[`name_${adminLang}`] || ''}
                              onChange={(e) => handleArrayChange('projects', index, `name_${adminLang}`, e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-span-2">
                          <label className={labelClass}>Deskripsi Singkat ({adminLang.toUpperCase()})</label>
                          <textarea
                            rows="2"
                            className={inputClass}
                            value={proj[`desc_${adminLang}`] || ''}
                            onChange={(e) => handleArrayChange('projects', index, `desc_${adminLang}`, e.target.value)}
                          ></textarea>
                        </div>
                        <div>
                          <label className={labelClass}>Tags (Pisahkan koma)</label>
                          <input
                            type="text"
                            className={inputClass}
                            value={proj.tags || ''}
                            onChange={(e) => handleArrayChange('projects', index, 'tags', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Link / URL Project</label>
                          <input
                            type="text"
                            className={inputClass}
                            value={proj.link || ''}
                            onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)}
                          />
                        </div>
                        <div className="col-span-2 flex items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            id={`proj-paper-${index}`}
                            checked={proj.isPaper || false}
                            onChange={(e) => handleArrayChange('projects', index, 'isPaper', e.target.checked)}
                            className="accent-accent"
                          />
                          <label htmlFor={`proj-paper-${index}`} className="text-sm cursor-pointer select-none">Tampilkan Label Kategori sebagai Paper (Oranye)</label>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem('projects', index)}
                        className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer border-none bg-transparent text-base mt-2"
                        title="Hapus Project"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACTIVITIES & ORGS */}
            {activeTab === 'activities-orgs' && (
              <div>
                {/* ACTIVITIES WITH IMAGE UPLOAD */}
                <div className="flex justify-between items-center mb-4 border-b border-border-custom pb-2">
                  <h3 className="text-base font-heading font-semibold text-accent m-0">Dokumentasi Keaktifan (CRUD & Upload Foto)</h3>
                  <button
                    onClick={() => handleAddItem('activities', { imgText: '[ Foto Kegiatan ]', imgUrl: '', date: '2025', title_id: 'Kegiatan Baru', title_en: 'New Activity', desc_id: 'Deskripsi...', desc_en: 'Description...' })}
                    className="px-3 py-1.5 bg-accent text-[#fff] hover:opacity-90 rounded-lg text-xs font-semibold cursor-pointer transition-opacity border-none"
                  >
                    + Tambah Kegiatan Baru
                  </button>
                </div>
                <div className="flex flex-col gap-4 mb-8">
                  {(formData.activities || []).map((act, index) => (
                    <div key={index} className="p-4 bg-bg2 border border-border-custom rounded-xl flex gap-4 items-start">
                      {/* Photo preview/uploader section */}
                      <div className="w-32 flex flex-col gap-2 shrink-0">
                        <div className="w-full h-24 bg-bg3 border border-border-custom rounded-lg overflow-hidden flex items-center justify-center text-center p-1">
                          {act.imgUrl ? (
                            <img src={act.imgUrl} alt="Kegiatan" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] text-text-muted font-mono">{act.imgText || '[ Foto ]'}</span>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, (base64) => handleArrayChange('activities', index, 'imgUrl', base64))}
                          className="hidden"
                          id={`act-upload-input-${index}`}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById(`act-upload-input-${index}`).click()}
                          className="px-2 py-1 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg text-[10px] text-center font-bold block cursor-pointer transition-colors border-none w-full"
                        >
                          Pilih Foto
                        </button>
                        {act.imgUrl && (
                          <button
                            onClick={() => handleArrayChange('activities', index, 'imgUrl', '')}
                            className="text-[10px] text-red-400 hover:underline cursor-pointer border-none bg-transparent"
                          >
                            Hapus Foto
                          </button>
                        )}
                      </div>

                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div className="grid grid-cols-3 gap-3 col-span-2">
                          <div>
                            <label className={labelClass}>Teks Fallback Gambar</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={act.imgText || ''}
                              onChange={(e) => handleArrayChange('activities', index, 'imgText', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Tahun Kegiatan</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={act.date || ''}
                              onChange={(e) => handleArrayChange('activities', index, 'date', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Judul Kegiatan ({adminLang.toUpperCase()})</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={act[`title_${adminLang}`] || ''}
                              onChange={(e) => handleArrayChange('activities', index, `title_${adminLang}`, e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-span-2">
                          <label className={labelClass}>Deskripsi Peran ({adminLang.toUpperCase()})</label>
                          <textarea
                            rows="2"
                            className={inputClass}
                            value={act[`desc_${adminLang}`] || ''}
                            onChange={(e) => handleArrayChange('activities', index, `desc_${adminLang}`, e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem('activities', index)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer border-none bg-transparent text-base mt-2"
                        title="Hapus Kegiatan"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

                {/* ORGANIZATIONS */}
                <div className="flex justify-between items-center mb-4 border-b border-border-custom pb-2">
                  <h3 className="text-base font-heading font-semibold text-accent m-0">Organisasi &amp; Kepanitiaan (CRUD)</h3>
                  <button
                    onClick={() => handleAddItem('organizations', { icon: '🏛️', name_id: 'Organisasi Baru', name_en: 'New Organization', role_id: 'Peran', role_en: 'Role', period: '2025', desc_id: 'Deskripsi...', desc_en: 'Description...' })}
                    className="px-3 py-1.5 bg-accent text-[#fff] hover:opacity-90 rounded-lg text-xs font-semibold cursor-pointer transition-opacity border-none"
                  >
                    + Tambah Organisasi Baru
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {(formData.organizations || []).map((org, index) => (
                    <div key={index} className="p-4 bg-bg2 border border-border-custom rounded-xl flex gap-3 items-start">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div className="grid grid-cols-4 gap-3 col-span-2">
                          <div>
                            <label className={labelClass}>Ikon Emoji</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={org.icon || ''}
                              onChange={(e) => handleArrayChange('organizations', index, 'icon', e.target.value)}
                            />
                          </div>
                          <div className="col-span-2">
                            <label className={labelClass}>Nama Organisasi ({adminLang.toUpperCase()})</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={org[`name_${adminLang}`] || ''}
                              onChange={(e) => handleArrayChange('organizations', index, `name_${adminLang}`, e.target.value)}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Periode Aktif</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={org.period || ''}
                              onChange={(e) => handleArrayChange('organizations', index, 'period', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-span-2">
                          <label className={labelClass}>Jabatan / Peran ({adminLang.toUpperCase()})</label>
                          <input
                            type="text"
                            className={inputClass}
                            value={org[`role_${adminLang}`] || ''}
                            onChange={(e) => handleArrayChange('organizations', index, `role_${adminLang}`, e.target.value)}
                          />
                        </div>
                        <div className="col-span-2">
                          <label className={labelClass}>Deskripsi Kontribusi ({adminLang.toUpperCase()})</label>
                          <textarea
                            rows="2"
                            className={inputClass}
                            value={org[`desc_${adminLang}`] || ''}
                            onChange={(e) => handleArrayChange('organizations', index, `desc_${adminLang}`, e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem('organizations', index)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer border-none bg-transparent text-base mt-2"
                        title="Hapus Organisasi"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CERTIFICATES */}
            {activeTab === 'certificates' && (
              <div>
                <div className="flex justify-between items-center mb-4 border-b border-border-custom pb-2">
                  <h3 className="text-base font-heading font-semibold text-accent m-0">Sertifikat &amp; Pencapaian (CRUD &amp; Upload Foto)</h3>
                  <button
                    onClick={() => handleAddItem('certificates', { title_id: 'Sertifikat Baru', title_en: 'New Certificate', issuer_id: 'Nama Instansi', issuer_en: 'Issuing Body', date: '2025', credentialUrl: '', imgUrl: '' })}
                    className="px-3 py-1.5 bg-accent text-[#fff] hover:opacity-90 rounded-lg text-xs font-semibold cursor-pointer transition-opacity border-none"
                  >
                    + Tambah Sertifikat Baru
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {(formData.certificates || []).map((cert, index) => (
                    <div key={index} className="p-4 bg-bg2 border border-border-custom rounded-xl flex gap-4 items-start">
                      
                      {/* Certificate image uploader */}
                      <div className="w-32 flex flex-col gap-2 shrink-0">
                        <div className="w-full h-24 bg-bg3 border border-border-custom rounded-lg overflow-hidden flex items-center justify-center text-center p-1">
                          {cert.imgUrl ? (
                            <img src={cert.imgUrl} alt="Sertifikat" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] text-text-muted font-mono">[ Foto Sertifikat ]</span>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, (base64) => handleArrayChange('certificates', index, 'imgUrl', base64))}
                          className="hidden"
                          id={`cert-upload-input-${index}`}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById(`cert-upload-input-${index}`).click()}
                          className="px-2 py-1 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg text-[10px] text-center font-bold block cursor-pointer transition-colors border-none w-full"
                        >
                          Pilih Foto
                        </button>
                        {cert.imgUrl && (
                          <button
                            onClick={() => handleArrayChange('certificates', index, 'imgUrl', '')}
                            className="text-[10px] text-red-400 hover:underline cursor-pointer border-none bg-transparent"
                          >
                            Hapus Foto
                          </button>
                        )}
                      </div>

                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <label className={labelClass}>Nama Sertifikat/Pencapaian ({adminLang.toUpperCase()})</label>
                          <input
                            type="text"
                            className={inputClass}
                            value={cert[`title_${adminLang}`] || ''}
                            onChange={(e) => handleArrayChange('certificates', index, `title_${adminLang}`, e.target.value)}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Instansi Penerbit ({adminLang.toUpperCase()})</label>
                          <input
                            type="text"
                            className={inputClass}
                            value={cert[`issuer_${adminLang}`] || ''}
                            onChange={(e) => handleArrayChange('certificates', index, `issuer_${adminLang}`, e.target.value)}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Tahun / Waktu Perolehan</label>
                          <input
                            type="text"
                            placeholder="Contoh: 2024"
                            className={inputClass}
                            value={cert.date || ''}
                            onChange={(e) => handleArrayChange('certificates', index, 'date', e.target.value)}
                          />
                        </div>
                        <div className="col-span-2">
                          <label className={labelClass}>Link Kredensial / Verifikasi (Opsional)</label>
                          <input
                            type="text"
                            placeholder="https://example.com/verify/..."
                            className={inputClass}
                            value={cert.credentialUrl || ''}
                            onChange={(e) => handleArrayChange('certificates', index, 'credentialUrl', e.target.value)}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveItem('certificates', index)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer border-none bg-transparent text-base mt-2"
                        title="Hapus Sertifikat"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT & FOOTER */}
            {activeTab === 'contact-footer' && (
              <div>
                <h3 className={secTitleClass}>Contact Section</h3>
                <div className={formRowClass}>
                  <label className={labelClass}>Judul Section Kontak ({adminLang.toUpperCase()})</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.contact[`title_${adminLang}`] || ''}
                    onChange={(e) => handleChange('contact', `title_${adminLang}`, e.target.value)}
                  />
                </div>
                <div className={formRowClass}>
                  <label className={labelClass}>Sub-deskripsi Kontak ({adminLang.toUpperCase()})</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.contact[`sub_${adminLang}`] || ''}
                    onChange={(e) => handleChange('contact', `sub_${adminLang}`, e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className={formRowClass}>
                    <label className={labelClass}>Email Address</label>
                    <input
                      type="email"
                      className={inputClass}
                      value={formData.contact.email || ''}
                      onChange={(e) => handleChange('contact', 'email', e.target.value)}
                    />
                  </div>
                  <div className={formRowClass}>
                    <label className={labelClass}>LinkedIn Link</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={formData.contact.linkedin || ''}
                      onChange={(e) => handleChange('contact', 'linkedin', e.target.value)}
                    />
                  </div>
                  <div className={formRowClass}>
                    <label className={labelClass}>GitHub Link</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={formData.contact.github || ''}
                      onChange={(e) => handleChange('contact', 'github', e.target.value)}
                    />
                  </div>
                </div>

                <h3 className={`${secTitleClass} mt-8`}>Footer Section</h3>
                <div className={formRowClass}>
                  <label className={labelClass}>Teks Footer ({adminLang.toUpperCase()})</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.footer[`text_${adminLang}`] || ''}
                    onChange={(e) => handleChange('footer', `text_${adminLang}`, e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
