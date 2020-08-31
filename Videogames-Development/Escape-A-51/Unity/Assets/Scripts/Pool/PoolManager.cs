using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PoolManager : MonoBehaviour
{
    #region SINGLETON
    private static PoolManager poolInstance;
    public static PoolManager Instance
    {
        get { return poolInstance; }
    }
    void Awake()
    {
        if (poolInstance == null)
        {
            poolInstance = this;
            //DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
        InitializePoolObjects();
    }
    #endregion

    [SerializeField] private Pool[] pools;
    private int nextId = 0;

    

    void InitializePoolObjects()
    {
        foreach (Pool _object in pools)
        {
            _object.pooledObjects = new GameObject[_object.amountToPool];

            GameObject father = new GameObject();
            father.transform.SetParent(this.transform);
            father.name = _object.poolType;

            for (int i = 0; i < _object.amountToPool; i++)
            {
                GameObject obj = Instantiate(_object.prefab, father.transform);
                _object.pooledObjects[i] = obj;
                _object.pooledObjects[i].name = _object.prefab.name + "(" + (nextId++) + ") ";
                //_object.poolType = obj.GetComponent<Pool>().poolType;
                string type = _object.poolType;
                obj.SetActive(false);
            }
        }
    }

    public GameObject RequestObject(string poolName)
    {
        foreach (Pool _pool in pools)
        {
            if (_pool.poolType == poolName)
            {
                for (int i = 0; i < _pool.amountToPool; i++)
                {
                    if (!_pool.pooledObjects[i].activeSelf)
                    {
                        _pool.pooledObjects[i].SetActive(true);

                        return _pool.pooledObjects[i];
                    }
                }
                Debug.LogError("NO TENGO MAS OBJETOS EN LA POOL DE TIPO: " + poolName);
                return null;
            }
            
        }
        Debug.LogError("NO TENGO ESA POOL: " + poolName);
        return null;
    }

    public void DeactivateObject(string objName)
    {
        foreach (Pool _object in pools)
        {
            for (int i = 0; i < _object.amountToPool; i++)
            {
                if (_object.pooledObjects[i].activeSelf && _object.poolType == objName)
                {
                    _object.pooledObjects[i].SetActive(false);

                    return;
                }
            }
        }
    }

    public void DeactivateSpecificObject(string objName, int index)
    {
        foreach (Pool _object in pools)
        {
            if (_object.poolType == objName)
            {
                _object.pooledObjects[index].SetActive(false);

                return;
            }
        }
    }

    public int GetPoolAmount(string poolType)
    {
        foreach (Pool _object in pools)
        {
            if (_object.poolType == poolType)
            {
                return _object.amountToPool;
            }
        }
        return 0;
    }

    
}