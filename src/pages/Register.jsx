import { useMemo, useRef, useState } from "react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "./registerValidationZod";
import { LegalDialog } from "../legal/LegalDialog";

import "./auth-pages.css";

function Register() {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [legalDialog, setLegalDialog] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone1: "",
    phone2: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const benefits = useMemo(
    () => [
      {
        icon: "pi pi-bolt",
        title: "Hızlı Rezervasyon",
        description: "Saniyeler içinde rezervasyon yapın.",
      },
      {
        icon: "pi pi-percentage",
        title: "Özel İndirimler",
        description: "Üyelere özel kampanyalardan yararlanın.",
      },
      {
        icon: "pi pi-history",
        title: "Rezervasyon Geçmişi",
        description: "Tüm kiralama geçmişinizi yönetin.",
      },
      {
        icon: "pi pi-star-fill",
        title: "Sadakat Puanları",
        description: "Her kiralamada puan kazanıp kullanın.",
      },
      {
        icon: "pi pi-headphones",
        title: "Öncelikli Destek",
        description: "7/24 müşteri hizmetleri desteği alın.",
      },
      {
        icon: "pi pi-bell",
        title: "Akıllı Bildirimler",
        description: "Hatırlatma ve teklif bildirimleri alın.",
      },
    ],
    [],
  );

  const stats = useMemo(
    () => [
      { value: "50K+", label: "Mutlu Müşteri" },
      { value: "1000+", label: "Araç Filosu" },
      { value: "25", label: "Şehir" },
      { value: "7/24", label: "Destek" },
    ],
    [],
  );

  const showToast = (severity, summary, detail) => {
    toast.current?.show({ severity, summary, detail, life: 3000 });
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const sanitizePhone = (value) => value.replace(/\D/g, "").slice(0, 10);

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  };

  const strengthScore = getPasswordStrength(formData.password);
  const strengthText = ["Zayıf", "Zayıf", "Orta", "İyi", "Güçlü"][
    strengthScore
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationResult = registerSchema.safeParse(formData);
    if (!validationResult.success) {
      const firstError =
        validationResult.error.issues[0]?.message || "Form bilgileri geçersiz.";
      showToast("error", "Doğrulama Hatası", firstError);
      return;
    }

    showToast("success", "Başarılı", "Kayıt bilgileri doğrulandı.");
    console.log("Register payload:", validationResult.data);
  };

  return (
    <section className="register-page">
      <LegalDialog type={legalDialog} onHide={() => setLegalDialog(null)} />
      <Toast ref={toast} position="top-right" />
      <div className="auth-grid">
        <Card className="auth-main-card">
          <div>
            <h1 className="auth-hero-title">Hesap oluşturun</h1>
            <p className="auth-hero-sub">
              Birkaç bilgi ile RentCar üyesi olun ve avantajlardan yararlanın.
            </p>
          </div>

          <div className="auth-mode-tabs">
            <Button
              label="Giriş Yap"
              icon="pi pi-sign-in"
              outlined
              onClick={() => navigate("/login")}
            />
            <Button label="Kayıt Ol" icon="pi pi-user-plus" />
          </div>

          <form className="auth-form" noValidate onSubmit={handleSubmit}>
            <div className="auth-form-row">
              <span className="p-input-icon-left">
                <i className="pi pi-user" />
                <InputText
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  placeholder="Adınız"
                />
              </span>
              <span className="p-input-icon-left">
                <i className="pi pi-user" />
                <InputText
                  value={formData.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  placeholder="Soyadınız"
                />
              </span>
            </div>

            <div className="auth-form-row">
              <span className="p-input-icon-left">
                <i className="pi pi-user-edit" />
                <InputText
                  value={formData.userName}
                  onChange={(e) => updateField("userName", e.target.value)}
                  placeholder="Kullanıcı adı"
                />
              </span>
              <span className="p-input-icon-left">
                <i className="pi pi-envelope" />
                <InputText
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  type="email"
                  placeholder="E-posta adresiniz"
                />
              </span>
            </div>

            <div className="auth-form-row">
              <span className="p-input-icon-left">
                <i className="pi pi-phone" />
                <InputText
                  value={formData.phone1}
                  onChange={(e) =>
                    updateField("phone1", sanitizePhone(e.target.value))
                  }
                  placeholder="5XXXXXXXXX"
                  inputMode="numeric"
                />
              </span>
              <span className="p-input-icon-left">
                <i className="pi pi-phone" />
                <InputText
                  value={formData.phone2}
                  onChange={(e) =>
                    updateField("phone2", sanitizePhone(e.target.value))
                  }
                  placeholder="5XXXXXXXXX"
                  inputMode="numeric"
                />
              </span>
            </div>

            <div className="auth-field">
              <label htmlFor="regPassword">Şifre</label>
              <Password
                id="regPassword"
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="Güçlü bir şifre oluşturun"
                toggleMask
                feedback={false}
                inputStyle={{ width: "100%" }}
                style={{ width: "100%" }}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="regConfirmPassword">Şifre tekrar</label>
              <Password
                id="regConfirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                placeholder="Şifrenizi tekrar girin"
                toggleMask
                feedback={false}
                inputStyle={{ width: "100%" }}
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <div className="auth-strength-label">
                Şifre gücü: {strengthText}
              </div>
              <div className="auth-strength-bars">
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`auth-strength-bar${strengthScore >= bar ? " active" : ""}`}
                  />
                ))}
              </div>
            </div>

            <div className="auth-terms">
              <Checkbox
                inputId="agreeTerms"
                checked={formData.agreeTerms}
                onChange={(e) => updateField("agreeTerms", e.checked)}
              />
              <label htmlFor="agreeTerms" className="auth-terms-label">
                <button
                  type="button"
                  className="auth-legal-link"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setLegalDialog("terms");
                  }}
                >
                  Kullanım şartları
                </button>
                {" "}ve{" "}
                <button
                  type="button"
                  className="auth-legal-link"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setLegalDialog("privacy");
                  }}
                >
                  gizlilik politikasını
                </button>
                {" "}
                kabul ediyorum.
              </label>
            </div>

            <Button
              label="Hesap oluştur"
              icon="pi pi-user-plus"
              type="submit"
            />
          </form>
        </Card>

        <Card className="auth-benefits-card">
          <h2>RentCar&apos;a üye olmanın avantajları</h2>
          <p className="auth-benefits-lead">
            Hesap oluşturarak özel ayrıcalıklara sahip olun.
          </p>

          <div className="auth-benefits-list">
            {benefits.map((item) => (
              <div key={item.title} className="auth-benefit-item">
                <i className={item.icon} />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Divider />

          <div className="auth-stats-grid">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="auth-stat-value">{stat.value}</div>
                <small className="auth-stat-label">{stat.label}</small>
              </div>
            ))}
          </div>

          <Divider />

          <Card className="auth-quote-card">
            <p>
              &quot;Mücahit Bey'e sonsuz teşekkürler, RentCar ile rezervasyon
              yapmak çok kolay! Üye olduktan sonra her şey çok daha hızlı.&quot;
            </p>
            <div className="auth-quote-author">
              <Avatar
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNBRW6kw4PvewS5EGHKY7nNsJiWvrbsVIzZA&s"
                shape="circle"
              />
              <div>
                <div className="auth-quote-name">Ahmet Yılmaz</div>
                <small className="auth-quote-role">Verified Customer</small>
                <div
                  className="auth-quote-stars"
                  aria-label="5 üzerinden 5 yıldız"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <i key={n} className="pi pi-star-fill" aria-hidden />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </Card>
      </div>
    </section>
  );
}

export default Register;
