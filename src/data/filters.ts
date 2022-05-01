import { BuildingType, BuildingAge, SortingItem } from '@/types/Filters';

const buildingTypes: BuildingType[] = ['Apartment', 'House', 'Studio'];
const buildingAges: BuildingAge[] = ['Old', 'New'];
const rooms: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const floors: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sortingList: SortingItem[] = [
  {
    label: 'Price: Lower',
    value: 'price:low',
    field: 'price',
    order: 'ASC',
  },
  {
    label: 'Price: Highest',
    value: 'price:highest',
    order: 'DESC',
    field: 'price',
  },
  {
    label: 'Date: Oldest',
    value: 'created_at:oldest',
    order: 'ASC',
    field: 'created_at',
  },
  {
    label: 'Date: Newest',
    value: 'created_at: newest',
    field: 'created_at',
    order: 'DESC',
  },
];

export { buildingTypes, buildingAges, rooms, floors, sortingList };
