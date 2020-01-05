import { MenuItems } from "@/items";

export interface ChartData {
  title: string
  data: Array<{value: number, name: string}>
}

const energyTypes = ['Сонячна', 'ТЕС', 'ТЕЦ', 'Гідро', 'Атомна'];
const chartTypes = ["Було", "Ідеал", "Компроміс"];

function rnd(min: number, max: number) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const generateForRegion = () => {
  const currentEnergy = rnd(500, 800);
  const desiredEnergy = rnd(900, 1100);
  const compromiseEnergy = rnd(700, 1000);
  const energyDistribution = {
    current: [] as any[],
    desired: [] as any[],
    compromise: [] as any[]
  };
  let curAmount = 0;
  let desiredAmount = 0;
  let compAmount = 0;
  const etEnergy = (et: string, amount: number, energy: number, arr: any[]) => {
    const etCurEnergy = rnd(amount, energy);
    curAmount = etCurEnergy;
    arr.push({
      value: etCurEnergy,
      name: et
    });
    return etCurEnergy
  };
  energyTypes.forEach(et => {
    curAmount = etEnergy(et, curAmount, currentEnergy, energyDistribution.current);
    desiredAmount = etEnergy(et, desiredAmount, desiredEnergy, energyDistribution.desired);
    compAmount = etEnergy(et, compAmount, compromiseEnergy, energyDistribution.compromise)
  });
  return [
    {
      title: "Було",
      data: energyDistribution.current
    },
    {
      title: "Ідеал",
      data: energyDistribution.desired
    },
    {
      title: "Компроміс",
      data: energyDistribution.compromise
    }
  ]
};

// @ts-ignore
function getKeys(items: any[]): string[] {
  const acc = [] as any[];

  items.forEach(i => {
    const hasKey = !!i.key;
    if (hasKey) {
      acc.push(i.key)
    } else if (i.children && i.children.length > 0) {
      const childKeys = getKeys(i.children);
      childKeys.forEach(k => {
        acc.push(k)
      });
    }
  });

  return acc;
}

const itemKeys = getKeys(MenuItems);

const regions = {} as any;

itemKeys.forEach(regionKey => {
  regions[regionKey] = generateForRegion();
});



// @ts-ignore
export const DataByArea: {[key:string]: ChartData[]} = regions;