import { useMemo, useState } from 'react'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { Sidebar } from 'primereact/sidebar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const activePath = location.pathname

  const navItems = useMemo(
    () => [
      { label: 'Ana Sayfa', icon: 'pi pi-home', path: '/' },
      { label: 'Iletisim', icon: 'pi pi-phone', path: '/contact' },
      { label: 'Giris Yap', icon: 'pi pi-user', path: '/login' },
    ],
    [],
  )

  const handleNavigate = (path) => {
    setMobileMenuVisible(false)
    navigate(path)
  }

  return (
    <main className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          backgroundColor: '#2c3e50',
          color: '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          padding: '0.75rem 1rem',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <Button
            label="RentCar"
            icon="pi pi-car"
            text
            style={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem' }}
            onClick={() => handleNavigate('/')}
          />

          <div className="layout-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                label={item.label}
                icon={item.icon}
                text
                style={{ color: '#fff' }}
                severity={activePath === item.path ? 'info' : null}
                onClick={() => handleNavigate(item.path)}
              />
            ))}
          </div>

          <Button
            icon="pi pi-bars"
            rounded
            text
            style={{ color: '#fff' }}
            aria-label="Menu"
            onClick={() => setMobileMenuVisible(true)}
          />
        </div>
      </header>

      <Sidebar
        visible={mobileMenuVisible}
        onHide={() => setMobileMenuVisible(false)}
        position="right"
        header="Menu"
      >
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {navItems.map((item) => (
            <Button
              key={`mobile-${item.path}`}
              label={item.label}
              icon={item.icon}
              outlined={activePath !== item.path}
              onClick={() => handleNavigate(item.path)}
            />
          ))}
        </div>
      </Sidebar>

      <section className="layout-outlet" style={{ flex: 1 }}>
        <Outlet />
      </section>

      <footer style={{ background: '#1f2937', color: '#fff', padding: '2rem 1rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
            }}
          >
            <div>
              <h3 style={{ marginTop: 0 }}>
                <i className="pi pi-car" style={{ marginRight: '0.5rem' }} />
                RentCar
              </h3>
              <p style={{ opacity: 0.85 }}>
                Turkiye&apos;nin en guvenilir arac kiralama platformu.
              </p>
            </div>
            <div>
              <h4>Hizli Baglantilar</h4>
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                <Button text label="Ana Sayfa" style={{ color: '#cbd5e1', justifyContent: 'start' }} />
                <Button text label="Arac Kiralama" style={{ color: '#cbd5e1', justifyContent: 'start' }} />
                <Button text label="Hakkimizda" style={{ color: '#cbd5e1', justifyContent: 'start' }} />
              </div>
            </div>
            <div>
              <h4>Hizmetler</h4>
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                <Button text label="Gunluk Kiralama" style={{ color: '#cbd5e1', justifyContent: 'start' }} />
                <Button text label="Aylik Kiralama" style={{ color: '#cbd5e1', justifyContent: 'start' }} />
                <Button text label="Kurumsal Cozumler" style={{ color: '#cbd5e1', justifyContent: 'start' }} />
              </div>
            </div>
            <div>
              <h4>Iletisim</h4>
              <p style={{ margin: '0.25rem 0' }}>
                <i className="pi pi-phone" style={{ marginRight: '0.5rem' }} />
                +90 352 123 45 67
              </p>
              <p style={{ margin: '0.25rem 0' }}>
                <i className="pi pi-envelope" style={{ marginRight: '0.5rem' }} />
                info@rentcar.com
              </p>
              <p style={{ margin: '0.25rem 0' }}>
                <i className="pi pi-map-marker" style={{ marginRight: '0.5rem' }} />
                Kayseri, Turkiye
              </p>
            </div>
          </div>

          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ opacity: 0.8 }}>&copy; 2025 RentCar. Tum haklari saklidir.</span>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button text label="Gizlilik Politikasi" style={{ color: '#cbd5e1' }} />
              <Button text label="Kullanim Sartlari" style={{ color: '#cbd5e1' }} />
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Layout
