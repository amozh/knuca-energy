export const DefaultMenuItem = { text: 'Центральний Регіон', menuLabel: 'Регіон', key: 'CenterRegion', region: true };
export const MenuItems = [
  {
    icon: 'mdi-chevron-up',
    'icon-alt': 'mdi-chevron-down',
    text: 'Центр',
    active: true,
    children: [
      DefaultMenuItem,
      { text: 'Київська область', key: 'Kyiv' },
      { text: 'Житомирська область', key: 'Zhytomyr' },
      { text: 'Вінницька область', key: 'Vinnytsia' },
      { text: 'Черкаська область', key: 'Cherkasy' },
      { text: 'Чернігівсська область', key: 'Chernihiv' }
    ],
  },
  {
    icon: 'mdi-chevron-up',
    'icon-alt': 'mdi-chevron-down',
    text: 'Південь',
    active: true,
    children: [
      { text: 'Південний Регіон', menuLabel: 'Регіон', key: 'SouthRegion', region: true },
      { text: 'Одеська область', key: 'Odessa' },
      { text: 'Херсонська область', key: 'Kherson' },
      { text: 'Миколаївська область', key: 'Mukolaiv' },
      { text: 'Крим', key: 'Crimea' },
    ],
  },
  { text: 'Закарпаття', key: 'Zakarpattia', region: true }
]