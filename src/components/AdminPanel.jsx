import { useState } from 'react'

export default function AdminPanel({ data, onSave, onReset, onLogout }) {
  const [activeTab, setActiveTab] = useState('hero-about')
  const [formData, setFormData] = useState({ ...data })

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
      const updatedArray = [...prev[section]]
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
      [section]: [...prev[section], defaultItem]
    }))
  }

  const handleRemoveItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
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
      <div className="px-6 py-4 border-b border-border-custom flex items-center justify-between bg-bg2 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="text-xl">⚙️</span>
          <h2 className="font-heading font-bold text-lg">Admin Dashboard Panel</h2>
        </div>
        <div className="flex items-center gap-3">
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
                    <label className={labelClass}>Hero Eyebrow</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={formData.hero.eyebrow}
                      onChange={(e) => handleChange('hero', 'eyebrow', e.target.value)}
                    />
                  </div>
                  <div className={formRowClass}>
                    <label className={labelClass}>Nama Lengkap</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={formData.hero.name}
                      onChange={(e) => handleChange('hero', 'name', e.target.value)}
                    />
                  </div>
                </div>
                <div className={formRowClass}>
                  <label className={labelClass}>Title / Deskripsi Jabatan</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.hero.title}
                    onChange={(e) => handleChange('hero', 'title', e.target.value)}
                  />
                </div>
                <div className={formRowClass}>
                  <label className={labelClass}>Deskripsi Perkenalan</label>
                  <textarea
                    rows="3"
                    className={inputClass}
                    value={formData.hero.desc}
                    onChange={(e) => handleChange('hero', 'desc', e.target.value)}
                  ></textarea>
                </div>

                <h3 className={`${secTitleClass} mt-8`}>About Section</h3>
                <div className={formRowClass}>
                  <label className={labelClass}>Judul Section</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.about.title}
                    onChange={(e) => handleChange('about', 'title', e.target.value)}
                  />
                </div>
                <div className={formRowClass}>
                  <label className={labelClass}>Paragraf 1</label>
                  <textarea
                    rows="3"
                    className={inputClass}
                    value={formData.about.text1}
                    onChange={(e) => handleChange('about', 'text1', e.target.value)}
                  ></textarea>
                </div>
                <div className={formRowClass}>
                  <label className={labelClass}>Paragraf 2</label>
                  <textarea
                    rows="3"
                    className={inputClass}
                    value={formData.about.text2}
                    onChange={(e) => handleChange('about', 'text2', e.target.value)}
                  ></textarea>
                </div>
                <div className={formRowClass}>
                  <label className={labelClass}>Paragraf 3</label>
                  <textarea
                    rows="3"
                    className={inputClass}
                    value={formData.about.text3}
                    onChange={(e) => handleChange('about', 'text3', e.target.value)}
                  ></textarea>
                </div>

                <h4 className="text-sm font-semibold mb-2 text-text-custom mt-6 border-b border-border-custom pb-1 font-heading">Fakta Akademis (Quick Facts)</h4>
                {formData.about.details.map((detail, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-4 mb-3 items-center">
                    <div>
                      <label className={labelClass}>Label {idx + 1}</label>
                      <input
                        type="text"
                        placeholder="Label"
                        className={inputClass}
                        value={detail.label}
                        onChange={(e) => {
                          const newDetails = [...formData.about.details]
                          newDetails[idx].label = e.target.value
                          setFormData((prev) => ({
                            ...prev,
                            about: { ...prev.about, details: newDetails }
                          }))
                        }}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Value {idx + 1}</label>
                      <input
                        type="text"
                        placeholder="Nilai"
                        className={inputClass}
                        value={detail.value}
                        onChange={(e) => {
                          const newDetails = [...formData.about.details]
                          newDetails[idx].value = e.target.value
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
                    onClick={() => handleAddItem('skills', { name: 'Skill Baru', level: 'Intermediate', logoType: 'Python' })}
                    className="px-3 py-1.5 bg-accent text-[#fff] hover:opacity-90 rounded-lg text-xs font-semibold cursor-pointer transition-opacity border-none"
                  >
                    + Tambah Skill Baru
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="p-4 bg-bg2 border border-border-custom rounded-xl flex items-center gap-3">
                      <div className="flex-1 grid grid-cols-3 gap-3">
                        <div>
                          <label className={labelClass}>Nama Skill</label>
                          <input
                            type="text"
                            className={inputClass}
                            value={skill.name}
                            onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Level Keahlian</label>
                          <input
                            type="text"
                            className={inputClass}
                            value={skill.level}
                            onChange={(e) => handleArrayChange('skills', index, 'level', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Logo / Ikon</label>
                          <select
                            className={inputClass}
                            value={skill.logoType}
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
                    onClick={() => handleAddItem('projects', { type: 'Web App', name: 'Project Baru', desc: 'Deskripsi singkat...', tags: 'Tag1, Tag2', link: '#', isPaper: false })}
                    className="px-3 py-1.5 bg-accent text-[#fff] hover:opacity-90 rounded-lg text-xs font-semibold cursor-pointer transition-opacity border-none"
                  >
                    + Tambah Project Baru
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {formData.projects.map((proj, index) => (
                    <div key={index} className="p-4 bg-bg2 border border-border-custom rounded-xl flex gap-3 items-start">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div className="col-span-2 grid grid-cols-3 gap-3">
                          <div>
                            <label className={labelClass}>Kategori / Jenis</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={proj.type}
                              onChange={(e) => handleArrayChange('projects', index, 'type', e.target.value)}
                            />
                          </div>
                          <div className="col-span-2">
                            <label className={labelClass}>Nama Project</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={proj.name}
                              onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-span-2">
                          <label className={labelClass}>Deskripsi Singkat</label>
                          <textarea
                            rows="2"
                            className={inputClass}
                            value={proj.desc}
                            onChange={(e) => handleArrayChange('projects', index, 'desc', e.target.value)}
                          ></textarea>
                        </div>
                        <div>
                          <label className={labelClass}>Tags (Pisahkan koma)</label>
                          <input
                            type="text"
                            className={inputClass}
                            value={proj.tags}
                            onChange={(e) => handleArrayChange('projects', index, 'tags', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Link / URL Project</label>
                          <input
                            type="text"
                            className={inputClass}
                            value={proj.link}
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
                    onClick={() => handleAddItem('activities', { imgText: '[ Foto Kegiatan ]', imgUrl: '', date: '2025', title: 'Kegiatan Baru', desc: 'Deskripsi...' })}
                    className="px-3 py-1.5 bg-accent text-[#fff] hover:opacity-90 rounded-lg text-xs font-semibold cursor-pointer transition-opacity border-none"
                  >
                    + Tambah Kegiatan Baru
                  </button>
                </div>
                <div className="flex flex-col gap-4 mb-8">
                  {formData.activities.map((act, index) => (
                    <div key={index} className="p-4 bg-bg2 border border-border-custom rounded-xl flex gap-4 items-start">
                      {/* Photo preview/uploader section */}
                      <div className="w-32 flex flex-col gap-2 shrink-0">
                        <div className="w-full h-24 bg-bg3 border border-border-custom rounded-lg overflow-hidden flex items-center justify-center text-center p-1">
                          {act.imgUrl ? (
                            <img src={act.imgUrl} alt="Kegiatan" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] text-text-muted font-mono">{act.imgText}</span>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, (base64) => handleArrayChange('activities', index, 'imgUrl', base64))}
                          className="hidden"
                          id={`act-upload-${index}`}
                        />
                        <label
                          htmlFor={`act-upload-${index}`}
                          className="px-2 py-1 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg text-[10px] text-center font-bold block cursor-pointer transition-colors"
                        >
                          Pilih Foto
                        </label>
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
                              value={act.imgText}
                              onChange={(e) => handleArrayChange('activities', index, 'imgText', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Tahun Kegiatan</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={act.date}
                              onChange={(e) => handleArrayChange('activities', index, 'date', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Judul Kegiatan</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={act.title}
                              onChange={(e) => handleArrayChange('activities', index, 'title', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-span-2">
                          <label className={labelClass}>Deskripsi Peran / Kontribusi</label>
                          <textarea
                            rows="2"
                            className={inputClass}
                            value={act.desc}
                            onChange={(e) => handleArrayChange('activities', index, 'desc', e.target.value)}
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
                    onClick={() => handleAddItem('organizations', { icon: '🏛️', name: 'Organisasi Baru', role: 'Peran', period: '2025', desc: 'Deskripsi...' })}
                    className="px-3 py-1.5 bg-accent text-[#fff] hover:opacity-90 rounded-lg text-xs font-semibold cursor-pointer transition-opacity border-none"
                  >
                    + Tambah Organisasi Baru
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {formData.organizations.map((org, index) => (
                    <div key={index} className="p-4 bg-bg2 border border-border-custom rounded-xl flex gap-3 items-start">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div className="grid grid-cols-4 gap-3 col-span-2">
                          <div>
                            <label className={labelClass}>Ikon Emoji</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={org.icon}
                              onChange={(e) => handleArrayChange('organizations', index, 'icon', e.target.value)}
                            />
                          </div>
                          <div className="col-span-2">
                            <label className={labelClass}>Nama Organisasi/Kepanitiaan</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={org.name}
                              onChange={(e) => handleArrayChange('organizations', index, 'name', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Periode Aktif</label>
                            <input
                              type="text"
                              className={inputClass}
                              value={org.period}
                              onChange={(e) => handleArrayChange('organizations', index, 'period', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-span-2">
                          <label className={labelClass}>Jabatan / Peran</label>
                          <input
                            type="text"
                            className={inputClass}
                            value={org.role}
                            onChange={(e) => handleArrayChange('organizations', index, 'role', e.target.value)}
                          />
                        </div>
                        <div className="col-span-2">
                          <label className={labelClass}>Deskripsi Kontribusi</label>
                          <textarea
                            rows="2"
                            className={inputClass}
                            value={org.desc}
                            onChange={(e) => handleArrayChange('organizations', index, 'desc', e.target.value)}
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

            {/* CONTACT & FOOTER */}
            {activeTab === 'contact-footer' && (
              <div>
                <h3 className={secTitleClass}>Contact Section</h3>
                <div className={formRowClass}>
                  <label className={labelClass}>Judul Section Kontak</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.contact.title}
                    onChange={(e) => handleChange('contact', 'title', e.target.value)}
                  />
                </div>
                <div className={formRowClass}>
                  <label className={labelClass}>Sub-deskripsi Kontak</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.contact.sub}
                    onChange={(e) => handleChange('contact', 'sub', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className={formRowClass}>
                    <label className={labelClass}>Email Address</label>
                    <input
                      type="email"
                      className={inputClass}
                      value={formData.contact.email}
                      onChange={(e) => handleChange('contact', 'email', e.target.value)}
                    />
                  </div>
                  <div className={formRowClass}>
                    <label className={labelClass}>LinkedIn Link</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={formData.contact.linkedin}
                      onChange={(e) => handleChange('contact', 'linkedin', e.target.value)}
                    />
                  </div>
                  <div className={formRowClass}>
                    <label className={labelClass}>GitHub Link</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={formData.contact.github}
                      onChange={(e) => handleChange('contact', 'github', e.target.value)}
                    />
                  </div>
                </div>

                <h3 className={`${secTitleClass} mt-8`}>Footer Section</h3>
                <div className={formRowClass}>
                  <label className={labelClass}>Teks Footer</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.footer.text}
                    onChange={(e) => handleChange('footer', 'text', e.target.value)}
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
