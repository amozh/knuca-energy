export interface EnergyDataItem {
  id: number
  area: string
  electric: number
  electricSolar: number
  electricSmallRiever: number
  electricSpring: number
  electricUsedWater: number
  electricWind: number
  electricFixed: number
  oil: number
  oilAnimalBiomass: number
  oilPlantBiomass: number
  oilFixed: number
  coal: number
  coalPlantBiomass: number
  coalTorf: number
  coalFixed: number
  gas: number
  gasAnimalBiomass: number
  gasGeothermal: number
  gasRedundantDomain: number
  gasRedundantNatural: number
  gasFixed: number
  wood: number
  woodTrash: number
  woodFixed: number
  sankeyData: SankeyDataItem[]
}

export type EnergyLabels = {
  [key in keyof EnergyDataItem]: string
}

export function makeEnergyLabels(items: EnergyDataItem[]): EnergyLabels {
  const labelObject = items[0] as any;
  return labelObject
}

export interface SankeyDataItem {
  from: string
  to: string
  value: number
}

export function makeSankeyData(labels: EnergyLabels, item: EnergyDataItem): SankeyDataItem[] {
  return [
    { from: "Об'єм енергоспоживання", to: labels.electric, value: item.electric },
    { from: "Об'єм енергоспоживання", to: labels.oil, value: item.oil },
    { from: "Об'єм енергоспоживання", to: labels.coal, value: item.coal },
    { from: "Об'єм енергоспоживання", to: labels.gas, value: item.gas },
    { from: "Об'єм енергоспоживання", to: labels.wood, value: item.wood },
    { from: labels.electric, to: labels.electricSolar, value: item.electricSolar },
    { from: labels.electric, to: labels.electricSmallRiever, value: item.electricSmallRiever },
    { from: labels.electric, to: labels.electricSpring, value: item.electricSpring },
    { from: labels.electric, to: labels.electricUsedWater, value: item.electricUsedWater },
    { from: labels.electric, to: labels.electricWind, value: item.electricWind },
    { from: labels.electric, to: labels.electricFixed, value: item.electricFixed },
    { from: labels.oil, to: labels.oilAnimalBiomass, value: item.oilAnimalBiomass },
    { from: labels.oil, to: labels.oilPlantBiomass, value: item.oilPlantBiomass },
    { from: labels.oil, to: labels.oilFixed, value: item.oilFixed },
    { from: labels.coal, to: labels.coalPlantBiomass, value: item.coalPlantBiomass },
    { from: labels.coal, to: labels.coalTorf, value: item.coalTorf },
    { from: labels.coal, to: labels.coalFixed, value: item.coalFixed },
    { from: labels.gas, to: labels.gasAnimalBiomass, value: item.gasAnimalBiomass },
    { from: labels.gas, to: labels.gasGeothermal, value: item.gasGeothermal },
    { from: labels.gas, to: labels.gasRedundantDomain, value: item.gasRedundantDomain },
    { from: labels.gas, to: labels.gasRedundantNatural, value: item.gasRedundantNatural },
    { from: labels.gas, to: labels.gasFixed, value: item.gasFixed },
    { from: labels.wood, to: labels.woodTrash, value: item.woodTrash },
    { from: labels.wood, to: labels.woodFixed, value: item.woodFixed }
  ]
}

export function makeFunnelData(item: EnergyDataItem, labels: EnergyLabels): { name: string, value: number }[] {
  const res = [
    { name: labels.electric, value: item.electric },
    { name: labels.oil, value: item.oil },
    { name: labels.coal, value: item.coal },
    { name: labels.gas, value: item.gas },
    { name: labels.wood, value: item.wood },
  ].sort((a, b) => a.value - b.value);
  return res;
}

interface PieDataItem {
  country: string
  litres: number
  pulled?: boolean
}

function makeObjectKeys(item: EnergyDataItem): KeysMap {
  return Object.keys(item)
    .map(s => s as any as keyof EnergyDataItem)
    .reduce((acc, key) => { acc[key] = key; return acc; }, {} as KeysMap);
}

type ItemKey = keyof EnergyDataItem;
type KeysMap = {[key in ItemKey]:ItemKey};

export function makePieAnyData(item: EnergyDataItem, labels: EnergyLabels, kind: string): PieDataItem[] {
  const k = makeObjectKeys(item);
  switch(kind) {
    case k.electric:
      return makePieData(item, labels, k.electric,
        [k.electricSolar, k.electricWind, k.electricSpring, k.electricSmallRiever, k.electricUsedWater]
      );
    case k.oil:
      return makePieData(item, labels, k.oil,
        [k.oilPlantBiomass, k.oilAnimalBiomass]
      );
    case k.coal:
      return makePieData(item, labels, k.coal,
        [k.coalPlantBiomass, k.coalTorf]
      );
    case k.gas:
      return makePieData(item, labels, k.gas,
        [k.gasAnimalBiomass, k.gasGeothermal, k.gasRedundantDomain, k.gasRedundantNatural]
      );
    case k.wood:
      return makePieData(item, labels, k.wood,
        [k.woodTrash]
      );
  }
  alert("Unknown pie kind " + kind);
  throw new Error("Unknown pie kind " + kind)
}

