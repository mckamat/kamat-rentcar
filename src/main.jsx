import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { addLocale, locale } from 'primereact/api'
import { BrowserRouter } from 'react-router-dom'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './index.css'
import App from './App.jsx'

addLocale('tr', {
  firstDayOfWeek: 1,
  dayNames: ['Pazar', 'Pazartesi', 'Sali', 'Carsamba', 'Persembe', 'Cuma', 'Cumartesi'],
  dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Car', 'Per', 'Cum', 'Cmt'],
  dayNamesMin: ['Pz', 'Pt', 'Sa', 'Ca', 'Pe', 'Cu', 'Ct'],
  monthNames: [
    'Ocak',
    'Subat',
    'Mart',
    'Nisan',
    'Mayis',
    'Haziran',
    'Temmuz',
    'Agustos',
    'Eylul',
    'Ekim',
    'Kasim',
    'Aralik',
  ],
  monthNamesShort: ['Oca', 'Sub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Agu', 'Eyl', 'Eki', 'Kas', 'Ara'],
  today: 'Bugun',
  clear: 'Temizle',
})
locale('tr')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
