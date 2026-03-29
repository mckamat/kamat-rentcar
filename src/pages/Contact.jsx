import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=39.965618,32.631443&output=embed&hl=tr&z=16";

const REFERENCES = [
  {
    name: "Türkiye Cumhuriyeti",
    alt: "Türkiye bayrağı ve ay-yıldız",
    img: "/references/cumhurbaskanligi.png",
    url: "https://www.turkiye.gov.tr",
  },
  {
    name: "Ulaştırma ve Altyapı Bakanlığı",
    alt: "Ulaştırma ve Altyapı Bakanlığı",
    img: "/references/Ulastirma.png",
    url: "https://www.uab.gov.tr",
  },
  {
    name: "TÜBİTAK",
    alt: "TÜBİTAK",
    img: "/references/tubitakk.jpg",
    url: "https://www.tubitak.gov.tr",
  },
  {
    name: "TOBB – Türkiye Odalar ve Borsalar Birliği",
    alt: "TOBB",
    img: "/references/tobbb.png",
    url: "https://www.tobb.org.tr",
  },
  {
    name: "KOSGEB",
    alt: "KOSGEB",
    img: "/references/kosgeb.svg",
    url: "https://www.kosgeb.gov.tr",
  },
  {
    name: "Türk Standardları Enstitüsü (TSE)",
    alt: "TSE",
    img: "/references/tsee.jpg",
    url: "https://www.tse.org.tr",
  },
];

function Contact() {
  return (
    <div className="contact-page">
      <header className="contact-hero">
        <div className="contact-hero-inner">
          <p className="contact-hero-eyebrow">Bize ulaşın</p>
          <h1 className="contact-hero-title">İletişim</h1>
          <p className="contact-hero-text">
            Merkez ofisimiz Ankara Optimum Outlet bölgesindedir. Adres ve
            haritayı aşağıda bulabilir; referans kurum alanında çalışmalarımızla
            ilişkili kamu kuruluşlarını görebilirsiniz.
          </p>
        </div>
      </header>

      <div className="contact-body">
        <div className="contact-body-grid">
          <Card className="contact-card contact-info-card">
            <h2 className="contact-card-title">
              <span className="contact-card-title-bar" aria-hidden />
              Adres &amp; iletişim
            </h2>
            <address className="contact-address">
              <strong className="contact-brand">RentCar Merkez Ofis</strong>
              <br />
              Optimum Outlet Alışveriş Merkezi
              <br />
              Eryaman Mah., 06790 Etimesgut / Ankara
            </address>
            <Divider className="contact-divider" />
            <dl className="contact-details">
              <div className="contact-detail-item">
                <dt>Telefon</dt>
                <dd>+90 352 123 45 67</dd>
              </div>
              <div className="contact-detail-item">
                <dt>E-posta</dt>
                <dd>info@rentcar.com</dd>
              </div>
              <div className="contact-detail-item">
                <dt>Çalışma saatleri</dt>
                <dd>Hafta içi 09:00 – 18:00</dd>
              </div>
            </dl>
          </Card>

          <div className="contact-map-column">
            <h2 className="contact-card-title contact-map-title">
              <span className="contact-card-title-bar" aria-hidden />
              Konum – Optimum Ankara
            </h2>
            <p className="contact-map-note">
              Google Haritalar üzerinden Optimum Outlet (Etimesgut) konumu.
            </p>
            <div className="contact-map-frame">
              <iframe
                title="Optimum Outlet Ankara – Google Haritalar"
                src={MAP_EMBED_SRC}
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <section
          className="contact-refs-section"
          aria-labelledby="contact-refs-heading"
        >
          <div className="contact-refs-head">
            <h2 id="contact-refs-heading" className="contact-refs-heading">
              Kamu kurumu referansları
            </h2>
            <p className="contact-refs-intro">
              Standartlara uyumlu hizmet anlayışımız çerçevesinde örneklenen
              kurumlar. Logoya tıklayarak ilgili kurumun web sitesine
              gidebilirsiniz.
            </p>
          </div>
          <div className="contact-refs-grid">
            {REFERENCES.map((ref) => (
              <article key={ref.name} className="contact-ref-tile">
                <div className="contact-ref-image-wrap">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-ref-link"
                    aria-label={`${ref.name} web sitesini yeni sekmede aç`}
                  >
                    <img
                      src={ref.img}
                      alt={ref.alt}
                      className="contact-ref-image"
                      width={200}
                      height={100}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </div>
                <p className="contact-ref-name">{ref.name}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