export function makePieData(item: EnergyDataItem, labels: EnergyLabels, rootKey: ItemKey, childKeys: ItemKey[]): PieDataItem[] {
  const i = (key : keyof EnergyDataItem): PieDataItem => ({ country: labels[key], litres: item[key] as number });
  const res = [
    { ...i(rootKey), pulled: true },
    ...childKeys.map(ck => i(ck))
  ];
  return res;
}

const csv = require('csvtojson');

export async function loadEnergyData(): Promise<{ labels: EnergyLabels, data: EnergyDataItem[] }> {
  return csv({
    checkType: true
  }).fromString(EnergyData)
  .then((jsonArray: EnergyDataItem[]) => {
    const onlyLabels = [jsonArray.shift() as EnergyDataItem];
    const energyLabels = makeEnergyLabels(onlyLabels);
    jsonArray.forEach(d => {
      d.sankeyData = makeSankeyData(energyLabels, d)
    });
    return {
      labels: energyLabels,
      data: jsonArray
    }
  })
}

export const EnergyData = `id,area,electric,electricSolar,electricSmallRiever,electricSpring,electricUsedWater,electricWind,electricFixed,oil,oilAnimalBiomass,oilPlantBiomass,oilFixed,coal,coalPlantBiomass,coalTorf,coalFixed,gas,gasAnimalBiomass,gasGeothermal,gasRedundantDomain,gasRedundantNatural,gasFixed,wood,woodTrash,woodFixed
п/п,Області,Електроенергія,Потенціал сонячної  енергії,Потенціал малих рік,Теплота грунту та грунтових вод,Теплової енергії стічних вод,Вітрова енергія,Незамінний об'єм електроенергії,Нафтопродукти,Потенціал тваринницької біомаси (Паливо),Потенціал  рослинницької біомаси (Паливо),Незамінний об'єм нафтопродуктів,Вугілля,Потенціал  рослинницької біомаси (Паливо), Торф,Незамінний об'єм вугілля,Природний газ,Потенціал тваринницької біомаси (Біогаз),Потенціал геотермальної енергії,Потенціал надлишкового тиску доменного газу,Потенціал надлишкового тиску природного газу,Незамінний об'єм  природного газу,Дрова ,Потенціал відходів лісу,Незамінний об'єм дров
1,Вінницька,1858.50,147.40,69.21,328.76,153.17,48.06,1111.90,924.56,1301.81,873.75,-377.25,2674.65,262.13,22.17,2390.35,2411.17,1884.52,0.00,0.00,24.99,501.66,37.58,12.96,24.61
2,Волинська,1545.40,154.54,33.81,280.10,139.09,72.44,865.42,912.87,1161.25,110.11,-248.38,149.01,33.03,735.80,-619.83,2040.13,1679.92,0.00,0.00,8.98,351.23,82.90,41.83,41.08
3,Дніпропетровська,8669.95,87.32,9.36,132.23,564.17,43.66,7833.21,1200.82,781.89,875.23,418.93,7550.02,262.57,0.00,7287.45,6134.45,113.22,0.00,32.34,45.53,5943.35,5.79,0.00,5.79
4,Донецька,4344.80,60.01,13.68,637.56,367.99,41.29,3224.27,849.42,434.27,479.80,415.16,15464.84,143.94,0.00,15320.90,5466.35,629.03,0.00,25.30,32.41,4779.62,8.07,0.00,8.07
5,Житомирська,2130.81,196.69,82.77,350.76,153.25,61.47,1285.86,797.22,1354.23,179.15,-557.01,52.53,53.75,130.47,-131.68,2488.38,1960.95,0.00,0.00,12.29,515.14,216.99,30.12,186.87
6,Закарпатська,1511.77,95.48,1079.72,62.86,112.99,162.32,-1.59,929.90,439.77,161.20,490.13,46.75,48.36,0.00,-1.61,1838.18,638.11,115.61,0.00,4.38,1080.08,92.29,0.00,92.29
7,Запорізька,5217.38,152.42,8.79,208.11,337.66,100.83,4409.57,1071.64,1030.48,1188.86,41.16,5318.34,356.66,0.00,4961.69,3192.30,1491.68,0.00,14.83,46.90,1638.90,9.99,0.00,9.99
8,Івано-Франківська,1602.04,87.38,87.38,37.14,249.04,148.55,992.53,840.98,595.42,101.95,245.56,4937.12,30.58,13.03,4893.50,2715.72,860.38,0.00,0.00,39.32,1816.02,23.50,4.98,18.52
9,Київська,3115.23,50.86,12.72,40.69,404.13,15.89,2590.94,1272.30,417.80,155.46,854.49,1098.77,46.64,31.05,1021.08,4154.47,604.29,0.00,0.00,34.33,3515.86,30.42,8.21,22.21
10,Кіровоградська,3384.28,232.67,53.94,880.97,178.73,148.06,1889.91,1002.99,1419.15,1943.00,-416.17,267.33,582.90,0.00,-315.57,2303.65,2055.84,0.00,0.00,7.72,240.10,37.10,0.00,37.10
11,Луганська,3624.82,116.18,60.88,909.92,231.43,65.06,2241.34,1561.91,601.09,724.96,960.82,7755.46,217.49,0.00,7537.97,5368.05,854.29,0.00,3.39,28.35,4482.03,19.79,0.00,19.79
12,Львівська,1724.12,74.45,213.16,79.54,384.40,79.94,892.63,892.80,593.91,66.61,298.89,880.90,19.98,95.65,765.27,2676.97,859.99,0.00,0.00,12.54,1804.44,34.64,10.38,24.26
13,Миколаївська,2652.29,212.18,41.55,103.44,216.60,123.77,1954.74,1104.04,1042.78,1110.43,61.26,233.30,333.13,0.00,-99.82,3676.45,1511.43,478.57,0.00,20.33,1666.11,17.82,0.00,17.82
14,Одеська,2604.70,142.84,4.62,81.92,273.49,72.26,2029.57,1171.54,702.58,844.76,468.95,104.67,253.43,0.00,-148.76,3507.88,1016.31,191.50,0.00,11.76,2288.30,14.45,0.00,14.45
15,Полтавська,3784.53,171.37,84.97,115.68,228.50,99.97,3084.03,1621.73,1411.85,1261.46,209.88,62.86,378.44,102.11,-417.69,5184.61,2045.56,2.01,0.00,27.85,3109.18,21.85,0.00,21.85
16,Рівненська,2073.79,138.25,78.63,194.42,169.36,64.81,1428.32,721.47,979.78,127.88,-258.31,271.96,38.37,497.10,-263.51,3450.61,1420.17,0.00,0.00,10.37,2020.08,90.60,53.67,36.93
17,Сумська,2034.37,184.94,82.30,221.01,158.13,69.35,1318.64,735.26,1348.87,596.99,-613.61,203.12,179.10,530.14,-506.12,3357.04,1953.19,4.48,0.00,28.67,1370.71,129.88,15.81,114.07
18,Тернопільська,2199.11,114.74,122.39,185.49,134.81,71.71,1569.97,780.84,1223.09,386.28,-442.25,49.85,115.88,109.76,-175.80,2713.78,1770.27,0.00,0.00,10.52,932.99,23.61,12.26,11.36
19,Харківська,2616.24,100.91,29.90,57.18,395.80,52.32,1980.12,754.18,771.99,691.14,-17.81,2572.79,207.34,0.00,2365.45,3959.51,1117.54,0.15,0.00,39.62,2802.20,41.93,0.00,41.93
20,Херсонська,2312.94,279.48,0.96,165.76,161.91,165.76,1539.07,1089.09,1375.57,1123.70,-286.49,123.97,337.11,7.67,-220.82,1812.95,1994.24,796.24,0.00,8.19,-985.73,45.12,0.00,45.12
21,Хмельницька,1027.91,142.33,71.95,135.21,160.51,59.30,458.60,880.05,1423.71,680.95,-543.65,699.13,204.28,78.31,416.53,2609.57,2061.56,0.00,0.00,10.28,537.73,58.16,12.62,45.55
22,Черкаська,2652.63,149.21,82.07,394.58,240.39,62.17,1724.21,1086.39,1287.11,1219.55,-200.72,854.81,365.86,66.07,422.88,6210.26,1865.81,0.00,,24.04,4320.40,64.81,11.57,53.24
23,Чернівецька,1437.46,77.40,293.02,136.01,109.47,225.57,595.99,772.22,765.51,446.05,6.71,82.69,133.82,0.00,-51.12,1861.14,1109.39,0.00,0.00,5.64,746.12,129.17,6.62,122.55
24,Чернігівська,1889.15,258.51,53.69,148.15,177.98,74.57,1176.24,757.03,1940.42,413.82,-1183.39,1030.41,124.15,353.97,552.29,2986.14,2808.95,17.76,0.00,15.91,143.53,154.64,26.91,127.73
25,АР Крим,594.59,114.67,26.76,87.49,202.59,86.64,76.45,864.44,618.31,248.20,246.13,151.55,74.46,0.00,77.09,2466.96,895.68,3025.00,0.00,12.32,-1466.03,17.28,0.00,17.28`;