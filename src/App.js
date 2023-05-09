import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.css';

import NewTask from './components/NewTask/NewTask';
import SearchBox from './components/SearchBox/SearchBox';
import SideBar from './components/SideBar/SideBar';
import WorkSpace from './components/WorkSpace/WorkSpace';
import { idb } from './components/indexedDB/idb';
import createCollectionsInIndexDB from './components/indexedDB/idb';
import CreateTask from './components/CreateTask/CreateTask';
import SingleTask from './components/SinsleTask/SingleTask';
import EditPage from './components/EditPage/EditPage';

function App() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [allTasks, setAllTasks] = useState([]);
  const [clickedAdd, setClickedAdd] = useState(false);
  const [clickedEdit, setClickedEdit] = useState(false);
  const [disabled, setDisabled] = useState('disabled');
  const [isShowSingleTask, setIsShowSingleTask] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [activeTask, setActiveTask] = useState({});

  useEffect(() => {
    createCollectionsInIndexDB();
    getAllTasks();
  }, []);

  const addClickHandler = () => {
    setClickedAdd((prev) => (prev = true));
    setDate(
      new Date().toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    );
    setTime(
      new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  };

  const addTaskHandler = (content, isFocus) => {
    console.log(content);
    setClickedAdd((prev) => (prev = isFocus));
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
          date,
          time,
          isActive: false,
        });

        newTask.onsuccess = () => {
          transaction.oncomplete = () => {
            db.close();
          };
          getAllTasks();
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

  const clickTackHandler = (id) => {
    setAllTasks(
      allTasks.map((task) =>
        task.id === id
          ? { ...task, isActive: !task.isActive }
          : { ...task, isActive: false }
      )
    );
    setIsShowSingleTask(true);
    setClickedEdit((prev) => (prev = false));
    setActiveTaskId(id);
    setDisabled(null);
  };

  const searchTaskHandler = (searchText) => {
    if (!searchText) {
      setAllTasks(allTasks);
    }
    const searchTasks = allTasks.filter((task) => {
      return (
        task.text.toLowerCase().includes(searchText.toLowerCase()) ||
        task.title.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setAllTasks(searchTasks);
  };
  const deleteTaskHandler = () => {};

  const editTaskHandler = (content, id, isFocus, disabled) => {
    let title, text;
    if (content) {
      if (content.includes('.')) {
        const i = content.indexOf('.');
        title = content.substring(0, i);
        text = content.substring(i);
      } else {
        const i = content.indexOf(' ');
        title = content.substring(0, i);
        text = content.substring(i);
      }
    }

    const dbPromise = idb.open('test-task', 1);
    if (isFocus) {
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;

        const transaction = db.transaction('taskData', 'readwrite');
        const taskData = transaction.objectStore('taskData');

        const updatedTask = taskData.put({
          id,
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
          isActive: false,
        });

        updatedTask.onsuccess = () => {
          transaction.oncomplete = () => {
            db.close();
          };
          getAllTasks();
          console.log('Нотатка оновлена');
        };
        updatedTask.onerror = (err) => console.log(err);
      };
    }
    setDisabled(disabled);
  };

  const editClickHandler = () => {
    const currentTask = allTasks.filter((task) => task.id === activeTaskId);
    setActiveTask(currentTask);
    setClickedEdit((prev) => (prev = true));
    setIsShowSingleTask((prev) => (prev = false));
  };

  return (
    <div className="App">
      <div className="active">
        <div className="control">
          <NewTask onclick={addClickHandler} />
          <WorkSpace
            tasks={allTasks}
            id={activeTaskId}
            deleteTask={deleteTaskHandler}
            editTask={editClickHandler}
            disabled={disabled}
          />
        </div>
        <SearchBox search={searchTaskHandler} />
      </div>
      <div className="taskWrapper">
        <SideBar
          allTasks={allTasks}
          addTask={addTaskHandler}
          clickedAdd={clickedAdd}
          clickTackHandler={clickTackHandler}
          isShowSingleTask={isShowSingleTask}
        />
        {clickedAdd && (
          <CreateTask
            date={date}
            time={time}
            addTask={addTaskHandler}
            clickedAdd={clickedAdd}
          />
        )}
        {isShowSingleTask && (
          <SingleTask
            tasks={allTasks}
            id={activeTaskId}
            clickedEdit={clickedEdit}
            currentTask={activeTask}
          />
        )}
        {clickedEdit && (
          <EditPage
            id={activeTaskId}
            editTask={editTaskHandler}
            tasks={allTasks}
          />
        )}
      </div>
    </div>
  );
}

function Root() {
  return <App />;
}
export default Root;
