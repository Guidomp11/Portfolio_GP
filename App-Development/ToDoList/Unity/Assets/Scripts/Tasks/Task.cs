using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Task
{
    private int taskID;
    private string taskName;
    private string taskDescription;

    public void SetTaskID(int num)
    {
        taskID = num;
    }

    public int GetTaskID()
    {
        return taskID;
    }

    public string GetTaskName()
    {
        return taskName;
    }

    public string GetTaskDescription()
    {
        return taskDescription;
    }

    public void SetTaskName(string newTaskName)
    {
        taskName = newTaskName;
    }

    public void SetTaskDescription(string newTaskDescription)
    {
        taskDescription = newTaskDescription;
    }

}
