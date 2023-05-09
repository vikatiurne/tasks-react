import styles from './SingleTask.module.css'

const SingleTask = ({ tasks,id }) => {

const activeTask = tasks.filter(task=>task.id===id)

  return (
    <div className={styles.wrapperTextarea}>
      <p>{`${activeTask[0].date} at ${activeTask[0].time}`}</p>
      <div>
        <textarea value={activeTask[0].text} onChange={(e)=>e.preventDefault()}/>
      </div>
     
    </div>
  );
};

export default SingleTask;
