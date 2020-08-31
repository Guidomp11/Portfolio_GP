using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class UIController : MonoBehaviour
{
    #region SINGLETON
    private static UIController uiController;
    public static UIController Instance
    {
        get { return uiController; }
    }

    private void Awake()
    {
        if (uiController == null)
        {
            uiController = this;
            //DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }
    #endregion

    //private bool isOnPause = false;
    public GameObject pauseMenu;
    public GameObject pauseButton;
    public GameObject musicButton;
    public Text score;


    public void PauseGame(bool pauseGame)
    {
        if (pauseGame)
        {
            pauseMenu.SetActive(true);
            pauseButton.SetActive(false);
            Time.timeScale = 0f;

        }
        else
        {
            pauseMenu.SetActive(false);
            pauseButton.SetActive(true);
            Time.timeScale = 1f;
        }
    }

    private void Update()
    {
        score.text = "Score  " + LevelController.Instance.playerRef.GetScore();
    }

    public void UpdateScore(int newScore)
    {
        score.text = "Score  " + newScore;
    }


    public void ChangeMusicStatus()
    {
        if (AudioManager.Instance.isMute)
        {
            musicButton.GetComponent<SpriteObj>().ChangeSprite("musicAct");
            AudioManager.Instance.isMute = false;
        }
        else
        {
            musicButton.GetComponent<SpriteObj>().ChangeSprite("musicDeact");
            AudioManager.Instance.isMute = true;
        }
    }
}
