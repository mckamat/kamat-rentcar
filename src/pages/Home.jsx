import { useMemo, useState } from 'react'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'

function Home() {
  const locationOptions = useMemo(
    () => [
      { label: 'Kayseri Erkilet Havalimanı', value: 'kayseri' },
      { label: 'İstanbul Havalimanı (IST)', value: 'istanbul' },
      { label: 'İstanbul Sabiha Gökçen Havalimanı', value: 'sabiha' },
      { label: 'Ankara Esenboğa Havalimanı', value: 'ankara' },
      { label: 'İzmir Adnan Menderes Havalimanı', value: 'izmir' },
      { label: 'Antalya Havalimanı', value: 'antalya' },
      { label: 'Dalaman Havalimanı', value: 'dalaman' },
      { label: 'Bodrum-Milas Havalimanı', value: 'bodrum' },
      { label: 'Trabzon Havalimanı', value: 'trabzon' },
      { label: 'Gaziantep Oğuzeli Havalimanı', value: 'gaziantep' },
    ],
    [],
  )

  const timeOptions = useMemo(() => {
    const opts = []
    for (let m = 0; m < 24 * 60; m += 30) {
      const h = Math.floor(m / 60)
      const min = m % 60
      const label = `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`
      opts.push({ label, value: label })
    }
    return opts
  }, [])
  const featureItems = useMemo(
    () => [
      {
        icon: 'pi pi-shield',
        title: 'Guvenli Araclar',
        description: 'Tum araclarimiz duzenli bakimlidir ve guvenlik kontrolunden gecmistir.',
      },
      {
        icon: 'pi pi-clock',
        title: '7/24 Destek',
        description: 'Musteri hizmetleri ekibimiz gunun her saati yardima hazirdir.',
      },
      {
        icon: 'pi pi-wallet',
        title: 'Uygun Fiyatlar',
        description: 'Kaliteli hizmeti rekabetci fiyatlarla sunuyoruz.',
      },
      {
        icon: 'pi pi-map-marker',
        title: 'Genis Lokasyon Agi',
        description: "Turkiye'nin bircok sehrinde hizmet noktamiz bulunur.",
      },
      {
        icon: 'pi pi-user',
        title: 'Kolay Rezervasyon',
        description: 'Sadece birkac adimda rezervasyonunuzu tamamlayabilirsiniz.',
      },
      {
        icon: 'pi pi-star-fill',
        title: 'Musteri Memnuniyeti',
        description: 'Binlerce mutlu musterimizin guveni ile hizmet veriyoruz.',
      },
    ],
    [],
  )

  const [formData, setFormData] = useState({
    location: locationOptions[0].value,
    pickupDate: null,
    pickupTime: timeOptions[0].value,
    returnDate: null,
    returnTime: timeOptions[0].value,
  })

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const showVehicles = () => {
    console.log('Rezervasyon filtreleri:', formData)
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="home-container">
            <Card
              className="home-booking-card booking-card"
              title="Araç Kiralama – Rent A Car"
              subTitle="Hızlı ve güvenli rezervasyon"
            >
              <div className="booking-form-grid">
                <div className="booking-field">
                  <label className="booking-label" htmlFor="booking-location">
                    Alış / Dönüş Lokasyonu
                  </label>
                  <Dropdown
                    inputId="booking-location"
                    value={formData.location}
                    options={locationOptions}
                    onChange={(e) => updateField('location', e.value)}
                    placeholder="Lokasyon seçiniz"
                    className="w-full booking-dropdown"
                  />
                </div>

                <div className="booking-field">
                  <span className="booking-label" id="booking-pickup-label">
                    Alış Tarihi / Saati
                  </span>
                  <div className="booking-field-inline" role="group" aria-labelledby="booking-pickup-label">
                    <Calendar
                      value={formData.pickupDate}
                      onChange={(e) => updateField('pickupDate', e.value)}
                      dateFormat="dd/mm/yy"
                      placeholder="Tarih seçiniz"
                      showIcon
                      className="booking-calendar"
                    />
                    <Dropdown
                      value={formData.pickupTime}
                      options={timeOptions}
                      onChange={(e) => updateField('pickupTime', e.value)}
                      className="booking-time-dropdown"
                      placeholder="Saat"
                    />
                  </div>
                </div>

                <div className="booking-field">
                  <span className="booking-label" id="booking-return-label">
                    Dönüş Tarihi / Saati
                  </span>
                  <div className="booking-field-inline" role="group" aria-labelledby="booking-return-label">
                    <Calendar
                      value={formData.returnDate}
                      onChange={(e) => updateField('returnDate', e.value)}
                      dateFormat="dd/mm/yy"
                      placeholder="Tarih seçiniz"
                      showIcon
                      className="booking-calendar"
                    />
                    <Dropdown
                      value={formData.returnTime}
                      options={timeOptions}
                      onChange={(e) => updateField('returnTime', e.value)}
                      className="booking-time-dropdown"
                      placeholder="Saat"
                    />
                  </div>
                </div>

                <div className="booking-submit">
                  <Button
                    label="Araçları Göster"
                    icon="pi pi-search"
                    iconPos="left"
                    onClick={showVehicles}
                    className="home-primary-btn booking-search-btn"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="home-features-section features-section">
        <div className="home-container">
          <div className="home-features-head">
            <h2>Neden Bizi Secmelisiniz?</h2>
            <p>Size en iyi hizmeti sunmak icin buradayiz</p>
          </div>

          <div className="home-features-grid">
            {featureItems.map((feature) => (
              <Card key={feature.title} className="home-feature-card feature-card">
                <div className="home-feature-content">
                  <div className="feature-icon-wrap">
                    <div className="feature-icon">
                      <i className={feature.icon} />
                    </div>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
