using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ClipsManager : MonoBehaviour
{
    #region SINGLETON
    private static ClipsManager instance;

    public static ClipsManager Instance
    {
        get { return instance; }
    }

    private void Awake()
    {
        if (instance == null)
        {
            instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }
    #endregion 

    [SerializeField] private AudioClip[] clips;

    public AudioClip GetClipByName(string clipName)
    {
        for (int i = 0; i < clips.Length; i++)
        {
            if (clips[i].name == clipName)
            {
                return clips[i];
            }
        }
        Debug.Log("NO EXISTE ESE AUDIO");
        return null;
    }

    public AudioClip GetClip(int index)
    {
        if (clips.Length >= index)
        {
            return clips[index];
        }
        Debug.Log("CLIP MANAGER: " + index);
        return null;
    }

}
