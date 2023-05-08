import { useState } from 'react';
import './App.css';

import ThemeProvider, { useTheme } from './ThemeContext';
import NewTask from './components/NewTask/NewTask';
import SearchBox from './components/SearchBox/SearchBox';
import SideBar from './components/SideBar/SideBar';
import WorkSpace from './components/WorkSpace/WorkSpace';
import ListItem from './components/ListItem/ListItem';

const db = [
  {
    id: 1,
    title: 'some title Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    text: 'Lorem ipsum ',
    date: 'Mya 8, 2023',
    time: '12:00',
  },
  {
    id: 2,
    title: 'some title2',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt ipsam a modi odio! Quo ipsa quos, maiores sint laboriosam tempora officiis? Accusantium voluptas dolore libero inventore voluptatem? Molestiae, delectus odit!',
    date: 'Mya 6, 2023',
    time: '11:00',
  },
  {
    id: 3,
    title: 'some title3',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt ipsam a modi odio! Quo ipsa quos, maiores sint laboriosam tempora officiis? Accusantium voluptas dolore libero inventore voluptatem? Molestiae, delectus odit!',
    date: 'Mya 7, 2023',
    time: '19:00',
  },
  {
    id: 4,
    title: 'some title4',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt ipsam a modi odio! Quo ipsa quos, maiores sint laboriosam tempora officiis? Accusantium voluptas dolore libero inventore voluptatem? Molestiae, delectus odit!',
    date: 'Mya 5, 2023',
    time: '22:00',
  },
  {
    id: 5,
    title: 'some title4',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt ipsam a modi odio! Quo ipsa quos, maiores sint laboriosam tempora officiis? Accusantium voluptas dolore libero inventore voluptatem? Molestiae, delectus odit!',
    date: 'Mya 5, 2023',
    time: '22:00',
  },
  {
    id: 6,
    title: 'some title4',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt ipsam a modi odio! Quo ipsa quos, maiores sint laboriosam tempora officiis? Accusantium voluptas dolore libero inventore voluptatem? Molestiae, delectus odit!',
    date: 'Mya 5, 2023',
    time: '22:00',
  },
  {
    id: 7,
    title: 'some title4',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt ipsam a modi odio! Quo ipsa quos, maiores sint laboriosam tempora officiis? Accusantium voluptas dolore libero inventore voluptatem? Molestiae, delectus odit!',
    date: 'Mya 5, 2023',
    time: '22:00',
  },
  {
    id: 8,
    title: 'some title4',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt ipsam a modi odio! Quo ipsa quos, maiores sint laboriosam tempora officiis? Accusantium voluptas dolore libero inventore voluptatem? Molestiae, delectus odit!',
    date: 'Mya 5, 2023',
    time: '22:00',
  },
  {
    id: 9,
    title: 'some title4',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt ipsam a modi odio! Quo ipsa quos, maiores sint laboriosam tempora officiis? Accusantium voluptas dolore libero inventore voluptatem? Molestiae, delectus odit!',
    date: 'Mya 5, 2023',
    time: '22:00',
  },
  {
    id: 10,
    title: 'some title4',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt ipsam a modi odio! Quo ipsa quos, maiores sint laboriosam tempora officiis? Accusantium voluptas dolore libero inventore voluptatem? Molestiae, delectus odit!',
    date: 'Mya 5, 2023',
    time: '22:00',
  },
  {
    id: 11,
    title: 'some title4',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt ipsam a modi odio! Quo ipsa quos, maiores sint laboriosam tempora officiis? Accusantium voluptas dolore libero inventore voluptatem? Molestiae, delectus odit!',
    date: 'Mya 5, 2023',
    time: '22:00',
  },
  {
    id: 12,
    title: 'some title4',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt ipsam a modi odio! Quo ipsa quos, maiores sint laboriosam tempora officiis? Accusantium voluptas dolore libero inventore voluptatem? Molestiae, delectus odit!',
    date: 'Mya 5, 2023',
    time: '22:00',
  },
  {
    id: 13,
    title: 'some title4',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt ipsam a modi odio! Quo ipsa quos, maiores sint laboriosam tempora officiis? Accusantium voluptas dolore libero inventore voluptatem? Molestiae, delectus odit!',
    date: 'Mya 5, 2023',
    time: '22:00',
  },
  {
    id: 14,
    title: 'some title4',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt ipsam a modi odio! Quo ipsa quos, maiores sint laboriosam tempora officiis? Accusantium voluptas dolore libero inventore voluptatem? Molestiae, delectus odit!',
    date: 'Mya 5, 2023',
    time: '22:00',
  },
];

function App() {
  const [allTasks, setAllTasks] = useState(db);

  const addTaskHandler = () => {};
  const deleteTaskHandler = () => {};
  const editTaskHandler = () => {};

  const { theme } = useTheme();
  return (
    <div
      className="App"
      style={{ background: theme === 'light' ? 'white' : 'black' }}
    >
      <div className="active">
        <div className="control">
          <NewTask addTask={addTaskHandler} />
          <WorkSpace
            deleteTask={deleteTaskHandler}
            editTask={editTaskHandler}
          />
        </div>
        <SearchBox />
      </div>
      <div className='taskWrapper'>
        <SideBar allTasks={allTasks} />
        <ListItem sidebar={false}/>
      </div>
    </div>
  );
}
function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
export default Root;
