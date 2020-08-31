using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class Pool
{
    public string poolType;
    public GameObject prefab;
    public int amountToPool;
    public GameObject[] pooledObjects;
}
