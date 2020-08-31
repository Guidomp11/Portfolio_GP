using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class SceneController : MonoBehaviour
{
    AsyncOperation aSync;
    public static SceneController instance;
    private string nextScene;

    private void Start()
    {
        if (instance == null)
        {
            instance = this;
            DontDestroyOnLoad(this.gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }


    private void OnLevelWasLoaded()
    {
        if (SceneManager.GetActiveScene().name == "Loading")
        {
            StartCoroutine("ChangeSceneAsync");
        }
    }

    public void ChangeScene(string nLevel)
    {
        nextScene = nLevel;
        SceneManager.LoadScene("Loading");
    }

    IEnumerator ChangeSceneAsync()
    {
        yield return new WaitForFixedUpdate();
        aSync = SceneManager.LoadSceneAsync(instance.nextScene);
        
        while (!aSync.isDone)
        {
            yield return new WaitForFixedUpdate();
             
            Slider sliderBar = FindObjectOfType<Slider>();
            if (sliderBar != null)
            {               
                sliderBar.value = aSync.progress;
            }
        }
    }
}
