using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Platform : MonoBehaviour
{
    [SerializeField] private Transform[] projectilePoints;
    [SerializeField] private Transform[] spawnPoints;
    [SerializeField] private Transform[] moneyPoints;

    private GameObject moneyGO;
    [SerializeField] private GameObject[] projectile;
    [SerializeField] private GameObject[] obstacles;
    

    [SerializeField] private int maxObstaclesPerPlatform;
    [SerializeField] private int minObstaclesPerPlatform;
    


    public void OnTriggerEnterMessage()
    {
        LevelController.Instance.ActivateNextPlatform();
    }

    public void OnTriggerExitMessage()
    {
        Quaternion resetRot = new Quaternion();
        for (int i = 0; i < obstacles.Length; i++)
        {
            obstacles[i].transform.rotation = resetRot;
            obstacles[i].SetActive(false);
            obstacles[i] = null;
        }
        obstacles = new GameObject[0];
        this.gameObject.SetActive(false);

        for (int i = 0; i < projectile.Length; i++)
        {
            projectile[i].SetActive(false);
            projectile[i] = null;
        }
        projectile = new GameObject[0];
        this.gameObject.SetActive(false);

        if (moneyGO != null)
        {
            moneyGO.SetActive(false);
            moneyGO = null;
            this.gameObject.SetActive(false);
        }
        
    }

   
    public void ActivateObstacle()
    {
        int amountObstacles = UnityEngine.Random.Range(minObstaclesPerPlatform, maxObstaclesPerPlatform);
        amountObstacles = Mathf.Clamp(amountObstacles, 1, spawnPoints.Length);
        obstacles = new GameObject[amountObstacles];

        

        for (int i = 0; i < amountObstacles; i++)
        {
            int index = GetPointIndex();
            obstacles[i] = LevelController.Instance.DeterminateObstacle(index);
            obstacles[i].transform.position = spawnPoints[index].position;
        }
        ActivateCoins();
        SpawnProjectile();
    }

    private bool PlatformWithProjectil()
    {
        int rdm = UnityEngine.Random.Range(0, 11);
        if (rdm < 5)
        {
            return true;
        }
        return false;
    }
    
    private void SpawnProjectile()
    {
        if (PlatformWithProjectil())
        {
            int rdm = UnityEngine.Random.Range(0, projectilePoints.Length);
            projectile = new GameObject[rdm];
            for (int i = 0; i < projectile.Length; i++)
            {
                projectile[i] = LevelController.Instance.DeterminateObstacle(10);
                projectile[i].transform.position = projectilePoints[i].position;
            }
        }
    }

    private int GetPointIndex()
    {
        int randomListIndex = UnityEngine.Random.Range(0, spawnPoints.Length);// OBtiene indeice de la lista
        //int originalArrayIndex = spawnPoints[randomListIndex];//Obtengo el dato que esta en ese indice (numero que representa el indice libre de la lista original)
        //availableSpawnPointIndexes.RemoveAt(randomListIndex);

        return randomListIndex;
    }

    

    public void ActivateCoins()
    {
        if (CanSpawnCoin())
        {
            int rdmMoneyPoint = UnityEngine.Random.Range(0, moneyPoints.Length);

            moneyGO = LevelController.Instance.RequestRandomMoneyFigure();
            moneyGO.transform.position = moneyPoints[rdmMoneyPoint].transform.position;
        }
    }

    private bool CanSpawnCoin()
    {
        int rdm = UnityEngine.Random.Range(1, 11);
        if (rdm > 5)
        {
            return true;
        }
        return false;
    }

    /*
    private void ResetSpawnPointINdexList()
    {
        availableSpawnPointIndexes.Clear();
        for (int i = 0; i < spawnPoints.Length; i++)
        {
            availableSpawnPointIndexes.Add(i);
        }
    }
    public void ActivateObstacles()
    {
        int amountObstacles = UnityEngine.Random.Range(minObstaclesPerPlatform, maxObstaclesPerPlatform);
        amountObstacles = Mathf.Clamp(amountObstacles, 1, spawnPoints.Length);
        obstacles = new GameObject[amountObstacles];

        for (int i = 0; i < amountObstacles; i++)
        {
            obstacles[i] = LevelController.Instance.RequestRandomObstacle();
            obstacles[i].transform.position = GetRandomPoint().position;
        }
    }
    //PRIMEROS 3: left
    //SEGUNDAS 2: center
    //TERCEROS 3: right

    private Transform GetRandomPoint()
    {
        int randomListIndex = UnityEngine.Random.Range(0, availableSpawnPointIndexes.Count);// OBtiene indeice de la lista
        int originalArrayIndex = availableSpawnPointIndexes[randomListIndex];//Obtengo el dato que esta en ese indice (numero que representa el indice libre de la lista original)
        availableSpawnPointIndexes.RemoveAt(randomListIndex);
        
        return spawnPoints[originalArrayIndex];
    }
    */
}