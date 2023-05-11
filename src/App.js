import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.css';

import TasksContext from './context/TasksContext';
import { idb } from './components/indexedDB/idb';
import createCollectionsInIndexDB from './components/indexedDB/idb';
import NewTask from './components/NewTask/NewTask';
import ControlSpace from './components/ControlSpace/ControlSpace';
import SideBar from './components/SideBar/SideBar';
import WorkSpace from './components/WorkSpace/WorkSpace';

function App() {
  const [allTasks, setAllTasks] = useState([]);
  const [clickedAdd, setClickedAdd] = useState(false);
  const [clickedEdit, setClickedEdit] = useState(false);
  const [clickedDelete, setClickedDelete] = useState(false);
  const [clickedSearch, setClickedSearch] = useState(false);
  const [disabled, setDisabled] = useState('disabled');
  const [disabledAdd, setDisabledAdd] = useState(null);
  const [isShowSingleTask, setIsShowSingleTask] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [activeTaskId, setActiveTaskId] = useState(null);

  useEffect(() => {
    createCollectionsInIndexDB();
    getAllTasks();
  }, []);

  const addClickHandler = () => {
    setClickedAdd(true);
    setIsShowSingleTask(false);
    setDisabled('disabled');
    if (!!activeTaskId) {
      setAllTasks(
        allTasks.map((task) =>
          task.id === activeTaskId
            ? { ...task, isActive: false }
            : { ...task, isActive: false }
        )
      );
    } else {
      setAllTasks(allTasks);
    }
  };

  const addTaskHandler = (content, date) => {
    setClickedAdd(false);
    setDisabledAdd(null);
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
          isActive: false,
        });

        newTask.onsuccess = () => {
          transaction.oncomplete = () => {
            db.close();
            getAllTasks();
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

  const clickTackHandler = (id) => {
    setAllTasks(
      allTasks.map((task) =>
        task.id === id
          ? { ...task, isActive: !task.isActive }
          : { ...task, isActive: false }
      )
    );
    setIsShowSingleTask(true);
    setClickedEdit(false);
    setActiveTaskId(id);
    setDisabled(null);
    setDisabledAdd(null);
    setClickedDelete(false);
    setClickedSearch(false);
  };

  const searchTaskHandler = () => {
    setClickedSearch(true);
    if (!!activeTaskId) {
      setAllTasks(
        allTasks.map((task) =>
          task.id === activeTaskId
            ? { ...task, isActive: false }
            : { ...task, isActive: false }
        )
      );
    } else {
      setAllTasks(allTasks);
    }
    setDisabled('disabled');
  };

  const deleteTaskHandler = (id) => {
    setClickedDelete(true);

    const dbPromise = idb.open('test-task', 1);

    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const transaction = db.transaction('taskData', 'readwrite');
      const taskData = transaction.objectStore('taskData');
      const deletedTask = taskData.delete(id);

      if (window.confirm('Видалити нотатку без можливості ії відновлення?')) {
        deletedTask.onsuccess = () => {
          getAllTasks();
          console.log('Нотатка видалена');
        };
        deletedTask.onerror = (err) => console.log(err);

        transaction.oncomplete = () => {
          db.close();
        };
        setDisabled('disabled');
      } else {
        setDisabled('disabled');
        setAllTasks(
          allTasks.map((task) =>
            task.id === activeTaskId
              ? { ...task, isActive: false }
              : { ...task, isActive: false }
          )
        );
      }
    };
  };

  const editTaskHandler = (content, id, isFocus) => {
    setDisabled('disabled');
    setDisabledAdd(null);
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
          date: Date.now(),
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
  };

  const editClickHandler = () => {
    setClickedEdit(true);
    setIsShowSingleTask(false);
    setDisabled('disabled');
    setDisabledAdd('disabled');
  };

  return (
    <div className="App">
      <div className="active">
        <div className="control">
          <TasksContext.Provider value={{ disabled: disabledAdd }}>
            <NewTask addTask={addClickHandler} />
          </TasksContext.Provider>

          <TasksContext.Provider value={{ disabled: disabled }}>
            <ControlSpace
              id={activeTaskId}
              deleteTask={deleteTaskHandler}
              editTask={editClickHandler}
            />
          </TasksContext.Provider>
        </div>
        <div>
          <input
            className="search"
            type="search"
            placeholder="&#128269; search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={searchTaskHandler}
          />
        </div>
      </div>
      <div className="taskWrapper">
        <TasksContext.Provider value={{ clickTackHandler }}>
          <SideBar searchText={searchText} allTasks={allTasks} />
        </TasksContext.Provider>
        {(!clickedDelete || clickedAdd) && (
          <TasksContext.Provider
            value={{
              addTask: addTaskHandler,
              editTask: editTaskHandler,
              tasks: allTasks,
              id: activeTaskId,
            }}
          >
            <WorkSpace
              clickedAdd={clickedAdd}
              clickedEdit={clickedEdit}
              clickedSearch={clickedSearch}
              isShowSingleTask={isShowSingleTask}
            />
          </TasksContext.Provider>
        )}
      </div>
    </div>
  );
}

function Root() {
  return <App />;
}
export default Root;
