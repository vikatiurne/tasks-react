import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

import ThemeProvider, { useTheme } from './ThemeContext';
import NewTask from './components/NewTask/NewTask';
import SearchBox from './components/SearchBox/SearchBox';
import SideBar from './components/SideBar/SideBar';
import WorkSpace from './components/WorkSpace/WorkSpace';
import ListItem from './components/ListItem/ListItem';
import { idb } from './components/indexedDB/idb';
import createCollectionsInIndexDB from './components/indexedDB/idb';

const db = [
  {
    id: 1,
    title:
      'some title Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
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
  const [allTasks, setAllTasks] = useState([]);
  const [clickedAdd, setClickedAdd] = useState(false);

  useEffect(() => {
    createCollectionsInIndexDB();
    getAllTasks();
  }, []);

  const { theme } = useTheme();

  const addClickHandler = () => {
    setClickedAdd((prev) => (prev = true));
  };

  const addTaskHandler = (content) => {
    // console.log(content);
    let title, text;
    if (content.includes('.')) {
      const i = content.indexOf('.');
      title = content.substring(0, i);
      text = content.substring(i);
    } else {
      const i = content.indexOf(' ');
      title = content.substring(0, i);
      text = content.substring(i);
    }
    // console.log(`title: ${title} text:${text}`);

    const dbPromise = idb.open('test-task', 1);
    if (text) {
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;

        const transaction = db.transaction('taskData', 'readwrite');
        const taskData = transaction.objectStore('taskData');

        const newTask = taskData.put({
          id: uuidv4(),
          text,
          title,
          date: new Date().toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        });

        newTask.onsuccess = () => {
          transaction.oncomplete = () => {
            db.close();
          };
          console.log('Нотатка додана до бази даних');
        };
        newTask.onerror = (err) => console.log(err);
      };
    }
  };

  const getAllTasks = () => {
    const dbPromise = idb.open('test-task', 1);

    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const transaction = db.transaction('taskData', 'readonly');
      const taskData = transaction.objectStore('taskData');
      const tasks = taskData.getAll();

      tasks.onsuccess = (e) => {
        setAllTasks(e.target.result);
      };
      tasks.onerror = (err) => console.log(err);

      transaction.oncomplete = () => {
        db.close();
      };
    };
  };

  const deleteTaskHandler = () => {};
  const editTaskHandler = () => {};

  return (
    <div
      className="App"
      style={{ background: theme === 'light' ? 'white' : 'black' }}
    >
      <div className="active">
        <div className="control">
          <NewTask onclick={addClickHandler} />
          <WorkSpace
            deleteTask={deleteTaskHandler}
            editTask={editTaskHandler}
          />
        </div>
        <SearchBox />
      </div>
      <div className="taskWrapper">
        <SideBar allTasks={allTasks} />
        <ListItem sidebar={false} addTask={addTaskHandler} clickedAdd={clickedAdd}/>
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
