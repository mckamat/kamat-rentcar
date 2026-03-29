import { useMemo, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

const RENTAL_REGION_OPTIONS = [
  { label: "Yurt içi", value: "domestic" },
  { label: "Yurt dışı", value: "international" },
];

function Home() {
  const toast = useRef(null);

  const locationOptions = useMemo(
    () => [
      { label: "İstanbul Havalimanı (IST)", value: "istanbul" },
      { label: "Kayseri Erkilet Havalimanı", value: "kayseri" },
      { label: "İstanbul Sabiha Gökçen Havalimanı", value: "sabiha" },
      { label: "Ankara Esenboğa Havalimanı", value: "ankara" },
      { label: "İzmir Adnan Menderes Havalimanı", value: "izmir" },
      { label: "Antalya Havalimanı", value: "antalya" },
      { label: "Dalaman Havalimanı", value: "dalaman" },
      { label: "Bodrum-Milas Havalimanı", value: "bodrum" },
      { label: "Trabzon Havalimanı", value: "trabzon" },
      { label: "Gaziantep Oğuzeli Havalimanı", value: "gaziantep" },
    ],
    [],
  );

  const timeOptions = useMemo(() => {
    const opts = [];
    for (let m = 0; m < 24 * 60; m += 30) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      const label = `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
      opts.push({ label, value: label });
    }
    return opts;
  }, []);

  const featureItems = useMemo(
    () => [
      {
        icon: "pi pi-shield",
        title: "Güvenli Araçlar",
        description:
          "Tüm araçlarımız düzenli bakımlıdır ve güvenlik kontrolünden geçmiştir.",
      },
      {
        icon: "pi pi-clock",
        title: "7/24 Destek",
        description:
          "Müşteri hizmetleri ekibimiz günün her saati yardıma hazırdır.",
      },
      {
        icon: "pi pi-wallet",
        title: "Uygun Fiyatlar",
        description: "Kaliteli hizmeti rekabetçi fiyatlarla sunuyoruz.",
      },
      {
        icon: "pi pi-map-marker",
        title: "Geniş Lokasyon Ağı",
        description: "Türkiye'nin birçok şehrinde hizmet noktamız bulunur.",
      },
      {
        icon: "pi pi-user",
        title: "Kolay Rezervasyon",
        description:
          "Sadece birkaç adımda rezervasyonunuzu tamamlayabilirsiniz.",
      },
      {
        icon: "pi pi-star-fill",
        title: "Müşteri Memnuniyeti",
        description: "Binlerce mutlu müşterimizin güveni ile hizmet veriyoruz.",
      },
    ],
    [],
  );

  const [formData, setFormData] = useState({
    rentalRegion: "domestic",
    pickupLocation: null,
    returnLocation: null,
    pickupDate: null,
    pickupTime: timeOptions[0].value,
    returnDate: null,
    returnTime: timeOptions[0].value,
  });

  const todayStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const returnMinDate = useMemo(() => {
    if (!formData.pickupDate) return todayStart;
    const pick = new Date(formData.pickupDate);
    pick.setHours(0, 0, 0, 0);
    return pick.getTime() >= todayStart.getTime() ? pick : todayStart;
  }, [formData.pickupDate, todayStart]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRentalRegionChange = (e) => {
    const value = e.value;
    if (value === "international") {
      toast.current?.show({
        severity: "info",
        summary: "Yakında",
        detail: "Yurtdışı araç kiralama hizmetimiz çok yakında sizlerle.",
        life: 2000,
      });
    }
    updateField("rentalRegion", value);
  };

  const handlePickupLocationChange = (e) => {
    const next = e.value;
    setFormData((prev) => ({
      ...prev,
      pickupLocation: next,
      returnLocation: next ? prev.returnLocation : null,
    }));
  };

  const handlePickupDateChange = (e) => {
    const next = e.value;
    setFormData((prev) => {
      let returnDate = prev.returnDate;
      let returnTime = prev.returnTime;
      if (next && returnDate) {
        const pickStart = new Date(next);
        pickStart.setHours(0, 0, 0, 0);
        const retStart = new Date(returnDate);
        retStart.setHours(0, 0, 0, 0);
        if (retStart < pickStart) {
          returnDate = null;
          returnTime = timeOptions[0].value;
        }
      }
      return {
        ...prev,
        pickupDate: next,
        pickupTime: next ? prev.pickupTime : timeOptions[0].value,
        returnDate,
        returnTime: returnDate ? returnTime : timeOptions[0].value,
      };
    });
  };

  const handleReturnDateChange = (e) => {
    const next = e.value;
    setFormData((prev) => ({
      ...prev,
      returnDate: next,
      returnTime: next ? prev.returnTime : timeOptions[0].value,
    }));
  };

  const showVehicles = () => {
    console.log("Rezervasyon filtreleri:", formData);
  };

  return (
    <div className="home-page">
      <Toast ref={toast} position="top-right" className="home-booking-toast" />
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="home-container">
            <Card
              className="home-booking-card booking-card"
              title="Araç Kiralama – Rent A Car"
              subTitle="Hızlı ve güvenli rezervasyon"
            >
              <div className="booking-form-grid">
                <div
                  className={`booking-top-row${
                    formData.rentalRegion === "international"
                      ? " booking-top-row--single"
                      : " booking-top-row--triple"
                  }`}
                >
                  <div className="booking-field">
                    <label
                      className="booking-label"
                      htmlFor="booking-rental-region"
                    >
                      Yurt içi / Yurt dışı
                    </label>
                    <Dropdown
                      inputId="booking-rental-region"
                      value={formData.rentalRegion}
                      options={RENTAL_REGION_OPTIONS}
                      onChange={handleRentalRegionChange}
                      className="w-full booking-dropdown"
                    />
                  </div>
                  {formData.rentalRegion === "domestic" ? (
                    <>
                      <div className="booking-field">
                        <label
                          className="booking-label"
                          htmlFor="booking-pickup-location"
                        >
                          Alış lokasyonu
                        </label>
                        <Dropdown
                          inputId="booking-pickup-location"
                          value={formData.pickupLocation}
                          options={locationOptions}
                          onChange={handlePickupLocationChange}
                          placeholder="Alış lokasyonu seçiniz"
                          className="w-full booking-dropdown"
                          showClear
                        />
                      </div>
                      <div className="booking-field">
                        <label
                          className="booking-label"
                          htmlFor="booking-return-location"
                        >
                          Dönüş lokasyonu
                        </label>
                        <Dropdown
                          inputId="booking-return-location"
                          value={formData.returnLocation}
                          options={locationOptions}
                          onChange={(e) =>
                            updateField("returnLocation", e.value)
                          }
                          placeholder="Dönüş lokasyonu seçiniz"
                          className="w-full booking-dropdown"
                          disabled={!formData.pickupLocation}
                        />
                      </div>
                    </>
                  ) : null}
                </div>

                <div className="booking-field">
                  <span className="booking-label" id="booking-pickup-label">
                    Alış Tarihi / Saati
                  </span>
                  <div
                    className="booking-field-inline"
                    role="group"
                    aria-labelledby="booking-pickup-label"
                  >
                    <Calendar
                      value={formData.pickupDate}
                      onChange={handlePickupDateChange}
                      dateFormat="dd/mm/yy"
                      placeholder="Tarih seçiniz"
                      showIcon
                      className="booking-calendar"
                      minDate={todayStart}
                    />
                    <Dropdown
                      value={formData.pickupTime}
                      options={timeOptions}
                      onChange={(e) => updateField("pickupTime", e.value)}
                      className="booking-time-dropdown"
                      placeholder="Saat"
                      disabled={!formData.pickupDate}
                    />
                  </div>
                </div>

                <div className="booking-field">
                  <span className="booking-label" id="booking-return-label">
                    Dönüş Tarihi / Saati
                  </span>
                  <div
                    className="booking-field-inline"
                    role="group"
                    aria-labelledby="booking-return-label"
                  >
                    <Calendar
                      value={formData.returnDate}
                      onChange={handleReturnDateChange}
                      dateFormat="dd/mm/yy"
                      placeholder="Tarih seçiniz"
                      showIcon
                      className="booking-calendar"
                      minDate={returnMinDate}
                    />
                    <Dropdown
                      value={formData.returnTime}
                      options={timeOptions}
                      onChange={(e) => updateField("returnTime", e.value)}
                      className="booking-time-dropdown"
                      placeholder="Saat"
                      disabled={!formData.returnDate}
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
            <h2>Neden bizi seçmelisiniz?</h2>
            <p>Size en iyi hizmeti sunmak için buradayız</p>
          </div>

          <div className="home-features-grid">
            {featureItems.map((feature) => (
              <Card
                key={feature.title}
                className="home-feature-card feature-card"
              >
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
  );
}

export default Home;
