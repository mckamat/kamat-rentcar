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
import { registerSchema } from './registerValidationZod'

function Register() {
  const navigate = useNavigate()
  const toast = useRef(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phone1: '',
    phone2: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  const benefits = useMemo(
    () => [
      {
        icon: 'pi pi-bolt',
        title: 'Hızlı Rezervasyon',
        description: 'Saniyeler içinde rezervasyon yapın.',
      },
      {
        icon: 'pi pi-percentage',
        title: 'Özel İndirimler',
        description: 'Üyelere özel kampanyalardan yararlanın.',
      },
      {
        icon: 'pi pi-history',
        title: 'Rezervasyon Geçmişi',
        description: 'Tüm kiralama geçmişinizi yönetin.',
      },
      {
        icon: 'pi pi-star-fill',
        title: 'Sadakat Puanları',
        description: 'Her kiralamada puan kazanıp kullanın.',
      },
      {
        icon: 'pi pi-headphones',
        title: 'Öncelikli Destek',
        description: '7/24 müşteri hizmetleri desteği alın.',
      },
      {
        icon: 'pi pi-bell',
        title: 'Akıllı Bildirimler',
        description: 'Hatırlatma ve teklif bildirimleri alın.',
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

  const showToast = (severity, summary, detail) => {
    toast.current?.show({ severity, summary, detail, life: 3000 })
  }

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const sanitizePhone = (value) => value.replace(/\D/g, '').slice(0, 10)

  const getPasswordStrength = (password) => {
    let score = 0
    if (password.length >= 8) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1
    return score
  }

  const strengthScore = getPasswordStrength(formData.password)
  const strengthText = ['Zayıf', 'Zayıf', 'Orta', 'İyi', 'Güçlü'][strengthScore]

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationResult = registerSchema.safeParse(formData)
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || 'Form bilgileri geçersiz.'
      showToast('error', 'Doğrulama Hatası', firstError)
      return
    }

    showToast('success', 'Başarılı', 'Kayıt bilgileri doğrulandı.')
    console.log('Register payload:', validationResult.data)
  }

  return (
    <section className="register-page" style={{ padding: '1rem' }}>
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
            <Button label="Giriş Yap" icon="pi pi-sign-in" outlined onClick={() => navigate('/login')} />
            <Button label="Kayıt Ol" icon="pi pi-user-plus" />
          </div>

          <form noValidate onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.9rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem' }}>
              <span className="p-input-icon-left">
                <i className="pi pi-user" />
                <InputText
                  value={formData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  placeholder="Adınız"
                />
              </span>
              <span className="p-input-icon-left">
                <i className="pi pi-user" />
                <InputText
                  value={formData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  placeholder="Soyadınız"
                />
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem' }}>
              <span className="p-input-icon-left">
                <i className="pi pi-user-edit" />
                <InputText
                  value={formData.userName}
                  onChange={(e) => updateField('userName', e.target.value)}
                  placeholder="Kullanıcı adı"
                />
              </span>
              <span className="p-input-icon-left">
                <i className="pi pi-envelope" />
                <InputText
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  type="email"
                  placeholder="E-posta adresiniz"
                />
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem' }}>
              <span className="p-input-icon-left">
                <i className="pi pi-phone" />
                <InputText
                  value={formData.phone1}
                  onChange={(e) => updateField('phone1', sanitizePhone(e.target.value))}
                  placeholder="5XXXXXXXXX"
                />
              </span>
              <span className="p-input-icon-left">
                <i className="pi pi-phone" />
                <InputText
                  value={formData.phone2}
                  onChange={(e) => updateField('phone2', sanitizePhone(e.target.value))}
                  placeholder="5XXXXXXXXX"
                />
              </span>
            </div>

            <Password
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              placeholder="Güçlü bir şifre oluşturun"
              toggleMask
              feedback={false}
              inputStyle={{ width: '100%' }}
              style={{ width: '100%' }}
            />
            <Password
              value={formData.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              placeholder="Şifrenizi tekrar girin"
              toggleMask
              feedback={false}
              inputStyle={{ width: '100%' }}
              style={{ width: '100%' }}
            />

            <div>
              <div style={{ marginBottom: '0.35rem', fontSize: '0.9rem' }}>Şifre gücü: {strengthText}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.35rem' }}>
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    style={{
                      height: '6px',
                      borderRadius: '999px',
                      backgroundColor: strengthScore >= bar ? '#22c55e' : '#cbd5e1',
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Checkbox
                inputId="agreeTerms"
                checked={formData.agreeTerms}
                onChange={(e) => updateField('agreeTerms', e.checked)}
              />
              <label htmlFor="agreeTerms">
                Kullanım şartları ve gizlilik politikasını kabul ediyorum
              </label>
            </div>

            <Button label="Hesap oluştur" icon="pi pi-user-plus" type="submit" />
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

export default Register
