import { useState, type FormEvent } from "react";
import { Mail, MapPin } from "lucide-react";
import { postApi } from "../lib/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await postApi("/messages/public", {
        name: form.name,
        email: form.email,
        subject: "Contact Portfolio",
        content: form.message,
      });
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section">
      <div className="container contact-grid">
        <div className="contact-info animate-fade-in">
          <h1>
            Me <span className="gradient-text">Contacter</span>
          </h1>
          <p>
            N'hésitez pas à me contacter pour discuter d'un projet,
            d'une collaboration ou simplement pour échanger.
          </p>
          <div className="contact-methods">
            <div className="contact-method">
              <Mail size={20} />
              <div>
                <strong>Email</strong>
                <a href="mailto:etendardtommy@gmail.com">etendardtommy@gmail.com</a>
              </div>
            </div>
            <div className="contact-method">
              <MapPin size={20} />
              <div>
                <strong>Localisation</strong>
                <span>France, Remote friendly</span>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form glass-panel animate-fade-in delay-200" onSubmit={handleSubmit}>
          <label>
            Nom
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>
          <label>
            Message
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </label>

          {status === "success" && (
            <p className="form-status success">Message envoyé avec succès !</p>
          )}
          {status === "error" && (
            <p className="form-status error">Erreur lors de l'envoi. Réessayez.</p>
          )}

          <button type="submit" className="btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Envoi en cours..." : "Envoyer"}
          </button>
        </form>
      </div>
    </section>
  );
}
