using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

public class AppController : MonoBehaviour
{
    #region SINGLETON

    private static AppController _instance;
    public static AppController Instance
    {
        get { return _instance; }
    }

    void Awake()
    {
        if (_instance == null)
        {
            _instance = this;
        }
        dataManager = new LoadSaveSystem();
    }
    #endregion

    //SAVE & LOAD SYSTEM 
    private LoadSaveSystem dataManager;

    //VIEWPORTS & PREFAB
    [SerializeField] private GameObject taskPrefab;
    [SerializeField] private GameObject tasksViewport;

    //TASKS VARIABLES
    private Task taskFormatter = new Task();
    public List<Task> taskList = new List<Task>();
    private int lastIndex = 0;

    //TASK PANEL 
    [SerializeField] private GameObject newTaskPanel;
    [SerializeField] private InputField[] tasksInfo;
    public bool[] newTaskCheck = new bool[2];

    //DESTROY PANEL
    [SerializeField] private GameObject alertDestroyPanel;
    private int taskToDeleteId;

    //MENU
    [SerializeField] private GameObject menu;

    //DESCRIPTION PANEL
    [SerializeField] private GameObject descriptionPanel;
    [SerializeField] private Text taskName;
    [SerializeField] private Text taskDescription;
    private int idTaskForInfo = -1;

    //EDITION PANEL
    [SerializeField] private GameObject editTaskPanel;
    [SerializeField] private InputField[] tasksInfoToEdit;
    private bool editionConfirm = false;
    private TaskMapper taskToEdit;



    private void Start()
    {
        InitilizeApp();
    }

    private void GetLastIDAssigned()
    {
        int lastIndexFromJson = 0;
        for (int i = 0; i < dataManager.jsonValues.tasks.Count; i++)
        {
            lastIndexFromJson = dataManager.jsonValues.tasks[i].id + 1;
        }

        if (lastIndexFromJson > 0)
        {
            lastIndex = lastIndexFromJson;
        }
        else
        {
            lastIndex = 0;
        }
        
    }

    public void InitilizeApp()
    {
        SaveData appData = dataManager.LoadJSON();
        
        for (int i = 0; i < appData.tasks.Count; i++)
        {
            taskFormatter.SetTaskID(appData.tasks[i].id);
            SetTaskName(appData.tasks[i].taskName);
            SetTaskDescription(appData.tasks[i].taskDescription);
            
            taskList.Add(taskFormatter);
            GameObject newTask = Instantiate(taskPrefab, tasksViewport.transform);
            AssignDataToObject(newTask);
        }

        
    }

    public void ActivateNewTaskPanel()
    {
        newTaskPanel.SetActive(true);
    }

    public void CreateNewTask()
    {
        GetLastIDAssigned();
        if (newTaskCheck[0] == true)
        {
            taskFormatter.SetTaskID(lastIndex);
            taskList.Add(taskFormatter);

            GameObject newTask = Instantiate(taskPrefab, tasksViewport.transform);
            AssignDataToObject(newTask);

            lastIndex++;

            newTaskPanel.SetActive(false);
            ResetTaskForm();


            Data newTaskData = new Data();
            newTaskData.id = taskFormatter.GetTaskID();
            newTaskData.taskName = taskFormatter.GetTaskName();
            newTaskData.taskDescription = taskFormatter.GetTaskDescription();

            dataManager.jsonValues.tasks.Add(newTaskData);
            dataManager.SaveOnJSON(dataManager.jsonValues);
        }
    }

    public void CancelNewTask()
    {
        newTaskPanel.SetActive(false);
    }

    public void ShowAlertPopUp(int id)
    {
        alertDestroyPanel.SetActive(true);
        taskToDeleteId = id;
    }

    public void DeleteTask()
    {
        TaskMapper[] taskFormatterArr = FindObjectsOfType<TaskMapper>();
        for (int i = 0; i < taskFormatterArr.Length; i++)
        {
            if (taskFormatterArr[i].id == taskToDeleteId && taskToDeleteId != -1)
            {
                taskList.Remove(taskList[i]);
                Destroy(taskFormatterArr[i].gameObject);
                alertDestroyPanel.SetActive(false);

                for (int j = 0; j < dataManager.jsonValues.tasks.Count; j++)
                {
                    if (dataManager.jsonValues.tasks[j].id == taskToDeleteId)
                    {
                        dataManager.jsonValues.tasks.Remove(dataManager.jsonValues.tasks[j]);
                    }
                }
                taskToDeleteId = -1;
                dataManager.SaveOnJSON(dataManager.jsonValues);
            }
        }
    }

