import { NbMenuItem } from '@nebular/theme';
import { MenuModel } from './models/MenuModel';

export const MENU_ITEMS: NbMenuItem[] = 
// [
//   {
//     title: 'Task',
//     icon: 'edit-2-outline',
//     children: [
//       {
//         title: 'Users',        
//         icon: 'people-outline',
//         link: '/easy/task/user-demo',
//       },
//        {
//         title: 'It Team',        
//         icon: 'plus-square-outline',
//         link: '/easy/task/it-team',
//       },
//       {
//         title: 'Owner',        
//         icon: 'thermometer-plus-outline',
//         link: '/easy/task/owner',
//       },
//     ],
//   },
//   {
//     title: 'Task-Search',
//     icon: 'grid-outline',
//     children: [
//       {
//         title: 'Users',        
//         icon: 'people-outline',
//         link: '/easy/task/user-demo-search',
//       },
//     ],
//   },
//   {
//     title: 'Layout',
//     icon: 'layout-outline',
//     children: [
//       {
//         title: 'Stepper',
//         link: '/pages/layout/stepper',
//       },
//       {
//         title: 'List',
//         link: '/pages/layout/list',
//       },
//       {
//         title: 'Infinite List',
//         link: '/pages/layout/infinite-list',
//       },
//       {
//         title: 'Accordion',
//         link: '/pages/layout/accordion',
//       },
//       {
//         title: 'Tabs',
//         pathMatch: 'prefix',
//         link: '/pages/layout/tabs',
//       },
//     ],
//   },
// ];

JSON.parse(localStorage.getItem("menuList"));