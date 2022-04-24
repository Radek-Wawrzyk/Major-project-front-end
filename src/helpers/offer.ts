import { Offer } from "@/types/Offer";

interface ListItem {
  label: string;
  value: string | number;
  name: string;
}

const validMainInformation: string[] = [
  'rooms_number', 'deposit', 'building_type',
  'building_age', 'building_level', 'living_area',
  'includes_internet',
];

const contains = (key: string, list: string[]): boolean => {
  let matched = false;
  let i = 0;
  const listLength = list.length;

  for (i; i <= listLength; i++) {
    if (key.includes(list[i])) {
      matched = true;
      break;
    }
  }

  return matched;
}

const getLabel = (key: string) => {
  switch (key) {
    case 'deposit': {
      return 'Deposit';
    }
    case 'rooms_number': {
      return 'Rooms';
    }
    case 'building_type': {
      return 'Building type';
    }
    case 'building_level': {
      return 'Building level';
    }
    case 'living_area': {
      return 'Living area';
    }
    case 'includes_internet': {
      return 'Internet (WiFi)';
    }
    default: {
      return '';
    }
  }
}


const getMainList = (offer: Offer) => {
  const properties: ListItem[] = [];

  for (const key in offer) {
    if (contains(key, validMainInformation)) {
      properties.push({
        name: key,
        label: getLabel(key),
        value: (typeof offer[key] === boolean && offer[key] === true) ? 'Yes' : 'No',
      });
    }
  }

  console.log(properties)
  return properties;
};

export {
  getMainList,
  ListItem,
};
