import { useMemo, useRef, useState } from 'react'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Checkbox } from 'primereact/checkbox'
import { Divider } from 'primereact/divider'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Toast } from 'primereact/toast'
import { useNavigate } from 'react-router-dom'
import { loginSchema } from './loginValidationZod'

import './auth-pages.css'

function Login() {
  const navigate = useNavigate()
  const toast = useRef(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const benefits = useMemo(
    () => [
      {
        icon: 'pi pi-bolt',
        title: 'Hızlı Rezervasyon',
        description: 'Kayıtlı bilgilerinizle saniyeler içinde rezervasyon yapın.',
      },
      {
        icon: 'pi pi-percentage',
        title: 'Özel İndirimler',
        description: 'Sadece üyelere özel kampanya ve indirimlerden yararlanın.',
      },
      {
        icon: 'pi pi-history',
        title: 'Rezervasyon Geçmişi',
        description:
          'Tüm kiralama geçmişinizi görüntüleyin ve tekrar rezervasyon yapın.',
      },
      {
        icon: 'pi pi-star-fill',
        title: 'Sadakat Puanları',
        description: 'Her kiralamada puan kazanın ve sonraki rezervasyonlarda kullanın.',
      },
      {
        icon: 'pi pi-headphones',
        title: 'Öncelikli Destek',
        description: '7/24 müşteri hizmetlerinden öncelikli destek alın.',
      },
      {
        icon: 'pi pi-bell',
        title: 'Akıllı Bildirimler',
        description: 'Hatırlatmalar ve özel teklifler için anlık bildirim alın.',
      },
    ],
    [],
  )

  const stats = useMemo(
    () => [
      { value: '50K+', label: 'Mutlu Müşteri' },
      { value: '1000+', label: 'Araç Filosu' },
      { value: '25', label: 'Şehir' },
      { value: '7/24', label: 'Destek' },
    ],
    [],
  )

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const showToast = (severity, summary, detail) => {
    toast.current?.show({ severity, summary, detail, life: 3000 })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationResult = loginSchema.safeParse(formData)
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || 'Form bilgileri geçersiz.'
      showToast('error', 'Doğrulama Hatası', firstError)
      return
    }

    showToast('success', 'Başarılı', 'Giriş bilgileri doğrulandı.')
    console.log('Login payload:', validationResult.data)
  }

  return (
    <section className="login-page">
      <Toast ref={toast} position="top-right" />
      <div className="auth-grid">
        <Card className="auth-main-card">
          <div>
            <h1 className="auth-hero-title">Hoş geldiniz!</h1>
            <p className="auth-hero-sub">
              Hesabınıza giriş yapın veya yeni hesap oluşturun.
            </p>
          </div>

          <div className="auth-mode-tabs">
            <Button label="Giriş Yap" icon="pi pi-sign-in" />
            <Button
              label="Kayıt Ol"
              icon="pi pi-user-plus"
              outlined
              onClick={() => navigate('/register')}
            />
          </div>

          <form className="auth-form" noValidate onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="loginEmail">E-posta Adresi</label>
              <span className="p-input-icon-left">
                <i className="pi pi-envelope" />
                <InputText
                  id="loginEmail"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="E-posta adresinizi girin"
                  type="email"
                />
              </span>
            </div>

            <div className="auth-field">
              <label htmlFor="loginPassword">Şifre</label>
              <Password
                id="loginPassword"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                placeholder="Şifrenizi girin"
                toggleMask
                feedback={false}
                inputStyle={{ width: '100%' }}
                style={{ width: '100%' }}
              />
            </div>

            <div className="auth-field-row">
              <div className="auth-remember">
                <Checkbox
                  inputId="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(e) => updateField('rememberMe', e.checked)}
                />
                <label htmlFor="rememberMe">Beni hatırla</label>
              </div>
              <Button text label="Şifremi unuttum" type="button" />
            </div>

            <Button label="Giriş yap" icon="pi pi-sign-in" type="submit" />
          </form>
        </Card>

        <Card className="auth-benefits-card">
          <h2>RentCar&apos;a üye olmanın avantajları</h2>
          <p className="auth-benefits-lead">Hesap oluşturarak özel ayrıcalıklara sahip olun.</p>

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
              &quot;RentCar ile rezervasyon yapmak çok kolay! Üye olduktan sonra her şey çok daha hızlı.&quot;
            </p>
            <div className="auth-quote-author">
              <Avatar
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNBRW6kw4PvewS5EGHKY7nNsJiWvrbsVIzZA&s"
                shape="circle"
              />
              <div>
                <div className="auth-quote-name">Ahmet Yılmaz</div>
                <small className="auth-quote-role">Verified Customer</small>
                <div className="auth-quote-stars" aria-label="5 üzerinden 5 yıldız">
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
  )
}

export default Login
