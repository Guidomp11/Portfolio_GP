using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Resources;
using System.Runtime.InteropServices;
using System.Runtime.Serialization.Json;
using UnityEditor;
using UnityEngine;
using UnityEngine.Android;

[System.Serializable]
public class LoadSaveSystem
{
    private int highScore;
    private int savedplayerMoney;
    public SaveData jsonValues;
    TextAsset jsonTxt;
    string path;

    public int GetHighScore()
    {
        return jsonValues.playerStats.highScore;
    }

    public void SaveScore(int newHighScore)
    {
        highScore = newHighScore;
        SaveStats(highScore, savedplayerMoney);
    }

    public void LoadJSON()
    {
        path = Application.persistentDataPath + "/ScoreAndMoney.json";

        if (!File.Exists(path))
        {
            File.WriteAllText(path, "{}");
        }

        string jsonString = File.ReadAllText(path);
        jsonValues = JsonUtility.FromJson<SaveData>(jsonString);


        highScore = jsonValues.playerStats.highScore;
        savedplayerMoney = jsonValues.playerStats.playerMoney;
    }

    public void SaveStats(int score, int moneyRecolected)
    {
        if (highScore < score)
        {
            jsonValues.playerStats.highScore = score;
        }
        jsonValues.playerStats.playerMoney += moneyRecolected;

        highScore = jsonValues.playerStats.highScore;
        savedplayerMoney = jsonValues.playerStats.playerMoney;



        SaveOnJSON();
    }

    public int GetPlayerMoney()
    {
        return jsonValues.playerStats.playerMoney;
    }

    public void SetPlayerMoney(int newAmount)
    {
        jsonValues.playerStats.playerMoney += newAmount;
    }

    public void SaveOnJSON()
    {
        /*
        string filePath = Path.Combine(Application.persistentDataPath, "/ScoreAndMoney.json");
        string jsonData = JsonUtility.ToJson(jsonValues);
        File.WriteAllText(filePath, jsonData);*/

        
        string playerProgress = JsonUtility.ToJson(jsonValues);
        
        File.WriteAllText(Application.persistentDataPath + "/ScoreAndMoney.json", playerProgress);

        /*
        string playerProgress = JsonUtility.ToJson(jsonValues);
        
        System.IO.File.WriteAllText(Application.persistentDataPath + "/ScoreAndMoney.json", playerProgress);
        */
        //File.WriteAllText(Application.dataPath + "/Resources/ScoreAndMoney.json", playerProgress);
    }
}


[System.Serializable]
public class SaveData
{
    public Data playerStats;
}


[System.Serializable]
public class Data
{
    public int highScore;
    public int playerMoney;
}