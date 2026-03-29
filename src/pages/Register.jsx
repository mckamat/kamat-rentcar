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
      { icon: 'pi pi-bolt', title: 'Hizli Rezervasyon', description: 'Saniyeler icinde rezervasyon yapin.' },
      { icon: 'pi pi-percentage', title: 'Ozel Indirimler', description: 'Uyelere ozel kampanyalardan yararlanin.' },
      { icon: 'pi pi-history', title: 'Rezervasyon Gecmisi', description: 'Tum kiralama gecmisinizi yonetin.' },
      { icon: 'pi pi-star-fill', title: 'Sadakat Puanlari', description: 'Her kiralamada puan kazanip kullanin.' },
      { icon: 'pi pi-headphones', title: 'Oncelikli Destek', description: '7/24 musteri hizmetleri destegi alin.' },
      { icon: 'pi pi-bell', title: 'Akilli Bildirimler', description: 'Hatirlatma ve teklif bildirimleri alin.' },
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
  const strengthText = ['Zayif', 'Zayif', 'Orta', 'Iyi', 'Guclu'][strengthScore]

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationResult = registerSchema.safeParse(formData)
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || 'Form bilgileri gecersiz.'
      showToast('error', 'Dogrulama Hatasi', firstError)
      return
    }

    showToast('success', 'Basarili', 'Kayit bilgileri dogrulandi.')
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
            <h1 style={{ marginBottom: '0.25rem' }}>Hos Geldiniz!</h1>
            <p style={{ margin: 0, color: '#64748b' }}>
              Hesabiniza giris yapin veya yeni hesap olusturun.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <Button label="Giris Yap" icon="pi pi-sign-in" outlined onClick={() => navigate('/login')} />
            <Button label="Kayit Ol" icon="pi pi-user-plus" />
          </div>

          <form noValidate onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.9rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem' }}>
              <span className="p-input-icon-left">
                <i className="pi pi-user" />
                <InputText
                  value={formData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  placeholder="Adiniz"
                />
              </span>
              <span className="p-input-icon-left">
                <i className="pi pi-user" />
                <InputText
                  value={formData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  placeholder="Soyadiniz"
                />
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem' }}>
              <span className="p-input-icon-left">
                <i className="pi pi-user-edit" />
                <InputText
                  value={formData.userName}
                  onChange={(e) => updateField('userName', e.target.value)}
                  placeholder="Kullanici adi"
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
              placeholder="Guclu bir sifre olusturun"
              toggleMask
              feedback={false}
              inputStyle={{ width: '100%' }}
              style={{ width: '100%' }}
            />
            <Password
              value={formData.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              placeholder="Sifrenizi tekrar girin"
              toggleMask
              feedback={false}
              inputStyle={{ width: '100%' }}
              style={{ width: '100%' }}
            />

            <div>
              <div style={{ marginBottom: '0.35rem', fontSize: '0.9rem' }}>Sifre Gucu: {strengthText}</div>
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
                Kullanim Sartlari ve Gizlilik Politikasi&apos;ni kabul ediyorum
              </label>
            </div>

            <Button label="HESAP OLUSTUR" icon="pi pi-user-plus" type="submit" />
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

export default Register
