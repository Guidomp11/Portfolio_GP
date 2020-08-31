using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

[System.Serializable]
public class LoadSaveSystem
{
    private int taskName;
    private int taskDescription;
    public SaveData jsonValues;
    TextAsset jsonTxt;
    string path;

    public SaveData LoadJSON()
    {
        path = Application.persistentDataPath + "/tasks.json";

        if (!File.Exists(path))
        {
            File.WriteAllText(path, "{}");
        }

        string jsonString = File.ReadAllText(path);
        jsonValues = JsonUtility.FromJson<SaveData>(jsonString);

        return jsonValues;
    }

    public void SaveOnJSON(SaveData dataToSave)
    {
        string allTasks = JsonUtility.ToJson(dataToSave);
        File.WriteAllText(Application.persistentDataPath + "/tasks.json", allTasks);
        Debug.Log(allTasks);
    }
}


[System.Serializable]
public class SaveData
{
    public List<Data> tasks;
}


[System.Serializable]
public class Data
{
    public string taskName;
    public string taskDescription;
    public int id;
}