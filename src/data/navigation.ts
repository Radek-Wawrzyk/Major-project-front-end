import { DashboardMenuItem, DropdownMenuItem } from "@/types/Navigation";

const dropdownMenu: DropdownMenuItem[] = [
  {
    name: 'Dashboard',
    value: 'dashboard',
  },
  {
    name: 'Add offer',
    value: 'create',
  },
  {
    name: 'My offers',
    value: 'offers',
  },
  {
    name: 'Settings',
    value: 'settings',
  },
  {
    name: 'Favorite offers',
    value: 'fav',
  },
  {
    name: 'Questions',
    value: 'questions',
  },
  {
    name: 'Logout',
    value: 'logout',
  },
];
const mobiledashboardMenu: DashboardMenuItem[] = [
  {
    url: '/dashboard',
    label: 'Dashboard',
  },
  {
    url: '/my-offers',
    label: 'My Offers',
  },
  {
    url: '/favorite-offers',
    label: 'Fav Offers',
  },
  {
    url: '/questions',
    label: 'Questions',
  },
  {
    url: '/my-account',
    label: 'Settings',
  },
];

const dashboardMenu: DashboardMenuItem[] = [
  {
    url: '/dashboard',
    label: 'Dashboard',
  },
  {
    url: '/my-offers',
    label: 'My Offers',
  },
  {
    url: '/create-offer',
    label: 'Create Offer',
  },
  {
    url: '/favorite-offers',
    label: 'Favorite Offers',
  },
  {
    url: '/questions',
    label: 'Questions',
  },
];

export {
  dashboardMenu,
  dropdownMenu,
  mobiledashboardMenu,
};
