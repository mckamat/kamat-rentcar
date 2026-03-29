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
        title: 'Hizli Rezervasyon',
        description: 'Kayitli bilgilerinizle saniyeler icinde rezervasyon yapin.',
      },
      {
        icon: 'pi pi-percentage',
        title: 'Ozel Indirimler',
        description: 'Sadece uyelere ozel kampanya ve indirimlerden yararlanin.',
      },
      {
        icon: 'pi pi-history',
        title: 'Rezervasyon Gecmisi',
        description: 'Tum kiralama gecmisinizi goruntuleyin ve tekrar rezervasyon yapin.',
      },
      {
        icon: 'pi pi-star-fill',
        title: 'Sadakat Puanlari',
        description: 'Her kiralamada puan kazanin ve sonraki rezervasyonlarda kullanin.',
      },
      {
        icon: 'pi pi-headphones',
        title: 'Oncelikli Destek',
        description: '7/24 musteri hizmetlerinden oncelikli destek alin.',
      },
      {
        icon: 'pi pi-bell',
        title: 'Akilli Bildirimler',
        description: 'Hatirlatmalar ve ozel teklifler icin anlik bildirim alin.',
      },
    ],
    [],
  )

  const stats = useMemo(
    () => [
      { value: '50K+', label: 'Mutlu Musteri' },
      { value: '1000+', label: 'Arac Filosu' },
      { value: '25', label: 'Sehir' },
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
      const firstError = validationResult.error.issues[0]?.message || 'Form bilgileri gecersiz.'
      showToast('error', 'Dogrulama Hatasi', firstError)
      return
    }

    showToast('success', 'Basarili', 'Giris bilgileri dogrulandi.')
    console.log('Login payload:', validationResult.data)
  }

  return (
    <section className="login-page" style={{ padding: '1rem' }}>
      <Toast ref={toast} position="top-right" />
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1rem',
        }}
      >
        <Card className="auth-main-card">
          <div style={{ marginBottom: '1rem' }}>
            <h1 style={{ marginBottom: '0.25rem' }}>Hos Geldiniz!</h1>
            <p style={{ margin: 0, color: '#64748b' }}>
              Hesabiniza giris yapin veya yeni hesap olusturun.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <Button label="Giris Yap" icon="pi pi-sign-in" />
            <Button
              label="Kayit Ol"
              icon="pi pi-user-plus"
              outlined
              onClick={() => navigate('/register')}
            />
          </div>

          <form noValidate onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label htmlFor="loginEmail" style={{ display: 'block', marginBottom: '0.35rem' }}>
                E-posta Adresi
              </label>
              <span className="p-input-icon-left" style={{ width: '100%' }}>
                <i className="pi pi-envelope" />
                <InputText
                  id="loginEmail"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="E-posta adresinizi girin"
                  type="email"
                  style={{ width: '100%' }}
                />
              </span>
            </div>

            <div>
              <label htmlFor="loginPassword" style={{ display: 'block', marginBottom: '0.35rem' }}>
                Sifre
              </label>
              <Password
                id="loginPassword"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                placeholder="Sifrenizi girin"
                toggleMask
                feedback={false}
                inputStyle={{ width: '100%' }}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Checkbox
                  inputId="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(e) => updateField('rememberMe', e.checked)}
                />
                <label htmlFor="rememberMe">Beni hatirla</label>
              </div>
              <Button text label="Sifremi unuttum" type="button" />
            </div>

            <Button label="GIRIS YAP" icon="pi pi-sign-in" type="submit" />
          </form>
        </Card>

        <Card className="auth-benefits-card">
          <h2 style={{ marginTop: 0 }}>RentCar&apos;a Uye Olmanin Avantajlari</h2>
          <p style={{ color: '#64748b' }}>Hesap olusturarak ozel ayricaliklara sahip olun.</p>

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {benefits.map((item) => (
              <div
                key={item.title}
                className="auth-benefit-item"
                style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}
              >
                <i className={item.icon} style={{ fontSize: '1.1rem', color: '#2563eb', marginTop: '0.2rem' }} />
                <div>
                  <strong>{item.title}</strong>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b' }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Divider />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '0.75rem',
              textAlign: 'center',
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1d4ed8' }}>{stat.value}</div>
                <small style={{ color: '#64748b' }}>{stat.label}</small>
              </div>
            ))}
          </div>

          <Divider />

          <Card>
            <p style={{ marginTop: 0 }}>
              &quot;RentCar ile rezervasyon yapmak cok kolay! Uye olduktan sonra her sey cok daha hizli.&quot;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Avatar
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNBRW6kw4PvewS5EGHKY7nNsJiWvrbsVIzZA&s"
                shape="circle"
              />
              <div>
                <div style={{ fontWeight: 700 }}>Ahmet Yilmaz</div>
                <small style={{ color: '#64748b' }}>Verified Customer</small>
              </div>
            </div>
          </Card>
        </Card>
      </div>
    </section>
  )
}

export default Login
