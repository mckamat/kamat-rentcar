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
            <h1 style={{ marginBottom: '0.25rem' }}>Hoş geldiniz!</h1>
            <p style={{ margin: 0, color: '#64748b' }}>
              Hesabınıza giriş yapın veya yeni hesap oluşturun.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <Button label="Giriş Yap" icon="pi pi-sign-in" />
            <Button
              label="Kayıt Ol"
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
                Şifre
              </label>
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

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
          <h2 style={{ marginTop: 0 }}>RentCar&apos;a üye olmanın avantajları</h2>
          <p style={{ color: '#64748b' }}>Hesap oluşturarak özel ayrıcalıklara sahip olun.</p>

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
              &quot;RentCar ile rezervasyon yapmak çok kolay! Üye olduktan sonra her şey çok daha hızlı.&quot;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Avatar
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNBRW6kw4PvewS5EGHKY7nNsJiWvrbsVIzZA&s"
                shape="circle"
              />
              <div>
                <div style={{ fontWeight: 700 }}>Ahmet Yılmaz</div>
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
