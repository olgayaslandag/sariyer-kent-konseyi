"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DATA_FILES = [
  { name: "meclisler.json", label: "Meclisler" },
  { name: "etkinlikler.json", label: "Etkinlikler" },
  { name: "calisma-gruplari.json", label: "Çalışma Grupları" },
  { name: "haberler.json", label: "Haberler" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeFile, setActiveFile] = useState("meclisler.json");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [jsonError, setJsonError] = useState("");

  useEffect(() => {
    const session = sessionStorage.getItem("admin_session");
    if (session !== "authenticated") {
      router.push("/admin/login");
    }
  }, [router]);

  useEffect(() => {
    if (activeFile) loadData(activeFile);
  }, [activeFile]);

  const loadData = async (filename) => {
    setLoading(true);
    setJsonError("");
    try {
      const res = await fetch(`/api/data/${filename}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Veri yüklenemedi");
      const result = await res.json();
      setData(result.data);
    } catch (err) {
      setJsonError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setJsonError("");
    try {
      const parsed = JSON.parse(JSON.stringify(data));
      const res = await fetch(`/api/data/${activeFile}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ data: parsed }),
      });
      if (!res.ok) throw new Error("Kaydedilemedi");
      setMessage("✅ Kaydedildi");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setJsonError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddItem = () => {
    const newItem = generateEmptyItem(activeFile);
    setData([...data, newItem]);
  };

  const handleDeleteItem = (index) => {
    if (confirm("Bu öğeyi silmek istediğinize emin misiniz?")) {
      setData(data.filter((_, i) => i !== index));
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setUploadPreview(result.url);
      setMessage("✅ Görsel yüklendi: " + result.url);
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    sessionStorage.removeItem("admin_session");
    router.push("/admin/login");
  };

  const generateEmptyItem = (filename) => {
    switch (filename) {
      case "meclisler.json":
        return {
          id: String(data.length + 1).padStart(2, "0"),
          slug: "yeni-meclis",
          title: "Yeni Meclis",
          shortTitle: "Yeni",
          subTitle: "Meclisi",
          description: "Açıklama...",
          link: "/meclisler/yeni-meclis",
          img: "/img/placeholder.jpg",
          detail: {
            about: "Hakkında...",
            goals: [{ title: "Hedef", desc: "Açıklama" }],
            activities: "Etkinlikler...",
            projects: [{ title: "Proje", desc: "Açıklama" }],
          },
        };
      case "etkinlikler.json":
        return {
          slug: "yeni-etkinlik",
          title: "Yeni Etkinlik",
          time: "14:00 - 16:00",
          location: "Sarıyer",
          img: "/img/placeholder.jpg",
          contentImg: "/img/placeholder.jpg",
          desc: "Etkinlik açıklaması...",
        };
      case "calisma-gruplari.json":
        return {
          id: String(data.length + 1).padStart(2, "0"),
          slug: "yeni-grup",
          title: "Yeni Çalışma Grubu",
          shortTitle: "Yeni",
          subTitle: "Grup",
          description: "Açıklama...",
          link: "/calisma-gruplari/yeni-grup",
          img: "/img/placeholder.jpg",
          detail: {
            about: "Hakkında...",
            focusAreas: [{ title: "Odak", desc: "Açıklama" }],
            activities: "Etkinlikler...",
            projects: [{ title: "Proje", desc: "Açıklama" }],
          },
        };
      case "haberler.json":
        return {
          slug: "yeni-haber",
          title: "Yeni Haber Başlığı",
          date: new Date().toLocaleDateString("tr-TR"),
          tag: "HABER",
          img: "/img/placeholder.jpg",
          contentImg: "/img/placeholder.jpg",
          desc: "Haber özeti...",
          content: "<p>Haber içeriği...</p>",
        };
      default:
        return {};
    }
  };

  const updateField = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
  };

  const updateNestedField = (index, parent, field, value, subIndex = 0) => {
    const newData = [...data];
    if (Array.isArray(newData[index][parent])) {
      const arr = [...newData[index][parent]];
      arr[subIndex] = { ...arr[subIndex], [field]: value };
      newData[index] = { ...newData[index], [parent]: arr };
    } else {
      newData[index] = {
        ...newData[index],
        [parent]: { ...newData[index][parent], [field]: value },
      };
    }
    setData(newData);
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Yönetim Paneli</h2>
        </div>
        <nav className="admin-nav">
          {DATA_FILES.map((file) => (
            <button
              key={file.name}
              className={`admin-nav-item ${activeFile === file.name ? "active" : ""}`}
              onClick={() => {
                setActiveFile(file.name);
                setMessage("");
                setJsonError("");
              }}
            >
              {file.label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="btn-logout">
            Çıkış Yap
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{DATA_FILES.find((f) => f.name === activeFile)?.label}</h1>
          <div className="admin-actions">
            <label className="btn-upload">
              {uploading ? "Yükleniyor..." : "📷 Görsel Yükle"}
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                hidden
              />
            </label>
            <button onClick={handleAddItem} className="btn-add">
              + Yeni Ekle
            </button>
            <button onClick={handleSave} disabled={saving} className="btn-save">
              {saving ? "Kaydediliyor..." : "💾 Kaydet"}
            </button>
          </div>
        </header>

        {message && <div className="admin-message">{message}</div>}
        {jsonError && <div className="admin-error">{jsonError}</div>}
        {uploadPreview && (
          <div className="admin-upload-preview">
            <span>Yüklenen: </span>
            <code>{uploadPreview}</code>
          </div>
        )}

        {loading ? (
          <div className="admin-loading">Yükleniyor...</div>
        ) : (
          <div className="admin-content">
            {data.map((item, index) => (
              <div key={index} className="admin-item">
                <div className="admin-item-header">
                  <h3>#{index + 1} {item.title || item.slug || "Öğe"}</h3>
                  <button
                    onClick={() => handleDeleteItem(index)}
                    className="btn-delete"
                  >
                    Sil
                  </button>
                </div>
                <div className="admin-fields">
                  {Object.entries(item).map(([key, value]) => {
                    if (key === "detail") {
                      return (
                        <div key={key} className="admin-field">
                          <label>Detay (JSON)</label>
                          <textarea
                            rows="8"
                            value={JSON.stringify(value, null, 2)}
                            onChange={(e) => {
                              try {
                                const parsed = JSON.parse(e.target.value);
                                updateField(index, key, parsed);
                                setJsonError("");
                              } catch {
                                setJsonError("Geçersiz JSON formatı");
                              }
                            }}
                          />
                        </div>
                      );
                    }
                    if (key === "content") {
                      return (
                        <div key={key} className="admin-field">
                          <label>İçerik (HTML)</label>
                          <textarea
                            rows="6"
                            value={value}
                            onChange={(e) => updateField(index, key, e.target.value)}
                          />
                        </div>
                      );
                    }
                    if (typeof value === "string") {
                      return (
                        <div key={key} className="admin-field">
                          <label>{key}</label>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => updateField(index, key, e.target.value)}
                          />
                        </div>
                      );
                    }
                    if (Array.isArray(value)) {
                      return (
                        <div key={key} className="admin-field">
                          <label>{key} (JSON)</label>
                          <textarea
                            rows="6"
                            value={JSON.stringify(value, null, 2)}
                            onChange={(e) => {
                              try {
                                const parsed = JSON.parse(e.target.value);
                                updateField(index, key, parsed);
                                setJsonError("");
                              } catch {
                                setJsonError("Geçersiz JSON formatı");
                              }
                            }}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