    public void CancelDestroyingTask()
    {
        alertDestroyPanel.SetActive(false);
        taskToDeleteId = -1;
    }

    public void OpenMenu()
    {
        if (menu.GetComponent<Animator>().GetBool("MenuParam"))
        {
            menu.GetComponent<Animator>().SetBool("MenuParam", false);
        }
        else
        {
            menu.GetComponent<Animator>().SetBool("MenuParam", true);
        }
    }

    private void AssignDataToObject(GameObject newTask)
    {
        newTask.GetComponent<TaskMapper>().id = taskFormatter.GetTaskID();
        newTask.GetComponent<TaskMapper>().taskName.text = taskFormatter.GetTaskName();
        newTask.GetComponent<TaskMapper>().description = taskFormatter.GetTaskDescription();
        newTask.GetComponent<TaskMapper>().description = taskFormatter.GetTaskDescription();
    }

    private void ResetTaskForm()
    {
        for (int i = 0; i < tasksInfo.Length; i++)
        {
            tasksInfo[i].text = null;
        }
        for (int i = 0; i < newTaskCheck.Length; i++)
        {
            newTaskCheck[i] = false;
        }
        InputFieldController.Instance.ResetInfo();
    }

    public void SetTaskInfo(int inputID, string data)
    {
        switch (inputID)
        {
            case 0:
                SetTaskName(data);
                break;
            case 1:
                SetTaskDescription(data);
                break;
            default:
                Debug.Log("NO TENGO UN INPUT CON ESE ID");
                break;
        }
    }

    private void SetTaskName(string taskName)
    {
        taskFormatter.SetTaskName(taskName);
        if (taskName != null || taskName != "" || taskName != " ")
        {
            newTaskCheck[0] = true;
        }
    }

    private void SetTaskDescription(string description)
    {
        taskFormatter.SetTaskDescription(description);
        if (description.Length > 0)
        {
            newTaskCheck[1] = true;
        }
    }

    public void ShowDescriptionPanel(TaskMapper _taskToEdit)
    {
        taskToEdit = _taskToEdit;

        descriptionPanel.SetActive(true);
        taskName.text = taskToEdit.taskName.text;
        taskDescription.text = taskToEdit.description;
        idTaskForInfo = taskToEdit.id;
    }

    public void CloseDescrptionPanel()
    {
        descriptionPanel.SetActive(false);
        taskName.text = "";
        taskDescription.text = "";
        idTaskForInfo = -1;
    }
    
    public void ShowEditionPanel()
    {
        editTaskPanel.SetActive(true);
        for (int i = 0; i < taskList.Count; i++)
        {
            if (dataManager.jsonValues.tasks[i].id == idTaskForInfo)
            {
                tasksInfoToEdit[0].text = dataManager.jsonValues.tasks[i].taskName;
                tasksInfoToEdit[1].text = dataManager.jsonValues.tasks[i].taskDescription;
            }
        }
    }

    public void SaveTaskChanges()
    {
        for (int i = 0; i < taskList.Count; i++)
        {
            if (dataManager.jsonValues.tasks[i].id == idTaskForInfo)
            {
                taskList[i].SetTaskID(idTaskForInfo);
                taskList[i].SetTaskName(tasksInfoToEdit[0].text);
                taskList[i].SetTaskDescription(tasksInfoToEdit[1].text);

                Data editedTaskData = new Data();
                editedTaskData.id = idTaskForInfo;
                editedTaskData.taskName = taskList[i].GetTaskName();
                editedTaskData.taskDescription = taskList[i].GetTaskDescription();

                dataManager.jsonValues.tasks[i] = editedTaskData;
                dataManager.SaveOnJSON(dataManager.jsonValues);

                editionConfirm = true;
                UpdateTaskInfo();
            }
        }
        
    }

    public void UpdateTaskInfo()
    {
        taskToEdit.taskName.text = tasksInfoToEdit[0].text;
        taskToEdit.description = tasksInfoToEdit[1].text.ToString();
        editionConfirm = false;
        CloseEditionPanel();
        CloseDescrptionPanel();
    }

    public void CloseEditionPanel()
    {
        editTaskPanel.SetActive(false);
        tasksInfoToEdit[0].text = "";
        tasksInfoToEdit[1].text = "";
        CloseDescrptionPanel();
    }
    
}
